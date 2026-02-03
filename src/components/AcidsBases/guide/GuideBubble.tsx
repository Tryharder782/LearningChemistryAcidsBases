/**
 * GuideBubble component - Speech bubble with mascot for tutorial.
 * Shows current step text with navigation controls.
 */

import { useGuideStore } from './useGuideStore';
import { parseTextLines } from './textParser';

interface GuideBubbleProps {
   /** Position of the bubble */
   position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'relative';
   /** Optional className */
   className?: string;
   // Optional overrides for usage outside of GuideStore
   statement?: string[];
   onNext?: () => void;
   onBack?: () => void;
   canGoForwards?: boolean;
   canGoBackwards?: boolean;
   showControls?: boolean;
   currentStep?: number;
   totalSteps?: number;
}

export function GuideBubble({
   position = 'bottom-right',
   className = '',
   statement: propStatement,
   onNext,
   onBack,
   canGoForwards,
   canGoBackwards,
}: GuideBubbleProps) {
   const store = useGuideStore();

   // Use props if provided, otherwise store
   const statement = propStatement ?? store.statement;
   const next = onNext ?? store.next;
   const back = onBack ?? store.back;
   const canNext = canGoForwards ?? store.canGoNext();
   const canBack = canGoBackwards ?? store.canGoBack();

   const positionClasses = {
      'bottom-right': 'fixed bottom-4 right-4',
      'bottom-left': 'fixed bottom-4 left-4',
      'top-right': 'fixed top-4 right-4',
      'relative': 'relative',
   };

   return (
      <div className={`${positionClasses[position]} flex items-end -gap-2 z-50 overflow-visible ${className}`}>
         {/* Left Column: Bubble + Buttons */}
         <div className="flex flex-col gap-2">
            {/* Speech bubble Container */}
            <div className={`relative w-[360px] h-[240px] flex flex-col justify-between ${position === 'relative' ? 'mx-auto' : ''}`}>
               {/* Background Image */}
               <img
                  src="/source-images/GuideBubble.svg"
                  alt=""
                  className="absolute inset-0 w-full h-full object-fill pointer-events-none select-none"
               />

               {/* Content Overlay */}
               <div className="relative z-10 w-full h-full flex flex-col p-2 pb-8 pr-16 pb-4 justify-center">
                  {/* Statement text */}
                  <div className={`text-black font-regular overflow-hidden flex flex-col justify-center ${(() => {
                     const fullText = statement.join(' ');
                     const len = fullText.length;
                     const lineCount = statement.length;

                     // Calculate "effective length" considering both characters and lines
                     // Each line adds visual weight beyond just character count
                     const effectiveLength = len + (lineCount * 50); // Each line = ~50 chars worth of space

                     if (effectiveLength > 550 || lineCount > 5) return 'text-[12px] leading-tight';
                     if (effectiveLength > 450 || lineCount > 4) return 'text-[13px] leading-snug';
                     if (effectiveLength > 350 || lineCount > 3) return 'text-[14px] leading-normal';
                     if (effectiveLength > 250) return 'text-[16px] leading-normal';
                     return 'text-[18px] leading-relaxed';
                  })()
                     }`}>
                     <div>{parseTextLines(statement)}</div>
                  </div>
               </div>
            </div>

            {/* Navigation Buttons (Outside Bubble) */}
            <div className="flex items-center justify-between px-4">
               <button
                  onClick={back}
                  disabled={!canBack}
                  className={`
                     w-10 h-10 rounded-full flex items-center justify-center transition-all bg-[#Eaeaea] hover:bg-gray-300 shadow-sm
                     ${canBack ? 'opacity-100' : 'opacity-0 cursor-default'}
                  `}
               >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                     <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                  </svg>
               </button>

               <button
                  onClick={next}
                  disabled={!canNext}
                  className={`
                     flex items-center gap-3 pl-5 mr-10 rounded-full transition-all bg-white border-2 border-[#Eaeaea] shadow-sm hover:border-gray-300
                     ${canNext ? '' : 'cursor-not-allowed'}
                  `}
                  style={{ borderColor: canNext ? "#DD523A" : "#939293" }}
               >
                  <span className="font-bold text-lg text-gray-500" style={{ color: canNext ? "#DD523A" : "#939293" }}>Next</span>
                  <div className={`
                     w-8 h-8 rounded-full flex items-center justify-center text-white
                  `} style={{ backgroundColor: canNext ? "#DD523A" : "#939293" }}>
                     <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="ml-0.5">
                        <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
                     </svg>
                  </div>
               </button>
            </div>
         </div>

         {/* Mascot */}
         <div className="relative w-[120px] h-[180px] -ml-4 mb-16 flex-shrink-0">
            <img
               src="/source-images/guideMascot.png"
               alt="Chemistry Mascot"
               className="w-full h-full object-contain"
            />
         </div>
      </div>
   );
}

export default GuideBubble;
