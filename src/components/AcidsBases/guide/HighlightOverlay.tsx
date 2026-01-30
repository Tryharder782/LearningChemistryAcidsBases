/**
 * HighlightOverlay component - Creates a dark overlay with a spotlight on highlighted elements.
 * Uses CSS to create a "cutout" effect showing only the target element.
 */

import { useEffect, useState, useCallback, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
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

export function HighlightOverlay({ elementIds, children, highlights: propHighlights, active: propActive }: HighlightOverlayProps) {
   const store = useGuideStore();

   const highlights = propHighlights ?? store.highlights;
   const isActive = propActive ?? !store.hasInteracted;

   const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

   // Find the highlighted element's position
   useEffect(() => {
      if (highlights.length === 0 || !isActive) {
         setTargetRect(null);
         return;
      }

      const updateRect = () => {
         for (const highlight of highlights) {
            const id = elementIds[highlight] ?? `guide-element-${highlight}`;
            const element = document.getElementById(id);
            if (element) {
               let rect = element.getBoundingClientRect();

               // If element has a dropdown child that's open, expand rect to include it
               const dropdownMenu = element.querySelector('[class*="absolute z-50"]');
               if (dropdownMenu) {
                  const dropdownRect = dropdownMenu.getBoundingClientRect();
                  // Expand rect to include both button and dropdown
                  const top = Math.min(rect.top, dropdownRect.top);
                  const left = Math.min(rect.left, dropdownRect.left);
                  const bottom = Math.max(rect.bottom, dropdownRect.bottom);
                  const right = Math.max(rect.right, dropdownRect.right);

                  // Create a synthetic DOMRect-like object
                  rect = {
                     top,
                     left,
                     bottom,
                     right,
                     width: right - left,
                     height: bottom - top,
                     x: left,
                     y: top,
                  } as DOMRect;
               }

               setTargetRect(rect);
               return;
            }
         }
         setTargetRect(null);
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
   }, [highlights, elementIds, isActive]);

   // If no highlights or user has interacted (inactive), just render children
   if (highlights.length === 0 || !isActive || !targetRect) {
      return <>{children}</>;
   }

   // Create overlay with spotlight effect using box-shadow
   // This creates a "hole" in the dark overlay where the element is

   return (
      <>
         {children}

         {/* Spotlight effect */}
         {targetRect && createPortal(
            <div
               className="fixed z-[9999] pointer-events-none transition-all duration-300 ease-in-out"
               style={{
                  left: targetRect.left - 15,
                  top: targetRect.top - 15,
                  width: targetRect.width + 30,
                  height: targetRect.height + 30,
                  borderRadius: '12px', // Smooth corners
                  boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.30)', // Reduced darkness from 0.75 to 0.60 (20% lighter)
               }}
            />,
            document.body
         )}
      </>
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
