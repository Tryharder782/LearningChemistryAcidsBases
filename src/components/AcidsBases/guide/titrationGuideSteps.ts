import type { GuideStep } from './types';
import type { JsonGuideStep } from './jsonGuide';
import { parseInputState } from './jsonGuide';
import titrationGuideJson from '../../../data/acidsBases/guide/titration.json';
import baseSteps from './titrationGuideSteps.json';

const baseStatements = (baseSteps as GuideStep[]).map(step => step.statement);

function buildStepFromJson(jsonStep: JsonGuideStep, index: number): GuideStep {
   const parsedInput = parseInputState(jsonStep.inputState ?? jsonStep.input) ?? { type: 'none' };
   const baseStatement = baseStatements[index];
   const hasBaseStatement = Array.isArray(baseStatement) && baseStatement.length > 0;
   const statement = hasBaseStatement
      ? baseStatement
      : (jsonStep.statementKey ? [jsonStep.statementKey] : [jsonStep.id ?? `step-${index + 1}`]);

   return {
      id: jsonStep.id ?? `titr-${index + 1}`,
      statement,
      inputState: parsedInput,
      highlights: (jsonStep.highlights as GuideStep['highlights']) ?? [],
      requiresAction: jsonStep.requiresAction,
      equationState: jsonStep.equationState as GuideStep['equationState'],
      chartMode: jsonStep.chartMode as GuideStep['chartMode'],
   };
}

export const titrationGuideSteps: GuideStep[] = (titrationGuideJson.steps as JsonGuideStep[])
   .map((step, index) => buildStepFromJson(step, index));
