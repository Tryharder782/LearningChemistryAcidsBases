import type { AcidOrBase } from '../../../../helper/acidsBases/types';
import type { GuideStep } from '../../../../components/AcidsBases/guide/types';
import { bufferDynamicText } from '../../../../components/AcidsBases/guide/bufferGuideSteps';
import { getEndStatement } from '../../../../components/AcidsBases/guide/introGuideSteps';
import { calculatePH } from '../../../../helper/acidsBases/simulationEngine';

export const useBufferStatement = (
   currentStep: GuideStep,
   selectedSubstance: AcidOrBase | null,
   currentMolarity: number,
   particleCount: number,
   strongSubstanceAdded: number
) => {
   const getStatement = () => {
      if (!currentStep.dynamicTextId) return currentStep.statement;
      if (!selectedSubstance) return currentStep.statement;

      const s = selectedSubstance;
      const t = bufferDynamicText;

      const MIN_WEAK_SUBSTANCE_COUNT = 20;
      const MIN_STRONG_SUBSTANCE_COUNT = 5;

      if (currentStep.id === 'instructToAddWeakAcid' && particleCount >= MIN_WEAK_SUBSTANCE_COUNT) {
         return t.midAddingWeakAcid(s);
      }

      if (currentStep.id === 'instructToAddWeakBase' && particleCount >= MIN_WEAK_SUBSTANCE_COUNT) {
         return t.midAddingWeakBase(s);
      }

      if (currentStep.id === 'instructToAddStrongAcid' && strongSubstanceAdded >= MIN_STRONG_SUBSTANCE_COUNT) {
         return t.midAddingStrongAcid(s);
      }

      switch (currentStep.dynamicTextId) {
         // WEAK ACID
         case 'explainWeakAcid': return t.explainWeakAcid(s);
         case 'explainKa': return t.explainKa(s);
         case 'explainConjugateBase': return t.explainConjugateBase(s);
         case 'explainKb': return t.explainKb(s);
         case 'explainHendersonHasselbalch': return t.explainHendersonHasselbalch(s);
         case 'instructToAddWeakAcid': return t.instructToAddWeakAcid(s);
         case 'midAddingWeakAcid': return t.midAddingWeakAcid(s);
         case 'runningWeakAcidReaction': return t.runningWeakAcidReaction(s);
         case 'weakAcidEquilibriumReached': return t.weakAcidEquilibriumReached(s, calculatePH(s, currentMolarity));
         case 'explainFractionChart': return t.explainFractionChart(s);
         case 'explainFractionChartCurrentPosition': return t.explainFractionChartCurrentPosition(s);
         case 'explainBufferRange': return t.explainBufferRange(s);
         case 'explainBufferProportions': return t.explainBufferProportions(s);
         case 'explainAddingAcidIonizingSalt': return t.explainAddingAcidIonizingSalt(s);
         case 'instructToAddSalt': return t.instructToAddSalt(s);
         case 'reachedAcidBuffer': return t.reachedAcidBuffer(s);
         case 'showPreviousPhLine': return t.showPreviousPhLine(s);
         case 'instructToAddStrongAcid': return t.instructToAddStrongAcid(s);
         case 'midAddingStrongAcid': return t.midAddingStrongAcid(s);

         // WEAK BASE
         case 'choseWeakBase': return t.choseWeakBase(s);
         case 'explainKbEquation': return t.explainKbEquation(s);
         case 'explainConjugateAcidPair': return t.explainConjugateAcidPair(s);
         case 'explainKaForBase': return t.explainKaForBase(s);
         case 'explainBasicHasselbalchDynamic': return t.explainBasicHasselbalchDynamic(s);
         case 'instructToAddWeakBase': return t.instructToAddWeakBase(s);
         case 'midAddingWeakBase': return t.midAddingWeakBase(s);
         case 'runningWeakBaseReaction': return t.runningWeakBaseReaction(s);
         case 'reachedBaseEquilibrium': return t.reachedBaseEquilibrium(s, calculatePH(s, currentMolarity));
         case 'explainBufferRangeBase': return t.explainBufferRangeBase(s);
         case 'calculateBufferRange': return t.calculateBufferRange(s);
         case 'explainEqualProportionsBase': return t.explainEqualProportionsBase(s);
         case 'explainSaltBase': return t.explainSaltBase(s);
         case 'instructToAddSaltToBase': return t.instructToAddSaltToBase(s);
         case 'reachedBasicBuffer': return t.reachedBasicBuffer(s);
         case 'showBasePhWaterLine': return t.showBasePhWaterLine(s);
         case 'instructToAddStrongBase': return t.instructToAddStrongBase(s);
         case 'midAddingStrongBase': return t.midAddingStrongBase(s);

         case 'end':
            return getEndStatement();
      }
      return currentStep.statement;
   };

   return getStatement();
};
