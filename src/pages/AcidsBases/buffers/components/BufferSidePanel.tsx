import type { AcidOrBase } from '../../../../helper/acidsBases/types';
import type { InputState, IntroScreenElement } from '../../../../components/AcidsBases/guide/types';
import type { EquationState } from '../types';
import { BufferEquationsNew } from '../BufferEquationsNew';
import { GuideBubble, Blockable } from '../../../../components/AcidsBases/guide';
import { ACIDS_BASES_RIGHT_PANEL_SLOTS } from '../../shared/layoutPresets';
import React from 'react';

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
   controls?: React.ReactNode;
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
   isChooseSubstanceStep,
   controls
}: BufferSidePanelProps) => {
   return (
      <div className="pt-0 relative h-full">
         <div
            className="h-full grid min-h-0"
            style={{
               gridTemplateRows: `${ACIDS_BASES_RIGHT_PANEL_SLOTS.buffers.equationsHeightPx}px minmax(0, 1fr)`,
               rowGap: `${ACIDS_BASES_RIGHT_PANEL_SLOTS.buffers.panelGapPx}px`
            }}
         >
            {/* Equations Area - Fixed slot (prevents guide bubble Y-shift) */}
            <div className="w-full min-h-0 overflow-hidden flex items-start gap-4">
               <div className="flex-1 min-w-0">
                  <BufferEquationsNew
                     overrides={guideOverrides}
                     state={equationState}
                     substance={selectedSubstance}
                     pH={pH}
                     concentrations={concentrations}
                  />
               </div>
               {controls && (
                  <div className="flex items-center gap-4 flex-shrink-0 pt-1 z-[100]">
                     {controls}
                  </div>
               )}
            </div>

            {/* Guide Area - Stable start position */}
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
