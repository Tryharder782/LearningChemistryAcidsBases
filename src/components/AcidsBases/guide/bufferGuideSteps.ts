/**
 * Buffer guide steps.
 * Ported from iOS BufferStatements.swift and BufferNavigationModel.swift
 */

import type { GuideStep } from './types';
import bufferGuideJson from '../../../data/acidsBases/guide/buffer.json';
import { mergeGuideSteps } from './jsonGuide';
import type { AcidOrBase } from '../../../helper/acidsBases/types';

// Helper for scientific notation
function scientificValues(value: number): string {
   if (value === 0) return '0';
   const exponent = Math.floor(Math.log10(value));
   const mantissa = value / Math.pow(10, exponent);
   return `${mantissa.toFixed(1)}x10^${exponent}^`;
}

function formatFloat(value: number): string {
   return value.toFixed(2);
}

// ============================================
// STATIC STATEMENTS
// ============================================

export const bufferStatements = {
   intro: [
      `As stated before, weak acids and bases don't go to completion, as they do not dissociate entirely in water. In fact, they partially dissociate very little into *[H^+^]* or *[OH^-^]* ions. These are reactions that go toward equilibrium.`
   ],

   explainEquilibriumConstant1: [
      `In the equilibrium unit, we got to know about *reverse reactions*. A weak acid or base that dissociates in water is a reversible reaction as it goes to equilibrium. Do you remember *K*, the equilibrium constant?`
   ],

   explainEquilibriumConstant2: [
      `Let's refresh our memory! *K* is the value that relates products and reactants at equilibrium.`,
      `K is called *Ka* for an acid dissociating, and *Kb* for a base. *Choose a weak acid to learn more*.`
   ],

   explainHighKa: [
      `The larger K is, the larger the concentration of products at equilibrium is. This is why, when comparing weak acids, the one with a *higher Ka* is the one that at equilibrium will produce *more H^+^ ions*, making it more acidic.`
   ],

   explainKw: [
      `But there's also a *Kw*, for water. This is because water also dissociates, but very little H_2_O dissociates into H^+^ and OH^-^, making the equation for Kw: *Kw = [H^+^][OH^-^]*. *Kw* is constant, and at 25°C its value is *10^-14^*.`
   ],

   explainP14: [
      `And since OH^-^ and H^+^ dissociate equally from water, $[OH^-^] = [H^+^]$ and they're *10^-7^*. That's exactly why pH and pOH are both *7 in water*. When applying negative log to both sides of the equation *Kw = [H^+^][OH^-^]* we get that *14 = pH + pOH*.`
   ],

   explainKaKbNaming: [
      `For the purposes of this unit, *Ka* is usually called acid dissociation constant, *Kb* is called base dissociation constant and *Kw* is the water dissociation constant. Another way they relate to each other is by *Kw = Ka * Kb*.`
   ],

   explainPKaPKb: [
      `As Ka and Kb are really small, they get the same treatment and logarithms are used to better relate them:`,
      `*pKa = -log(Ka)*`,
      `*pKb = -log(Kb)*`
   ],

   instructToSetWaterLevel1: [
      `The *Henderson-Hasselbalch* equation has a very unique use that we are going to learn later. First of all, let's set the water volume in the beaker.`,
      `*Use the water slider*.`
   ],

   introduceBufferSolutions: [
      `Now that we know Ka, let's use the *Henderson-Hasselbalch* equation for something very useful:`,
      `*Buffer solutions*`,
      `But what are they?`
   ],

   explainBufferSolutions: [
      `Buffers are solutions that resist a change in pH when acid or base is added to them. These are usually composed of a *weak acid* and its *conjugate base* or a *weak base* and its *conjugate acid.*`
   ],

   explainBufferSolutions2: [
      `Why is that? Well, when there's a weak acid in the solution, this would react with any *OH^-^* added, while its conjugate base would react with any *H^+^*, maintaining the *pH* relatively constant. The same thing happens with weak base buffers.`
   ],

   explainBufferUses: [
      `Buffers are very important and are present in *various systems*. For example, blood has a buffer system of bicarbonate and carbonic acid. It helps maintain blood at pH 7.4, and without it human life wouldn't be possible.`
   ],

   acidBufferLimitReached: [
      `Finally the *buffer* has reached its *limit!*. pH has gone down significantly now, but our buffer did a great job maintaining pH constant for that long! Let's try with weak bases now!`
   ],

   instructToChooseWeakBase: [
      `Let's try now with a weak base and see if we can make a buffer out of it!`,
      `*Choose a weak base to learn more.*`
   ],

   explainKbOhRelation: [
      `The larger K is, the larger the concentrations of products at equilibrium are. This is why, when comparing weak bases, the one with a *higher Kb* is the one that at equilibrium, will produce *more OH^-^ ions*, making it more basic.`
   ],

   instructToSetWaterLevelForBase: [
      `The *Henderson-Hasselbalch* equation has a very unique use to determine pH or pOH for buffers. First of all, let's set the water volume in the beaker.`,
      `*Use the water slider*.`
   ],

   explainBasicHasselbalch: [
      `Now that we know the Kb, let's use the *Henderson-Hasselbalch* equation for something very useful:`,
      `*Buffer solutions*. This time, we'll make one from a weak base and its conjugate salt.`
   ],

   baseBufferLimitReached: [
      `Finally, the *buffer* has reached it's limit! pH has gone significantly up now, but out buffer did a great job maintaining pH constant for that long!`,
      `That was awesome!`
   ]
};

