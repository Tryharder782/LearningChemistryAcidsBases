import type { GuideStep, InputState, SubstanceType } from './types';

type JsonInputState = string | undefined;

export interface JsonGuideStep {
   id?: string;
   inputState?: JsonInputState;
   input?: JsonInputState;
   highlights?: string[];
   equationState?: string;
   chartMode?: string;
   requiresAction?: boolean;
   substanceType?: string;
   dynamicTextId?: string;
   statementKey?: string;
}

export interface JsonGuideFile {
   steps: JsonGuideStep[];
}

export function parseInputState(value?: string): InputState | null {
   if (!value) return null;
   if (value === 'none') return { type: 'none' };
   if (value === 'setWaterLevel') return { type: 'setWaterLevel' };
   if (value === 'selectSubstance') return { type: 'selectSubstance' };
   if (value === 'addIndicator') return { type: 'addIndicator' };
   if (value === 'setTitrantMolarity') return { type: 'setTitrantMolarity' };
   if (value === 'addTitrant') return { type: 'addTitrant' };
   if (value === 'addSubstance') return { type: 'addSubstance' };

   const [type, rawSubstance] = value.split(':');
   if (type === 'chooseSubstance' && rawSubstance) {
      return { type: 'chooseSubstance', substanceType: rawSubstance as SubstanceType };
   }
   if (type === 'addSubstance' && rawSubstance) {
      return { type: 'addSubstance', substanceType: rawSubstance as SubstanceType };
   }

   return null;
}

export function mergeGuideSteps(
   baseSteps: GuideStep[],
   jsonSteps: JsonGuideStep[]
): GuideStep[] {
   if (baseSteps.length !== jsonSteps.length) {
      console.warn(
         `[guide] buffer guide length mismatch: base=${baseSteps.length} json=${jsonSteps.length}. Missing json steps will fall back to base definitions.`
      );
   }

   return baseSteps.map((step, index) => {
      const jsonStep = jsonSteps[index];
      if (!jsonStep) return step;

      const parsedInput = parseInputState(jsonStep.inputState ?? jsonStep.input);
      return {
         ...step,
         inputState: parsedInput ?? step.inputState,
         // JSON is the sole source of truth for highlights; missing field = empty array (no fallback to base)
         highlights: (jsonStep.highlights as GuideStep['highlights']) ?? [],
         requiresAction: jsonStep.requiresAction ?? step.requiresAction,
         equationState: (jsonStep.equationState as GuideStep['equationState']) ?? step.equationState,
         chartMode: (jsonStep.chartMode as GuideStep['chartMode']) ?? step.chartMode,
      };
   });
}
