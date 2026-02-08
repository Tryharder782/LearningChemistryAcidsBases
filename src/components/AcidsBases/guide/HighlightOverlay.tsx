/**
 * HighlightOverlay component - Creates a dark overlay with a spotlight on highlighted elements.
 * Uses CSS to create a "cutout" effect showing only the target element.
 */

import { useEffect, useState, useRef, useCallback, type ReactNode } from 'react';
import { useGuideStore } from './useGuideStore';
import type { IntroScreenElement, InputState } from './types';

// ============================================
// HIGHLIGHT OVERLAY
// ============================================

interface HighlightOverlayProps {
   /** Map element names to their DOM element IDs */
   elementIds: Partial<Record<IntroScreenElement, string>>;
   /** Children to render inside the overlay container */
   children?: ReactNode;
   /** Optional highlights override */
   highlights?: IntroScreenElement[];
   /** Optional active state override */
   active?: boolean;
}

/**
 * Spotlight style with coordinates relative to the container (not viewport).
 * Rendered INSIDE the transform stacking context to avoid iOS Safari
 * pointer-events: none bugs with cross-context portals.
 */
interface SpotlightStyle {
   left: number;
   top: number;
   width: number;
   height: number;
}

export function HighlightOverlay({ elementIds, children, highlights: propHighlights, active: propActive }: HighlightOverlayProps) {
   const store = useGuideStore();
   const containerRef = useRef<HTMLDivElement>(null);

   const highlights = propHighlights ?? store.highlights;
   const isActive = propActive ?? !store.hasInteracted;

   const [spotlightStyle, setSpotlightStyle] = useState<SpotlightStyle | null>(null);

   const needsOverlay = highlights.length > 0 && isActive;

   // Find the highlighted element's position and convert to container-relative coords
   useEffect(() => {
      if (!needsOverlay) {
         setSpotlightStyle(null);
         return;
      }

      const updateRect = () => {
         const container = containerRef.current;
         if (!container) {
            setSpotlightStyle(null);
            return;
         }

         for (const highlight of highlights) {
            const id = elementIds[highlight] ?? `guide-element-${highlight}`;
            const element = document.getElementById(id);
            if (element) {
               let rect = element.getBoundingClientRect();

               // If element has a dropdown child that's open, expand rect to include it
               const dropdownMenu = element.querySelector('[data-dropdown-menu="true"]');
               if (dropdownMenu) {
                  const dropdownRect = dropdownMenu.getBoundingClientRect();
                  const top = Math.min(rect.top, dropdownRect.top);
                  const left = Math.min(rect.left, dropdownRect.left);
                  const bottom = Math.max(rect.bottom, dropdownRect.bottom);
                  const right = Math.max(rect.right, dropdownRect.right);
                  rect = { top, left, bottom, right, width: right - left, height: bottom - top, x: left, y: top } as DOMRect;
               }

               // Convert viewport coords to container-relative coords
               // Inside transform: scale(), position:absolute uses unscaled coords
               const containerRect = container.getBoundingClientRect();
               const scaleX = containerRect.width / container.offsetWidth || 1;
               const scaleY = containerRect.height / container.offsetHeight || 1;

               const padding = 15;
               setSpotlightStyle({
                  left: (rect.left - containerRect.left) / scaleX - padding,
                  top: (rect.top - containerRect.top) / scaleY - padding,
                  width: rect.width / scaleX + padding * 2,
                  height: rect.height / scaleY + padding * 2,
               });
               return;
            }
         }
         setSpotlightStyle(null);
      };

      updateRect();
      window.addEventListener('resize', updateRect);
      window.addEventListener('scroll', updateRect);
      window.addEventListener('guide:highlight-update', updateRect);

      return () => {
         window.removeEventListener('resize', updateRect);
         window.removeEventListener('scroll', updateRect);
         window.removeEventListener('guide:highlight-update', updateRect);
      };
   }, [needsOverlay, highlights, elementIds]);

   // Always render wrapper div so containerRef is available for coordinate calculations
   return (
      <div ref={containerRef} style={{ position: 'relative', width: '100%', height: '100%' }}>
         {children}

         {/* Spotlight effect — rendered INSIDE the transform stacking context */}
         {needsOverlay && spotlightStyle && (
            <div
               className="pointer-events-none"
               aria-hidden="true"
               style={{
                  position: 'absolute',
                  zIndex: 9999,
                  left: spotlightStyle.left,
                  top: spotlightStyle.top,
                  width: spotlightStyle.width,
                  height: spotlightStyle.height,
                  borderRadius: '12px',
                  boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.30)',
                  pointerEvents: 'none',
                  transition: 'all 300ms ease-in-out',
               }}
            />
         )}
      </div>
   );
}

