import type { AcidOrBase } from '../../../../helper/acidsBases/types';
import type { InputState, IntroScreenElement } from '../../../../components/AcidsBases/guide/types';
import type { EquationState } from '../types';
import ChapterMenu from '../../../../layout/ChapterMenu';
import { SubstanceSelector } from '../../../../components/AcidsBases/interactive';
import { BufferEquationsNew } from '../BufferEquationsNew';
import { GuideBubble, Blockable } from '../../../../components/AcidsBases/guide';

type GuideOverrides = {
   highlights?: IntroScreenElement[];
   inputState?: InputState;
   hasInteracted?: boolean;
   onInteraction?: () => void;
};

type Concentrations = {
   substance: number;
   primary: number;
   secondary: number;
};

type BufferSidePanelProps = {
   guideOverrides: GuideOverrides;
   availableSubstances: AcidOrBase[];
   selectedSubstance: AcidOrBase | null;
   onSelectSubstance: (substance: AcidOrBase) => void;
   selectorOpen: boolean;
   setSelectorOpen: (open: boolean) => void;
   equationState?: EquationState;
   pH: number;
   concentrations: Concentrations;
   statement: string[];
   onNext: () => void;
   onBack: () => void;
   canGoNext: boolean;
   canGoBack: boolean;
   currentStepIndex: number;
   totalSteps: number;
   isChooseSubstanceStep: boolean;
};

export const BufferSidePanel = ({
   guideOverrides,
   availableSubstances,
   selectedSubstance,
   onSelectSubstance,
   selectorOpen,
   setSelectorOpen,
   equationState,
   pH,
   concentrations,
   statement,
   onNext,
   onBack,
   canGoNext,
   canGoBack,
   currentStepIndex,
   totalSteps,
   isChooseSubstanceStep
}: BufferSidePanelProps) => {
   return (
      <div className="flex flex-col pt-0 pl-4 border-l border-gray-100 relative h-full">
         {/* Substance Selector & Chapters */}
         <div className="flex justify-end items-center gap-2 z-10 -mt-2 flex-shrink-0">
            {/* Substance Toggle */}
            <Blockable element="reactionSelection" overrides={guideOverrides} className="relative">
               <div className={isChooseSubstanceStep ? 'w-full max-w-xs' : 'w-fit'} style={{ transform: 'translateY(10px)' }}>
                  <SubstanceSelector
                     substances={availableSubstances}
                     selected={selectedSubstance}
                     onSelect={onSelectSubstance}
                     placeholder="Choose a substance"
                     enabled={isChooseSubstanceStep}
                     isOpen={selectorOpen}
                     onOpenChange={setSelectorOpen}
                     staticMenu={false}
                     compact={true}
                  />
               </div>
            </Blockable>

            {/* Chapters Menu */}
            <ChapterMenu />
         </div>

         {/* Fixed Grid Layout: Equations (auto) and Guide (flex) */}
         <div className="flex-1 flex flex-col min-h-0 gap-4">
            {/* Equations Area - Auto height */}
            <div className="w-full shrink-0">
               <BufferEquationsNew
                  overrides={guideOverrides}
                  state={equationState}
                  substance={selectedSubstance}
                  pH={pH}
                  concentrations={concentrations}
               />
            </div>

            {/* Guide Area - Fill remaining */}
            <div className="flex-1 flex flex-col pb-8 overflow-y-auto min-h-0 overflow-x-visible">
               <div className="relative overflow-visible pr-8">
                  <GuideBubble
                     position="relative"
                     statement={statement}
                     onNext={onNext}
                     onBack={onBack}
                     canGoForwards={canGoNext}
                     canGoBackwards={canGoBack}
                     showControls={true}
                     currentStep={currentStepIndex}
                     totalSteps={totalSteps}
                  />
               </div>
            </div>
         </div>
      </div>
   );
};
