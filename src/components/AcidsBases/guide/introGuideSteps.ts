/**
 * Introduction guide steps.
 * Ported from iOS IntroStatements.swift and IntroNavigationModel.swift
 * 
 * Text formatting:
 * - *text* = bold
 * - _n_ = subscript (e.g., H_2_O → H₂O)
 * - ^x^ = superscript (e.g., H^+^ → H⁺)
 * - $formula$ = equation styling
 */

import type { GuideStep } from './types';
import introGuideJson from '../../../data/acidsBases/guide/intro.json';
import { mergeGuideSteps } from './jsonGuide';

// ============================================
// STATIC STATEMENTS (from IntroStatements.swift)
// ============================================

const statements = {
   intro: [
      `*Acids and bases* are extremely common, as are the reactions between acids and bases. The driving force is often the hydronium ion reacting with the hydroxide to form water.`
   ],

   explainTexture: [
      `At the macroscopic level, *acids* taste sour, may be damaging to the skin, and react with bases to yield salts. *Bases* taste bitter, feel slippery, and react with acids to form salts. But on a microscopic level there are various definitions by authors.`
   ],

   explainArrhenius: [
      `An *Arrhenius acid* is a substance that dissociates in water into hydrogen ions *(H^+^)* increasing the concentration of H^+^ ions in the solution. An *Arrhenius base* is a substance that dissociates in water into hydroxide *(OH^-^)* ions; increasing the concentration of OH^-^ ions in an aqueous solution (aq).`
   ],

   explainBronstedLowry: [
      `*The Brønsted-Lowry* definition states that acids are those with the ability to "donate" hydrogen ions *(H^+^)*, otherwise known as *protons*, and bases are those that "accept" them.`
   ],

   explainLewis: [
      `*The Lewis* definition defines a base (referred to as a Lewis base) to be a compound that can donate an *electron pair*, and an acid (a Lewis acid) to be a compound that can receive this electron pair.`
   ],

   explainSimpleDefinition: [
      `To put it simply, the presence of *H^+^* ions in a solution makes it acidic, while the presence of *OH^-^* makes it basic. Acids and bases are classified in strong and weak. This will depend on how much they can *dissociate* into H^+^ or OH^-^.`
   ],

   chooseStrongAcid: [
      `Strong acids are those that dissociate entirely into H^+^ ions. The reaction of these acids with water goes to completion.`,
      `*Choose a strong acid.*`
   ],

   showPhScale: [
      `That awesome colorful scale is a *pH scale!* You can see that [H^+^] and [OH^-^] are related to each other. When both are the same, they're both at *10^-7^ concentration*. At which point, *pH* is said to be neutral: 7. But what is pH?`
   ],

   explainPHConcept: [
      `*[H^+^]* presence in a solution can be very small, that's why the concept of *pH* exists. pH is defined as $*pH=-log[H^+^]*$ and is used as a measurement of acidity of a solution. The same thing happens to $[OH^-^]$.`
   ],

   explainPOHConcept: [
      `*[OH^-^]* presence in a solution can be very small, that's the concept of *pOH* exists. pOH is defined as $*pOH=-log[OH^-^]*$. pOH is related with pH, as in every solution within water: $*pH + pOH = 14*$.`
   ],

   explainPRelation: [
      `The relation between pH and pOH can be easily seen in the pH scale. This relationship between *pH and pOH* will be better explained later. Just know that the lower the pH is, the more acidic the solution is. But why?`
   ],

   explainPConcentrationRelation1: [
      `If you take a look at the pH equation: $*pH=-log[H^+^]*$, the $[H^+^]$ concentration is really small (10 to some negative exponent). The higher the exponent is, the smaller the value, making a high pH one that represents a low $[H^+^]$.`
   ],

   explainPConcentrationRelation2: [
      `In other words, you can notice that the higher the concentration of *$[H^+^]$, then the lower pH is and the more acidic is the solution.* The same thing goes for pOH and $[OH^-^]$. The higher pH is, the lower pOH is and vice versa.`
   ],

   chooseStrongBase: [
      `Strong bases are those that dissociate entirely into OH^-^ ions. The reaction of these bases with water goes to completion.`,
      `*Choose a strong base.*`
   ],

   chooseWeakAcid: [
      `Weak acids are those that dissociate partially into H^+^ ions. The reaction of these acids with water goes to equilibrium.`,
      `*Choose a weak acid.*`
   ],

   explainHEquivalence: [
      `*H_3_O^+^ and H^+^* ions are used interchangeably, they are the same thing, but one or the other is used for balancing convenience. In this case, for weak acids and bases, H_2_O is written as a reactant in the equations.`
   ],

   explainEquilibrium: [
      `As we already know now, equilibrium reactions will go towards the equilibrium state in which the concentrations of all species remain macroscopically constant. More of the acids-base equilibria will be explained later.`
   ],

   chooseWeakBase: [
      `Weak bases are those that dissociate partially into OH^-^ ions. The reaction of these bases with water goes to equilibrium.`,
      `*Choose a weak base.*`
   ],
};

