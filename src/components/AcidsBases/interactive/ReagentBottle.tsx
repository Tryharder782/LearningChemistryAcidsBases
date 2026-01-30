/**
 * ReagentBottle - A single reagent bottle with multiple states
 * States: locked → unlocked (greyed) → active → ready (tilted) → pouring
 */

import { useState, useCallback, useEffect } from 'react';
import type { AcidOrBase } from '../../../helper/acidsBases/types';

export type BottleState = 'locked' | 'unlocked' | 'active' | 'ready' | 'pouring' | 'used';

interface ReagentBottleProps {
   /** Substance this bottle represents (null if locked) */
   substance: AcidOrBase | null;
   /** Current state of the bottle */
   state: BottleState;
   /** If true, ready state tilts automatically. */
   autoTilt?: boolean;
   /** Called when bottle is clicked */
   onClick?: () => void;
   /** Called when pouring is complete */
   onPourComplete?: () => void;
   /** Called when pouring animation starts */
   onPouringStart?: () => void;

   /** Called when bottle element is mounted */
   onRegister?: (element: HTMLDivElement | null) => void;
   /** Optional className */
   className?: string;
   /** Size scale multiplier */
   scale?: number;
   /** Custom translation for ready state (overrides default) */
   customTranslation?: { x: number; y: number };
   /** Force used-style greyed-out visuals without disabling */
   forceGreyedOut?: boolean;
}

export function ReagentBottle({
   substance,
   state,
   autoTilt = true,
   onClick,
   onPourComplete,
   onPouringStart,
   onRegister,
   className = '',
   scale = 1,
   customTranslation,
   forceGreyedOut = false,
}: ReagentBottleProps) {
   const [isPouringAnimation, setIsPouringAnimation] = useState(false);
   const setRef = useCallback((element: HTMLDivElement | null) => {
      onRegister?.(element);
   }, [onRegister]);

   const handleClick = useCallback(() => {
      if (state === 'locked' || state === 'unlocked') return;

      if (state === 'ready') {
         // Start pouring animation
         setIsPouringAnimation(true);
         // Notify parent about animation start for independent particle rendering
         onPouringStart?.();
         setTimeout(() => {
            setIsPouringAnimation(false);
            onPourComplete?.();
         }, 800);
      }

      onClick?.();
   }, [state, onClick, onPourComplete, onPouringStart]);

   // Determine if bottle should be greyed out (disabled/unavailable - not used)
   // Exception: if forceGreyedOut is true, we show color+label with filter instead
   const isGreyedOut = !forceGreyedOut && (state === 'locked' || state === 'unlocked');
   const isUsed = state === 'used';

   // Determine bottle fill color
   const getBottleFillColor = () => {
      if (forceGreyedOut) {
         return substance?.color ?? '#9CA3AF';
      }
      if (isGreyedOut) {
         return '#A6A6A6'; // Solid grey for unused/locked bottles
      }
      // For used bottles, show the substance color (will be greyed out with filter)
      return substance?.color ?? '#9CA3AF';
   };

   // Determine opacity and filter for used bottles
   const getOpacity = () => {
      return 1; // Always fully opaque
   };

   const getFilter = () => {
      if (isUsed || forceGreyedOut) {
         return 'brightness(0.6) saturate(40%)'; // Darkened/greyed out effect for used bottles (same as original unlocked filter)
      }
      return 'none';
   };

   // Determine rotation for ready/pouring states
   const getRotation = () => {
      if (state === 'pouring' || isPouringAnimation) return 135;
      if (state === 'ready' && autoTilt) return 135;
      return 0;
   };

   // Determine translation for ready state (moves toward beaker)
   const getTranslation = () => {
      if (customTranslation && (state === 'ready' || state === 'pouring' || isPouringAnimation)) {
         return customTranslation;
      }
      const base = { x: 70, y: 130 };
      if (state === 'pouring' || isPouringAnimation) return { x: base.x * scale, y: base.y * scale };
      if (state === 'ready' && autoTilt) return { x: base.x * scale, y: base.y * scale };
      return { x: 0, y: 0 };
   };
   const translation = getTranslation();
   const isInteractive = state === 'active' || state === 'ready';

   // Debug logging - only when state changes
   useEffect(() => {
      if (state === 'locked' || state === 'unlocked') {
         console.log('ReagentBottle Debug:', {
            state,
            forceGreyedOut,
            isGreyedOut,
            substanceSymbol: substance?.symbol,
            substanceColor: substance?.color,
            computedColor: getBottleFillColor(),
            filter: getFilter()
         });
      }
   }, [state, forceGreyedOut, isGreyedOut, substance?.symbol, substance?.color]);

   return (
      <div
         className={`relative transition-all duration-300 ${isInteractive ? 'cursor-pointer' : 'cursor-default'} ${className}`}
         data-bottle-pouring={isPouringAnimation ? 'true' : undefined}
         style={{
            opacity: getOpacity(),
            transform: `translate(${translation.x}px, ${translation.y}px) rotate(${getRotation()}deg)`,
            transformOrigin: 'center top',
            filter: getFilter(),
         }}
         onClick={handleClick}
         ref={setRef}
      >
         <div className="relative" style={{ width: 40 * scale, height: 72 * scale }}>
            <svg
               width="40"
               height="72"
               viewBox="0 0 47.09 107.99"
               className="w-full h-full"
               aria-label="Reagent bottle"
            >
               <rect
                  x="0.54"
                  y="36.99"
                  width="46"
                  height="70.5"
                  fill={getBottleFillColor()}
                  stroke="#000"
                  strokeMiterlimit="10"
               />
               <path
                  fill="none"
                  stroke="#000"
                  strokeMiterlimit="10"
                  d="m46.54,35.99H.54c.35-4.15.47-7.54.5-10,.04-2.86,0-5,0-5-.03-1.66-.08-3,0-5,.05-1.26.13-2.2.13-2.3C1.46,10.46,9.88,1.14,22.08.53c13.45-.67,23.43,9.67,23.77,13.11,0,.09.14,1.48.2,3.36.05,1.48.02,2.43,0,4,0,0-.02,2.19,0,5,.02,2.11.11,5.47.5,10Z"
               />
               <path
                  fill="none"
                  stroke="#000"
                  strokeMiterlimit="10"
                  d="m41.77,22.65c-1.46,2.14-4.22,1.84-18.28,1.81-13.95-.02-16.55.27-17.99-1.81-2.41-3.48.88-10.06,4.73-13.6,4.61-4.24,10.39-4.46,12.31-4.53,1.57-.06,9.6-.37,15.15,5.44,3.03,3.17,6.4,9.28,4.08,12.7Z"
               />
            </svg>
            {substance && (!isGreyedOut || forceGreyedOut) && (
               <div
                  className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90  text-white whitespace-nowrap"
                  style={{
                     top: '62%',
                     fontSize: 12 * scale,
                     letterSpacing: '0.05em',
                  }}
               >
                  {substance.symbol}
               </div>
            )}
         </div>
      </div >
   );
}

export default ReagentBottle;