// ============================================
// DYNAMIC TEXT GENERATORS
// ============================================

export const bufferDynamicText = {
   explainWeakAcid: (s: AcidOrBase) => [
      `You chose *${s.symbol}*. When ${s.symbol} reacts with water, it dissociates into *${s.secondaryIon}^-^* and *H_3_O^+^ (remember that H_3_O^+^ and H^+^ are interchangeable)*. The double arrow indicates that this is a reversible reaction.`
   ],

   explainKa: (s: AcidOrBase) => [
      `The equation for Ka is the same equation as *K = [products]/[reactants]*. In this case, the products are the ions: *[${s.secondaryIon}^-^]* and *[H^+^]*, while the reactant is just $[${s.symbol}]$, the acid, as water is a pure liquid and it's not included in the equation.`
   ],

   explainConjugateBase: (s: AcidOrBase) => [
      `Notice how *${s.secondaryIon}^-^* can react with *H^+^*. In other words, *${s.secondaryIon}^-^* has the ability to trap a proton *(H^+^)*, working as a base. These products are called *conjugate base of the acid*. *${s.secondaryIon}^-^* is the conjugate base of *${s.symbol}*. ${s.symbol} and ${s.secondaryIon}^-^ are called *conjugate acid-base pair*.`
   ],

   explainKb: (s: AcidOrBase) => [
      `That's where *Kb* comes from. When *${s.secondaryIon}^-^* traps *H^+^* from water, it releases *OH^-^* ions, working as a base. The equation for Kb is: $Kb = [${s.symbol}][OH^-^]/[${s.secondaryIon}^-^]$. That'll be the Kb for the conjugate base ${s.secondaryIon}^-^. When *Ka* is large, *Kb* is small, and vice versa.`
   ],

   explainHendersonHasselbalch: (s: AcidOrBase) => [
      `We can obtain a very useful equation for buffers: the *Henderson-Hasselbalch* equation. This formula is derived algebraically from the equilibrium constant expression for Ka.`,
      `*pH = pKa + log([${s.secondaryIon}^-^]/[${s.symbol}])*`
   ],

   instructToAddWeakAcid: (s: AcidOrBase) => [
      `*Awesome!* Now add the weak acid *${s.symbol}* to see it dissociate into *H^+^ and ${s.secondaryIon}^-^*.`,
      `*Shake it into it!*`
   ],

   midAddingWeakAcid: (s: AcidOrBase) => [
      `*Great!* Keep adding until you're happy with the initial concentration of ${s.symbol}.`,
      `*Keep shaking the container!*`
   ],

   runningWeakAcidReaction: (s: AcidOrBase) => [
      `Watch how it reacts and dissociates!`,
      `*${s.symbol}* is now dissociating into *H^+^* and *${s.secondaryIon}^-^*, and the presence of H^+^ makes the solution acidic.`
   ],

   weakAcidEquilibriumReached: (s: AcidOrBase, currentPH: number) => {
      const kaText = scientificValues(s.kA);
      return [
         `Equilibrium has been reached! That means that this is the maximum number of ions that can be produced by this weak acid. *Ka = ${kaText}* and *pH = ${formatFloat(currentPH)}* making the solution very acidic. Notice there's plenty of ${s.symbol} remaining.`
      ];
   },

   explainFractionChart: (s: AcidOrBase) => [
      `Watch the graph in the bottom. The y axis is the fraction of proportions of species *${s.symbol}* and *${s.secondaryIon}⁻*. When ${s.symbol} and ${s.secondaryIon}⁻ are equally present in the solution, both fractions are *0.50*. The x axis is the pH of the solution.`
   ],

   explainFractionChartCurrentPosition: (s: AcidOrBase) => [
      `As seen in the bottom graph, right now there's much more *${s.symbol}* than *${s.secondaryIon}⁻* in the solution. It's not yet considered a buffer. When within the *buffer range* (center of the graph), the solution has buffer properties.`
   ],

   explainBufferRange: (s: AcidOrBase) => [
      `The *Henderson-Hasselbalch* equation lets us calculate pH of the *buffer*. In this case, variations on ${s.symbol} and ${s.secondaryIon}⁻ ratio will make the pH vary. When ${s.symbol} and ${s.secondaryIon}⁻ are the same value, the *pH = pKa*. The buffer range is ±1 from that point.`
   ],

   explainBufferProportions: (s: AcidOrBase) => [
      `When proportions of ${s.symbol} and ${s.secondaryIon}⁻ are equal, that's when the buffer has a higher effectiveness, because at that point it is able to buffer against equal amounts of acid *H⁺* or base *OH⁻* added.`
   ],

   explainAddingAcidIonizingSalt: (s: AcidOrBase) => [
      `A very common way to add a conjugate base is by adding its *salt* (one that ionizes completely in water to ${s.secondaryIon}^-^ ions).`
   ],

   instructToAddSalt: (s: AcidOrBase) => [
      `*${s.saltName}* is a salt that ionizes completely in water, letting *${s.secondaryIon}^-^* ions free in the solution, the conjugate base of *${s.symbol}*. In other words, add *${s.saltName}* to increase the presence of *${s.secondaryIon}^-^* ions.`,
      `*Shake it into it!*`
   ],

   reachedAcidBuffer: (s: AcidOrBase) => [
      `Awesome! That's what I call a *buffer!*. There's equal parts of *${s.symbol}* and *${s.secondaryIon}^-^* now. Notice that *pH went up*, this is because ${s.secondaryIon}^-^ ions trapped the H^+^ ions that were free in the solution, decreasing the concentration of *H^+^* in the solution.`
   ],

   showPreviousPhLine: (_s: AcidOrBase) => [
      `Now that the buffer is prepared, we can test it. Remember that graph at the top? That's right! It's from when we added *HCl* to pure water.`,
      `See how pH went down without much resistance.`
   ],

   instructToAddStrongAcid: (_s: AcidOrBase) => [
      `But what will happen if we add *HCl* to this buffer? Let's find out!`,
      `Add HCl, which totally dissociates in water into *H^+^* ions.`,
      `*Shake it into it!*`
   ],

   midAddingStrongAcid: (s: AcidOrBase) => [
      `Watch how pH decreases. But wait! It doesn't go down immediately as before. The *${s.secondaryIon}^-^* ions in the *buffer* react with the H^+^ free ions to make more ${s.symbol}.`,
      `*Keep adding HCl to test the buffer!*`
   ],

   acidBufferLimitReached: () => [
      `Watch how pH decreases. But wait! It doesn't go down immediately as before. The *${'secondary'}* ions in the *buffer* react with the H^+^ free ions to make more ${'substance'}.`,
      `*Keep adding HCl to test the buffer!*`
   ],

   // --- WEAK BASE ---

   choseWeakBase: (s: AcidOrBase) => [
      `You chose *${s.symbol}*. When ${s.symbol} reacts with water, it dissociates into ${s.secondaryIon}^+^ and *OH^-^* (assuming cationic conjugate). The double arrow indicates that this is a reverse reaction.`
      // Note: For generic text we need to be careful with +/- signs for bases. 
      // iOS: "\(secondary) and *\(primary)*". Primary for base is OH-.
   ],

   explainKbEquation: (s: AcidOrBase) => [
      `The equation for Kb is the same equation for *K = [products]/[reactants]*. In this case, the products are: *[${s.secondaryIon}^+^]* and *[OH^-^]*, while the reactant is just *[${s.symbol}]*, the base, as water is a pure liquid and it's not included in the equation.`
   ],

   explainConjugateAcidPair: (s: AcidOrBase) => [
      `Notice how *${s.secondaryIon}^+^* can react with *OH^-^*. ${s.secondaryIon}^+^ is the conjugate acid of *${s.symbol}*. ${s.symbol} and ${s.secondaryIon}^+^ are called *conjugate acid-base pair*.`
   ],

   explainKaForBase: (s: AcidOrBase) => [
      `That's where *Ka* comes from. When *${s.secondaryIon}^+^* donates H^+^ to water, it releases *H_3_O^+^* ions, working as an acid. The equation for Ka is: *Ka = [${s.symbol}][H^+^]/[${s.secondaryIon}^+^]*. That'll be the Ka for the conjugate acid ${s.secondaryIon}^+^. When *Kb* is large, *Ka* is small and vice versa.`
   ],

   explainBasicHasselbalchDynamic: (s: AcidOrBase) => [
      `When solving for [OH^-^] in the Kb equation, and applying negative log to both sides, we get the *Henderson-Hasselbalch* equation for bases:`,
      `*pOH = pKb + log([${s.secondaryIon}^+^]/[${s.symbol}])*`
   ],

   instructToAddWeakBase: (s: AcidOrBase) => [
      `*Awesome!* Now add the weak base *${s.symbol}* to see it dissociate into *${s.secondaryIon}^+^* and *OH^-^*.`,
      `*Shake it into it!*`
   ],

   midAddingWeakBase: (s: AcidOrBase) => [
      `*Great!* Add until you're happy with the initial concentration of *${s.symbol}*.`,
      `*Keep shaking it!*`
   ],

   runningWeakBaseReaction: (s: AcidOrBase) => [
      `Watch how it reacts and dissociates!`,
      `*${s.symbol}* is now reacting with water and dissociating into *${s.secondaryIon}^+^* and *OH^-^*, and the presence of OH^-^ makes the solution basic.`
   ],

   reachedBaseEquilibrium: (s: AcidOrBase, currentPH: number) => {
      const kbText = scientificValues(s.kB);
      return [
         `Equilibrium has been reached! That means that this is the maximum amount of ions that can be produced by this weak base. *Kb = ${kbText}*, and *pH = ${formatFloat(currentPH)}* making the solution very basic. Notice that there's plenty of *${s.symbol}* remaining.`
      ];
   },

   explainBufferRangeBase: (s: AcidOrBase) => [
      `As seen in the bottom graph, right now there's much more *${s.symbol}* than *${s.secondaryIon}^+^* in the solution. It's not yet considered a buffer. When within the *buffer range* (the center of the graph) the solution has buffer properties.`
   ],

   calculateBufferRange: (s: AcidOrBase) => [
      `*Henderson-Hasselbalch* let's us calculate pH of the *buffer*. In this case, variations on the OH^-^ and ${s.symbol} ratio will make the pH vary. When OH^-^ and ${s.symbol} are the same, then *pH = pKa*. The *buffer range is ±1 from that point*.`
   ],

   explainEqualProportionsBase: (s: AcidOrBase) => [
      `When proportions of ${s.secondaryIon}^+^ and ${s.symbol} are equal, that's when the buffer has higher effectiveness. This is because at that point, it is able to buffer against equal amounts of acid *H^+^* or base *OH^-^* added.`
   ],

   explainSaltBase: (s: AcidOrBase) => [
      `A very common way to add a conjugate acid is by adding its *salt* (one that ionizes completely in water to *${s.secondaryIon}^+^*).`
   ],

   instructToAddSaltToBase: (s: AcidOrBase) => [
      `*${s.saltName}* is a salt that ionizes completely in water, letting *${s.secondaryIon}^+^* free in the solution, the conjugate acid of *${s.symbol}*. In other words, add *${s.saltName}* to increase the presence of *${s.secondaryIon}^+^* in the solution`,
      `*Shake it into it!*`
   ],

   reachedBasicBuffer: (s: AcidOrBase) => [
      `Awesome! That'll be a *buffer*. There's equal parts of *${s.secondaryIon}^+^* and *${s.symbol}* now. Notice that *pOH went up*, this is because the *${s.secondaryIon}^+^* trapped the *OH^-^* ions that were free in the solution, decreasing the concentration of *OH^-^* in the solution.`
   ],

   showBasePhWaterLine: (_s: AcidOrBase) => [
      `Now that the buffer is prepared, we can test it. Remember that graph at the top? That's right! It's from when we added *KOH* to pure water.`,
      `See how pH went up without much resistance.`
   ],

   instructToAddStrongBase: (_s: AcidOrBase) => [
      `But what will happen if we add *KOH* to this buffer? Let's find out!`,
      `Add KOH, which totally dissociates in water into *OH^-^* ions.`,
      `*Shake it into it!*`
   ],

   midAddingStrongBase: (s: AcidOrBase) => [
      `Watch how pH increases. But wait! It doesn't go up immediately as before. The *${s.secondaryIon}^+^* ions in the *buffer* react with the *OH^-^* free ions to make more *${s.symbol}*.`,
      `*Keep adding KOH to test the buffer!*`
   ]
};