// ============================================
// DYNAMIC STATEMENTS (require substance data)
// ============================================

export function getSetWaterLevelStatement(substanceSymbol: string, primaryIon: string, secondaryIon: string): string[] {
   return [
      `You chose *${substanceSymbol}*. When in water, ${substanceSymbol} dissociates completely into *${primaryIon}* and *${secondaryIon}* ions.`,
      `*Set the amount of water first of all to get started.*`
   ];
}

export function getAddSubstanceStatement(isAcid: boolean): string[] {
   const typeName = isAcid ? 'acid' : 'base';
   return [
      `Great! Now add the ${typeName} to the solution to watch the pH scale change. *Shake it into it!*`,
      `Note: feel free to use the pH meter anytime to measure pH in the solution.`
   ];
}

export function getMidAddingStrongStatement(symbol: string, primary: string, secondary: string, pHDirection: string): string[] {
   return [
      `What a change! pH ${pHDirection} a lot when *${symbol}* is added. Notice how ${symbol} is totally ionized into ${primary} and ${secondary}.`,
      `*Keep shaking as much as you like.*`
   ];
}

export function getShowPhVsMolesGraph(userName?: string): string[] {
   const name = userName ? `, ${userName}` : '';
   return [
      `*Awesome${name}!* Now, this is how it looks when you plot a line for pH vs the moles of strong acid you added. Let's take a snapshot of that graph, it will help us later.`
   ];
}

export function getExplainWeakAcid(symbol: string, primary: string, secondary: string): string[] {
   return [
      `You chose *${symbol}*. When in water, ${symbol} dissociates partially into *${primary}* and *${secondary}* ions. Notice how in this case, *H_2_O* is written in the reaction equation as a reactant. This is due to stoichiometric reasons.`
   ];
}

export function getExplainDoubleArrow(symbol: string, primary: string, secondary: string): string[] {
   return [
      `It's also important to notice in the equation the *double arrow* we encountered in the equilibrium unit. This is why *${symbol}* does not go to completion, and only dissociates into a few *${primary}* and *${secondary}* ions.`
   ];
}

export function getMidAddingWeakAcid(symbol: string, primary: string, secondary: string): string[] {
   return [
      `It changed a bit! pH decreases when *${symbol}* is added. Notice how ${symbol} is partially ionized into ${primary} and ${secondary}, and there's still much of ${symbol} present in the solution.`,
      `*Keep shaking as much as you like.*`
   ];
}

export function getSetWeakBaseWaterLevel(symbol: string, secondary: string): string[] {
   return [
      `You chose *${symbol}*. When in water, ${symbol} reacts with water to yield *${secondary}. ${symbol} acts as a proton acceptor.*`,
      `*Set the amount of water first of all to get started.*`
   ];
}