// ============================================
// BLOCKABLE WRAPPER
// ============================================

interface BlockableProps {
   /** Element type for this wrapper */
   element: IntroScreenElement;
   /** DOM ID for this element (used by overlay) */
   id?: string;
   /** Optional list of related elements that should prevent this from blocking */
   relatedElements?: IntroScreenElement[];
   /** Children */
   children: React.ReactNode;
   /** Optional className */
   className?: string;
   /** Optional state overrides for local usage */
   overrides?: {
      highlights?: IntroScreenElement[];
      inputState?: InputState;
      hasInteracted?: boolean;
      onInteraction?: () => void;
   };
}

/**
 * Wrapper that controls interactivity based on guide state.
 * When element is not highlighted, interaction is blocked.
 * When user interacts with highlighted element, triggers interaction callback.
 */
export function Blockable({ element, id, relatedElements = [], children, className = '', overrides }: BlockableProps) {
   const store = useGuideStore();

   const highlights = overrides?.highlights ?? store.highlights;
   const inputState = overrides?.inputState ?? store.inputState;
   const hasInteracted = overrides?.hasInteracted ?? store.hasInteracted;
   const markInteraction = overrides?.onInteraction ?? store.markInteraction;

   const isHighlighted = highlights.includes(element);
   const isRelatedHighlighted = relatedElements.some(el => highlights.includes(el));
   const isAllowed = checkInputAllowed(element, inputState);
   const isInteractive = isHighlighted || isRelatedHighlighted || isAllowed;

   // Handle interaction
   const handleInteraction = useCallback(() => {
      if (isHighlighted && !hasInteracted) {
         markInteraction();
      }
   }, [isHighlighted, hasInteracted, markInteraction]);

   const shouldBlock = highlights.length > 0 && !isInteractive && !hasInteracted;

   return (
      <div
         id={id || `guide-element-${element}`}
         className={`
            relative transition-all duration-200
            ${shouldBlock ? 'pointer-events-none' : ''}
            ${className}
         `}
         style={{ touchAction: 'manipulation' }}
         onMouseDown={handleInteraction}
         onTouchStart={handleInteraction}
      >
         {children}
      </div>
   );
}

/**
 * Check if input is allowed for this element based on current state.
 */
function checkInputAllowed(element: IntroScreenElement, inputState: { type: string; substanceType?: string }): boolean {
   switch (element) {
      case 'reactionSelection':
         return inputState.type === 'chooseSubstance' || inputState.type === 'selectSubstance';
      case 'waterSlider':
         return inputState.type === 'setWaterLevel';
      case 'beakerTools':
         return inputState.type === 'addSubstance';
      case 'indicator':
         return inputState.type === 'addIndicator';
      case 'burette':
         return inputState.type === 'addTitrant' || inputState.type === 'setTitrantMolarity';
      default:
         return false;
   }
}

// ============================================
// HOOK
// ============================================

export function useIsInteractive(element: IntroScreenElement, overrides?: { highlights?: IntroScreenElement[]; inputState?: InputState; hasInteracted?: boolean }): boolean {
   const store = useGuideStore();

   const highlights = overrides?.highlights ?? store.highlights;
   const inputState = overrides?.inputState ?? store.inputState;
   const hasInteracted = overrides?.hasInteracted ?? store.hasInteracted;

   if (hasInteracted) return true;
   if (highlights.includes(element)) return true;
   return checkInputAllowed(element, inputState);
}

export default HighlightOverlay;