// ============================================
// GUIDE STEPS ARRAY
// ============================================

const baseBufferGuideSteps: GuideStep[] = [
   // 1. Intro
   {
      id: 'intro',
      statement: bufferStatements.intro,
      inputState: { type: 'none' },
      highlights: []
   },
   // 2. Explain Eq Constant
   {
      id: 'explainEquilibriumConstant1',
      statement: bufferStatements.explainEquilibriumConstant1,
      inputState: { type: 'none' },
      highlights: []
   },
   // 3. Choice
   {
      id: 'explainEquilibriumConstant2',
      statement: bufferStatements.explainEquilibriumConstant2,
      inputState: { type: 'chooseSubstance', substanceType: 'weakAcid' },
      highlights: ['reactionSelection'],
      substanceType: 'weakAcid'
   },
   // 4. Explain Weak Acid
   {
      id: 'explainWeakAcid',
      statement: [],
      inputState: { type: 'none' },
      highlights: ['reactionEquation'],
      dynamicTextId: 'explainWeakAcid',
      substanceType: 'weakAcid',
      equationState: 'acidBlank'
   },
   // 5. Explain Ka
   {
      id: 'explainKa',
      statement: [],
      inputState: { type: 'none' },
      highlights: ['kEquation'],
      dynamicTextId: 'explainKa',
      substanceType: 'weakAcid'
   },
   // 6. Explain High Ka
   {
      id: 'explainHighKa',
      statement: bufferStatements.explainHighKa,
      inputState: { type: 'none' },
      highlights: ['kEquation']
   },
   // 7. Conjugate Base
   {
      id: 'explainConjugateBase',
      statement: [],
      inputState: { type: 'none' },
      highlights: [],
      dynamicTextId: 'explainConjugateBase',
      substanceType: 'weakAcid'
   },
   // 8. Explain Kb
   {
      id: 'explainKb',
      statement: [],
      inputState: { type: 'none' },
      highlights: [],
      dynamicTextId: 'explainKb',
      substanceType: 'weakAcid'
   },
   // 9. Explain Kw
   {
      id: 'explainKw',
      statement: bufferStatements.explainKw,
      inputState: { type: 'none' },
      highlights: ['kWEquation']
   },
   // 10. Explain P14
   {
      id: 'explainP14',
      statement: bufferStatements.explainP14,
      inputState: { type: 'none' },
      highlights: ['kWEquation']
   },
   // 11. Naming
   {
      id: 'explainKaKbNaming',
      statement: bufferStatements.explainKaKbNaming,
      inputState: { type: 'none' },
      highlights: ['kWEquation']
   },
   // 12. pKa pKb
   {
      id: 'explainPKaPKb',
      statement: bufferStatements.explainPKaPKb,
      inputState: { type: 'none' },
      highlights: ['pKEquation']
   },
   // 13. Hasselbalch
   {
      id: 'explainHendersonHasselbalch',
      statement: [],
      inputState: { type: 'none' },
      highlights: ['hasselbalchEquation'],
      dynamicTextId: 'explainHendersonHasselbalch',
      substanceType: 'weakAcid' // Uses weak acid model
   },
   // 14. Water Level
   {
      id: 'instructToSetWaterLevel1',
      statement: bufferStatements.instructToSetWaterLevel1,
      inputState: { type: 'setWaterLevel' },
      highlights: ['waterSlider']
   },
   // 15. Add Weak Acid
   {
      id: 'instructToAddWeakAcid',
      statement: [],
      inputState: { type: 'addSubstance', substanceType: 'weakAcid' },
      highlights: ['beakerTools'],
      dynamicTextId: 'instructToAddWeakAcid',
      substanceType: 'weakAcid',
      requiresAction: true,
      equationState: 'acidWithSubstanceConcentration'
   },
   // 16. Run Reaction (Visual only typically, but we act as a text step while reaction runs?)
   // In our sim, reaction runs instantly usually or via animation. We step through texts.
   // iOS has "RunWeakAcidReaction" step. We can just show text.
   {
      id: 'runningWeakAcidReaction',
      statement: [],
      inputState: { type: 'none' },
      highlights: [],
      dynamicTextId: 'runningWeakAcidReaction',
      substanceType: 'weakAcid',
      equationState: 'acidWithSubstanceConcentration'
   },
   // 17. Equilibrium Reached
   {
      id: 'weakAcidEquilibriumReached',
      statement: [],
      inputState: { type: 'none' },
      highlights: [],
      dynamicTextId: 'weakAcidEquilibriumReached',
      substanceType: 'weakAcid',
      equationState: 'acidFilled'
   },
   // 18. Intro Buffer Solutions
   {
      id: 'introBufferSolutions',
      statement: bufferStatements.introduceBufferSolutions,
      inputState: { type: 'none' },
      highlights: [],
      equationState: 'acidSummary'
   },
   // 19. Explain Buffer Solutions
   {
      id: 'explainBufferSolutions',
      statement: bufferStatements.explainBufferSolutions,
      inputState: { type: 'none' },
      highlights: [],
      equationState: 'acidSummary'
   },
   // 20. Explain Buffer Solutions 2
   {
      id: 'explainBufferSolutions2',
      statement: bufferStatements.explainBufferSolutions2,
      inputState: { type: 'none' },
      highlights: [],
      equationState: 'acidSummary'
   },
   // 21. Explain Buffer Uses
   {
      id: 'explainBufferUses',
      statement: bufferStatements.explainBufferUses,
      inputState: { type: 'none' },
      highlights: [],
      equationState: 'acidSummary'
   },
   // 22. Explain Fraction Chart
   {
      id: 'explainFractionChart',
      statement: [],
      inputState: { type: 'none' },
      highlights: ['bottom-chart-container'],
      dynamicTextId: 'explainFractionChart',
      substanceType: 'weakAcid',
      chartMode: 'curve',
      equationState: 'acidSummary'
   },
   // 23. Explain Pos
   {
      id: 'explainFractionChartCurrentPosition',
      statement: [],
      inputState: { type: 'none' },
      highlights: [],
      dynamicTextId: 'explainFractionChartCurrentPosition',
      substanceType: 'weakAcid',
      equationState: 'acidSummary'
   },
   // 24. Explain Range
   {
      id: 'explainBufferRange',
      statement: [],
      inputState: { type: 'none' },
      highlights: [],
      dynamicTextId: 'explainBufferRange',
      substanceType: 'weakAcid',
      equationState: 'acidSummary'
   },
   // 25. Explain Proportions
   {
      id: 'explainBufferProportions',
      statement: [],
      inputState: { type: 'none' },
      highlights: [],
      dynamicTextId: 'explainBufferProportions',
      substanceType: 'weakAcid',
      equationState: 'acidSummary'
   },
   // 26. Explain Salt
   {
      id: 'explainAddingAcidIonizingSalt',
      statement: [],
      inputState: { type: 'none' },
      highlights: [],
      dynamicTextId: 'explainAddingAcidIonizingSalt',
      substanceType: 'weakAcid',
      equationState: 'acidSummary'
   },
   // 27. Add Salt
   {
      id: 'instructToAddSalt',
      statement: [],
      inputState: { type: 'addSubstance', substanceType: 'weakAcid' }, // technically adding salt
      highlights: ['beakerTools'],
      dynamicTextId: 'instructToAddSalt',
      substanceType: 'weakAcid',
      requiresAction: true,
      equationState: 'acidSummary'
   },
   // 28. Reached Buffer
   {
      id: 'reachedAcidBuffer',
      statement: [],
      inputState: { type: 'none' },
      highlights: [],
      dynamicTextId: 'reachedAcidBuffer',
      substanceType: 'weakAcid',
      equationState: 'acidSummary'
   },
   // 29. Show pH Line
   {
      id: 'showPreviousPhLine',
      statement: [],
      inputState: { type: 'none' },
      highlights: ['phChart'],
      dynamicTextId: 'showPreviousPhLine',
      substanceType: 'weakAcid',
      equationState: 'acidSummary'
   },
   // 30. Add Strong Acid
   {
      id: 'instructToAddStrongAcid',
      statement: [],
      inputState: { type: 'addSubstance', substanceType: 'strongAcid' },
      highlights: ['beakerTools'],
      dynamicTextId: 'instructToAddStrongAcid',
      substanceType: 'weakAcid',
      requiresAction: true,
      equationState: 'acidSummary'
   },
   // 31. Limit Reached
   {
      id: 'acidBufferLimitReached',
      statement: bufferStatements.acidBufferLimitReached,
      inputState: { type: 'none' },
      highlights: [],
      equationState: 'acidSummary'
   },

   // --- WEAK BASE FLOW ---

   // 32. Select Weak Base
   {
      id: 'instructToChooseWeakBase',
      statement: bufferStatements.instructToChooseWeakBase,
      inputState: { type: 'chooseSubstance', substanceType: 'weakBase' },
      highlights: ['reactionSelection'],
      substanceType: 'weakBase'
   },
   // 33. Chose Base
   {
      id: 'choseWeakBase',
      statement: [],
      inputState: { type: 'none' },
      highlights: ['reactionEquation'],
      dynamicTextId: 'choseWeakBase',
      substanceType: 'weakBase'
   },
   // 34. Kb Equation
   {
      id: 'explainKbEquation',
      statement: [],
      inputState: { type: 'none' },
      highlights: ['kEquation'],
      dynamicTextId: 'explainKbEquation',
      substanceType: 'weakBase'
   },
   // 35. Kb/OH Relation
   {
      id: 'explainKbOhRelation',
      statement: bufferStatements.explainKbOhRelation,
      inputState: { type: 'none' },
      highlights: []
   },
   // 36. Conjugate Pair
   {
      id: 'explainConjugateAcidPair',
      statement: [],
      inputState: { type: 'none' },
      highlights: [],
      dynamicTextId: 'explainConjugateAcidPair',
      substanceType: 'weakBase'
   },
   // 37. Ka for Base
   {
      id: 'explainKaForBase',
      statement: [],
      inputState: { type: 'none' },
      highlights: [],
      dynamicTextId: 'explainKaForBase',
      substanceType: 'weakBase'
   },
   // 38. Basic Hasselbalch
   {
      id: 'explainBasicHasselbalchDynamic',
      statement: [],
      inputState: { type: 'none' },
      highlights: ['hasselbalchEquation'],
      dynamicTextId: 'explainBasicHasselbalchDynamic',
      substanceType: 'weakBase'
   },
   // 39. Water Level Base
   {
      id: 'instructToSetWaterLevelForBase',
      statement: bufferStatements.instructToSetWaterLevelForBase,
      inputState: { type: 'setWaterLevel' },
      highlights: ['waterSlider'],
      equationState: 'baseBlank'
   },
   // 40. Add Weak Base
   {
      id: 'instructToAddWeakBase',
      statement: [],
      inputState: { type: 'addSubstance', substanceType: 'weakBase' },
      highlights: ['beakerTools'],
      dynamicTextId: 'instructToAddWeakBase',
      substanceType: 'weakBase',
      requiresAction: true,
      equationState: 'baseWithSubstanceConcentration'
   },
   // 41. Run Base Reaction
   {
      id: 'runningWeakBaseReaction',
      statement: [],
      inputState: { type: 'none' },
      highlights: [],
      dynamicTextId: 'runningWeakBaseReaction',
      substanceType: 'weakBase',
      equationState: 'baseWithSubstanceConcentration'
   },
   // 42. Base Equilibrium
   {
      id: 'reachedBaseEquilibrium',
      statement: [],
      inputState: { type: 'none' },
      highlights: [],
      dynamicTextId: 'reachedBaseEquilibrium',
      substanceType: 'weakBase',
      equationState: 'baseFilled'
   },
   // 43. Explain Basic Hasselbalch Static (Transition)
   {
      id: 'explainBasicHasselbalch',
      statement: bufferStatements.explainBasicHasselbalch,
      inputState: { type: 'none' },
      highlights: [],
      equationState: 'baseSummary'
   },
   // 44. Buffer Range
   {
      id: 'explainBufferRangeBase',
      statement: [],
      inputState: { type: 'none' },
      highlights: ['bottom-chart-container'],
      dynamicTextId: 'explainBufferRangeBase',
      substanceType: 'weakBase',
      chartMode: 'curve',
      equationState: 'baseSummary'
   },
   // 45. Calculate Range
   {
      id: 'calculateBufferRange',
      statement: [],
      inputState: { type: 'none' },
      highlights: [],
      dynamicTextId: 'calculateBufferRange',
      substanceType: 'weakBase',
      equationState: 'baseSummary'
   },
   // 46. Proportions
   {
      id: 'explainEqualProportionsBase',
      statement: [],
      inputState: { type: 'none' },
      highlights: [],
      dynamicTextId: 'explainEqualProportionsBase',
      substanceType: 'weakBase',
      equationState: 'baseSummary'
   },
   // 47. Explain Salt
   {
      id: 'explainSaltBase',
      statement: [],
      inputState: { type: 'none' },
      highlights: [],
      dynamicTextId: 'explainSaltBase',
      substanceType: 'weakBase',
      equationState: 'baseSummary'
   },
   // 48. Add Salt
   {
      id: 'instructToAddSaltToBase',
      statement: [],
      inputState: { type: 'addSubstance', substanceType: 'weakBase' },
      highlights: ['beakerTools'],
      dynamicTextId: 'instructToAddSaltToBase',
      substanceType: 'weakBase',
      requiresAction: true,
      equationState: 'baseSummary'
   },
   // 49. Reached Buffer
   {
      id: 'reachedBasicBuffer',
      statement: [],
      inputState: { type: 'none' },
      highlights: [],
      dynamicTextId: 'reachedBasicBuffer',
      substanceType: 'weakBase',
      equationState: 'baseSummary'
   },
   // 50. Show pH Line
   {
      id: 'showBasePhWaterLine',
      statement: [],
      inputState: { type: 'none' },
      highlights: ['phChart'],
      dynamicTextId: 'showBasePhWaterLine',
      substanceType: 'weakBase',
      equationState: 'baseSummary'
   },
   // 51. Add Strong Base
   {
      id: 'instructToAddStrongBase',
      statement: [],
      inputState: { type: 'addSubstance', substanceType: 'strongBase' },
      highlights: ['beakerTools'],
      dynamicTextId: 'instructToAddStrongBase',
      substanceType: 'weakBase',
      requiresAction: true,
      equationState: 'baseSummary'
   },
   // 52. Mid Adding Strong Base (Testing buffer)
   {
      id: 'midAddingStrongBase',
      statement: [],
      inputState: { type: 'addSubstance', substanceType: 'strongBase' },
      highlights: ['beakerTools'],
      dynamicTextId: 'midAddingStrongBase',
      substanceType: 'weakBase',
      requiresAction: true,
      equationState: 'baseSummary'
   },
   // 53. End
   {
      id: 'baseBufferLimitReached',
      statement: bufferStatements.baseBufferLimitReached,
      inputState: { type: 'none' },
      highlights: [],
      equationState: 'baseSummary'
   }
];

export const bufferGuideSteps = mergeGuideSteps(baseBufferGuideSteps, bufferGuideJson.steps);