export function getMidAddingWeakBase(symbol: string): string[] {
   return [
      `It changed a bit! pH increases when ${symbol} is added. Notice how ${symbol} partially produces *OH^-^*, and there's still much of ${symbol} present in the solution.`,
      `*Keep shaking as much as you like.*`
   ];
}

export function getEndStatement(userName?: string): string[] {
   const name = userName ? `, ${userName}` : '';
   return [
      `*That was great${name}!* Now, let's get more into this acid-bases equilibria and see how it works, and what is good for.`
   ];
}

// ============================================
// INTRO GUIDE STEPS (30 steps total)
// ============================================

const baseIntroGuideSteps: GuideStep[] = [
   // 1-6: Introduction theory
   {
      id: 'intro',
      statement: statements.intro,
      inputState: { type: 'none' },
      highlights: [],
   },
   {
      id: 'explainTexture',
      statement: statements.explainTexture,
      inputState: { type: 'none' },
      highlights: [],
   },
   {
      id: 'explainArrhenius',
      statement: statements.explainArrhenius,
      inputState: { type: 'none' },
      highlights: [],
   },
   {
      id: 'explainBronstedLowry',
      statement: statements.explainBronstedLowry,
      inputState: { type: 'none' },
      highlights: [],
   },
   {
      id: 'explainLewis',
      statement: statements.explainLewis,
      inputState: { type: 'none' },
      highlights: [],
   },
   {
      id: 'explainSimpleDefinition',
      statement: statements.explainSimpleDefinition,
      inputState: { type: 'none' },
      highlights: [],
   },

   // 7: Choose strong acid
   {
      id: 'chooseStrongAcid',
      statement: statements.chooseStrongAcid,
      inputState: { type: 'chooseSubstance', substanceType: 'strongAcid' },
      highlights: ['reactionSelection'],
      substanceType: 'strongAcid',
   },

   // 8-13: pH scale explanation
   {
      id: 'showPhScale',
      statement: statements.showPhScale,
      inputState: { type: 'none' },
      highlights: ['pHScale'],
   },
   {
      id: 'explainPHConcept',
      statement: statements.explainPHConcept,
      inputState: { type: 'none' },
      highlights: ['pHFormula'],
   },
   {
      id: 'explainPOHConcept',
      statement: statements.explainPOHConcept,
      inputState: { type: 'none' },
      highlights: ['pOHFormula'],
   },
   {
      id: 'explainPRelation',
      statement: statements.explainPRelation,
      inputState: { type: 'none' },
      highlights: [],
   },
   {
      id: 'explainPConcentrationRelation1',
      statement: statements.explainPConcentrationRelation1,
      inputState: { type: 'none' },
      highlights: [],
   },
   {
      id: 'explainPConcentrationRelation2',
      statement: statements.explainPConcentrationRelation2,
      inputState: { type: 'none' },
      highlights: [],
   },

   // 14: Set water level for strong acid
   {
      id: 'setWaterLevelStrongAcid',
      statement: [], // Dynamic - filled at runtime
      inputState: { type: 'setWaterLevel' },
      highlights: ['waterSlider'],
      substanceType: 'strongAcid',
      dynamicTextId: 'setWaterLevel',
   },

   // 15: Add strong acid
   {
      id: 'addStrongAcid',
      statement: [], // Dynamic
      inputState: { type: 'addSubstance', substanceType: 'strongAcid' },
      highlights: ['beakerTools'],
      substanceType: 'strongAcid',
      dynamicTextId: 'addSubstance',
      requiresAction: true,
   },

   // 16: Show pH vs moles graph
   {
      id: 'showPhVsMolesGraphAcid',
      statement: [], // Dynamic
      inputState: { type: 'addSubstance', substanceType: 'strongAcid' }, // Enable interaction
      highlights: ['phChart'],
      dynamicTextId: 'showPhVsMolesGraph',
   },

   // 17: Choose strong base
   {
      id: 'chooseStrongBase',
      statement: statements.chooseStrongBase,
      inputState: { type: 'chooseSubstance', substanceType: 'strongBase' },
      highlights: ['reactionSelection'],
      substanceType: 'strongBase',
   },

   // 18: Set water level for strong base
   {
      id: 'setWaterLevelStrongBase',
      statement: [],
      inputState: { type: 'setWaterLevel' },
      highlights: ['waterSlider'],
      substanceType: 'strongBase',
      dynamicTextId: 'setWaterLevel',
   },

   // 19: Add strong base
   {
      id: 'addStrongBase',
      statement: [],
      inputState: { type: 'addSubstance', substanceType: 'strongBase' },
      highlights: ['beakerTools'],
      substanceType: 'strongBase',
      dynamicTextId: 'addSubstance',
      requiresAction: true,
   },

   // 20: Show pH vs moles graph (base)
   {
      id: 'showPhVsMolesGraphBase',
      statement: [],
      inputState: { type: 'addSubstance', substanceType: 'strongBase' },
      highlights: [], // Add chart highlight if needed, or keep empty
      dynamicTextId: 'showPhVsMolesGraph',
   },

   // 21: Choose weak acid
   {
      id: 'chooseWeakAcid',
      statement: statements.chooseWeakAcid,
      inputState: { type: 'chooseSubstance', substanceType: 'weakAcid' },
      highlights: ['reactionSelection'],
      substanceType: 'weakAcid',
   },

   // 22: Explain H equivalence
   {
      id: 'explainHEquivalence',
      statement: statements.explainHEquivalence,
      inputState: { type: 'none' },
      highlights: [],
   },

   // 23: Explain double arrow (dynamic)
   {
      id: 'explainDoubleArrow',
      statement: [],
      inputState: { type: 'none' },
      highlights: [],
      substanceType: 'weakAcid',
      dynamicTextId: 'explainDoubleArrow',
   },

   // 24: Explain equilibrium
   {
      id: 'explainEquilibrium',
      statement: statements.explainEquilibrium,
      inputState: { type: 'none' },
      highlights: [],
   },

   // 25: Set water level for weak acid
   {
      id: 'setWaterLevelWeakAcid',
      statement: [],
      inputState: { type: 'setWaterLevel' },
      highlights: ['waterSlider'],
      substanceType: 'weakAcid',
      dynamicTextId: 'setWaterLevel',
   },

   // 26: Add weak acid
   {
      id: 'addWeakAcid',
      statement: [],
      inputState: { type: 'addSubstance', substanceType: 'weakAcid' },
      highlights: ['beakerTools'],
      substanceType: 'weakAcid',
      dynamicTextId: 'addSubstance',
      requiresAction: true,
   },

   // 27: Choose weak base
   {
      id: 'chooseWeakBase',
      statement: statements.chooseWeakBase,
      inputState: { type: 'chooseSubstance', substanceType: 'weakBase' },
      highlights: ['reactionSelection'],
      substanceType: 'weakBase',
   },

   // 28: Set water level for weak base
   {
      id: 'setWaterLevelWeakBase',
      statement: [],
      inputState: { type: 'setWaterLevel' },
      highlights: ['waterSlider'],
      substanceType: 'weakBase',
      dynamicTextId: 'setWeakBaseWaterLevel',
   },

   // 29: Add weak base
   {
      id: 'addWeakBase',
      statement: [],
      inputState: { type: 'addSubstance', substanceType: 'weakBase' },
      highlights: ['beakerTools'],
      substanceType: 'weakBase',
      dynamicTextId: 'addSubstance',
      requiresAction: true,
   },

   // 30: End
   {
      id: 'end',
      statement: [],
      inputState: { type: 'none' },
      highlights: [],
      dynamicTextId: 'end',
   },
];

export const introGuideSteps = mergeGuideSteps(baseIntroGuideSteps, introGuideJson.steps);
export const TOTAL_INTRO_STEPS = introGuideSteps.length;
