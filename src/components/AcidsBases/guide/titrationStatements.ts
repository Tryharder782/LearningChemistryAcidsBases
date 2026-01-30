import type { AcidOrBase } from '../../../helper/acidsBases/types';

const hydrogen = 'H^+^';
const hydroxide = 'OH^-^';
const water = 'H_2_O';

const formatCharge = (symbol: string, charge: string) => `${symbol}^${charge}^`;

const formatSecondary = (substance: AcidOrBase) => {
   const isAcid = substance.type === 'strongAcid' || substance.type === 'weakAcid';
   const charge = isAcid ? '-' : '+';
   return formatCharge(substance.secondaryIon, charge);
};

const toScientific = (value: number) => {
   if (!Number.isFinite(value)) return '0';
   return value.toExponential(2);
};

export type TitrationStatementContext = {
   substance: AcidOrBase;
   pH: number;
   substanceMoles: number;
};

const statements: Record<string, (ctx: TitrationStatementContext) => string[]> = {
   'TitrationStatements.intro': () => [
      'One big use of acid-base reactions is a technique called titration. Let\'s learn more about it!',
      '*Choose a strong acid!*'
   ],
   'TitrationStatements.explainNeutralization': () => [
      `The reaction between an acid and a base is called *neutralization*. An acid reacts with a base to form a salt and water. We already know strong acids totally dissociate into ${hydrogen} ions, while strong bases into ${hydroxide}.`
   ],
   'TitrationStatements.explainMolecularIonicEquations': () => [
      'For *neutralization* reactions the importance resides on the fact the ions dissociated more than the molecular compounds. The *ionic equation* which only shows the ions of importance.'
   ],
   'TitrationStatements.explainTitration': () => [
      `So when ${hydrogen} and ${hydroxide} react, they form ${water}. This is the *ionic equation* of a neutralization reaction. A *titration* occurs when you slowly add an acid to a base or vice versa, until reaching the *equivalence point* or beyond.`
   ],
   'TitrationStatements.explainEquivalencePoint': () => [
      'The *equivalence point* is the one at which the acid and the base have totally neutralized each other. In the case of strong acids or bases, the *pH is 7* at this point.'
   ],
   'TitrationStatements.explainTitrationCurveAndInstructToSetWaterLevel': () => [
      'the plotted curve of pH vs titrant added is called a titration curve. Let\'s first see the titration curve for a strong acid being titrated by a strong base. *Set the water level. Note: feel free to use the pH meter whenever.*'
   ],
   'TitrationStatements.midAddingStrongAcid': () => [
      `Concentration of *[${hydrogen}]* is getting higher! And the pH is also very low.`,
      'This is a very acidic solution.',
      `*Keep shaking until you\'re happy with the initial concentration of ${hydrogen}.*`
   ],
   'TitrationStatements.explainTitrationStages': () => [
      `During a titration, there are stages: before the equivalence point (EP), at the EP and finally after the EP. At this stage, before the EP, there\'s an excess of *${hydrogen}* moles in the solution, making it *acidic*. All moles of *${hydroxide}* will react to *neutralize moles of ${hydrogen}.*`
   ],
   'TitrationStatements.explainMolesOfHydrogen': () => [
      `Moles of *${hydrogen}* in the solution will be the moles that are already present, minus the ones that will be neutralized by the addition of moles of *${hydroxide}*. By dividing this amount by the total volume, it\'s possible to determine the concentration of *${hydrogen}*.`
   ],
   'TitrationStatements.explainIndicator': () => [
      'Now let\'s add the *indicator*. This is a substance that makes the solution change its color at a determined pH. It\'s very important to pick an indicator whose changing point is very close to the *equivalence point, to identify it.*'
   ],
   'TitrationStatements.instructToAddIndicator': () => [
      'If you want to see the effect of the indicator, just set the view of the beaker to macroscopic.',
      'Tap on the dropper to let a few drops fall into the solution. *Tap to add it!*'
   ],
   'TitrationStatements.instructToSetMolarityOfStrongBaseTitrant': () => [
      'Now set the concentration of the strong base KOH. notice that the titrant is in a burette. This tool allows us to slowly add small amounts of the substance into the solution while easily measuring the volume added. *Use the slider.*'
   ],
   'TitrationStatements.midAddingStrongBaseTitrant': () => [
      `At this stage, ${hydrogen} ions are reacting with the ${hydroxide} ions added to form water.`,
      'The solution is slowly increasing its pH. *Keep adding by tapping the burette!*'
   ],
   'TitrationStatements.reachedStrongAcidEquivalencePoint': () => [
      `We\'ve reached the *equivalence point*. As all ${hydrogen} ions have reacted with the ${hydroxide} ions added, there\'s only water and salt remaining, making the solution *neutral.*`,
      '*That means, a pH of 7.*'
   ],
   'TitrationStatements.instructToAddStrongBaseTitrantPostEP': () => [
      `At this point, the macroscopic view of the solution changes color, as pH is no longer acid. Also, from this point on, all *${hydroxide}* added will remain in the solution, making it basic.`,
      '*Keep adding by tapping the burette!*'
   ],
   'TitrationStatements.endOfStrongAcidTitration': () => [
      'Awesome! We ended the titration. Normally, in the laboratory, the titration ends at the equivalence point, as the goal is usually to determine the concentration of any of the species. *Let\'s titrate a strong base now!*'
   ],
   'TitrationStatements.instructToChooseStrongBase': () => [
      'Now, let\'s titrate a strong base!',
      '*Choose a strong base.*'
   ],
   'TitrationStatements.instructToSetWaterLevelForStrongBaseTitration': () => [
      'Let\'s first see the titration curve for a strong base being titrated by a strong acid.',
      '*Set the water level. Note: Feel free to use the pH meter whenever.*'
   ],
   'TitrationStatements.midAddingStrongBase': () => [
      `Concentration of *${hydroxide}* is getting higher! And the pH is also very high, so this is a very basic solution.`,
      `*Keep shaking until you\'re happy with the initial concentration of ${hydroxide}.*`
   ],
   'TitrationStatements.postAddingStrongBaseExplanation1': () => [
      `During a titration, there are stages: before the equivalence point (EP), at the EP and finally after the EP. At this stage, before the EP, there\'s an excess of *${hydroxide}* in the solution, making it *basic*. All moles of *${hydrogen}* added will react to *neutralize moles of ${hydroxide}.*`
   ],
   'TitrationStatements.postAddingStrongBaseExplanation2': () => [
      `Moles of *${hydroxide}* in the solution will be the moles that are already present, minus the ones that will be neutralized by the addition of moles of *${hydrogen}*. By dividing this amount by the total volume, it\'s possible to determine the concentration of ${hydroxide}.`
   ],
   'TitrationStatements.instructToSetMolarityOfStrongAcidTitrant': () => [
      'Now set the concentration of the strong acid HCl. notice that the titrant is in a burette. This tool allows us to slowly add small amounts of the substance into the solution while easily measuring the volume added. *Use the slider.*'
   ],
   'TitrationStatements.midAddingStrongAcidTitrant': () => [
      `At this stage, ${hydroxide} ions are reacting with the ${hydrogen} ions added to form water. The solution is slowly decreasing its pH.`,
      '*Keep adding by tapping the burette!*'
   ],
   'TitrationStatements.reachedStrongBaseEquivalencePoint': () => [
      `We\'ve reached the *equivalence point*. As all ${hydroxide} ions have reacted with the ${hydrogen} ions added, there\'s only water and salt remaining, making the solution *neutral*.`,
      '*This means the pH is 7.*'
   ],
   'TitrationStatements.instructToAddStrongAcidTitrantPostEP': () => [
      `At this point, the macroscopic view of the solution changes color, as the pH is no longer basic. Also, from this point on, all *${hydrogen}* moles added will remain in the solution, making it acidic.`,
      '*Keep adding by tapping the burette!*'
   ],
   'TitrationStatements.endOfStrongBaseTitration': () => [
      'Awesome! These types of reactions are very useful. But what if were to titrate weak acids or bases?',
      '*Let\'s titrate a weak acid now!*'
   ],
   'TitrationStatements.instructToChooseWeakAcid': () => [
      `We already know weak acids partially dissociate into *${hydrogen}* ions, while strong bases totally dissociate into *${hydroxide}*.`,
      '*Choose a weak acid.*'
   ],
   'TitrationStatements.instructToSetWeakAcidTitrationWaterLevel': () => [
      'These equations sound familiar right? Well this is because we already got to learn about them in the weak acids equilibrium.'
   ],
   'TitrationStatements.runningWeakAcidReaction': () => [
      `The reaction is now running, and the concentration of *${hydrogen}* is increasing!`
   ],
   'TitrationStatements.instructToSetMolarityOfTitrantOfWeakAcidSolution': () => [
      'Now set the concentration of the strong base KOH. notice that the titrant is in a burette. This tool allows us to slowly add small amounts of the substance into the solution while easily measuring the volume added. *Use the slider.*'
   ],
   'TitrationStatements.instructToAddTitrantToWeakAcidPostEP': () => [
      `The concentration of *${hydroxide}* will merely be the moles of *${hydroxide}* added from now on, divided by the total volume.`,
      '*Keep adding by tapping the burette!*'
   ],
   'TitrationStatements.endOfWeakAcidTitration': () => [
      'Awesome! We ended the titration. Normally, in the laboratory, the titration ends at the equivalence point, as the goal is usually to determine the concentration of any of the species.'
   ],
   'TitrationStatements.instructToChooseWeakBase': () => [
      'Now, let\'s titrate a weak base!',
      '*Choose a weak base.*'
   ],
   'TitrationStatements.instructToSetWaterLevelOfWeakBaseTitration': () => [
      'Let\'s first see the titration curve for a weak base being titrated by a strong acid.',
      '*Set the water level. Note: Feel free to use the pH meter whenever.*'
   ],
   'TitrationStatements.runningWeakBaseReaction': () => [
      `The reaction is now running, and the concentration of *${hydroxide}* is increasing!`
   ],
   'TitrationStatements.instructToSetMolarityTitrantOfWeakBaseSolution': () => [
      'Now set the concentration of the strong acid HCl. notice that the titrant is in a burette. This tool allows us to slowly add small amounts of the substance into the solution while easily measuring the volume added. *Use the slider.*'
   ],
   'TitrationStatements.explainWeakAcidEP2': ({ pH }) => [
      `As little as it is, it\'s more than enough to make the solution slightly basic. From this point on, all *${hydroxide}* added will remain in the solution, making it basic. At this point, the macroscopic view of the solution changes color, as the *pH is now ${pH.toFixed(2)}*.`
   ],
   'TitrationStatements.explainWeakBasedEP2': ({ pH }) => [
      `As little as it is, it\'s more than enough to make the solution slightly acidic. From this point on, all *${hydrogen}* added will remain in the solution, making it acidic. At this point, the macroscopic view of the solution changes color, as the *pH is now ${pH.toFixed(2)}*.`
   ],
   'TitrationStatements.instructToAddTitrantToWeakBasePostEP': () => [
      `The concentration of *${hydrogen}* will merely be the moles of *${hydrogen}* added from now on, divided by the total volume.`,
      '*Keep adding by tapping the burette!*'
   ],
   'TitrationStatements.endOfWeakBaseTitration': () => [
      'Awesome! We ended the titration. Normally, in the laboratory, the titration ends at the equivalence point, as the goal is usually to determine the concentration of any of the species.'
   ],

   // Substance-specific
   'TitrationSubstanceStatements.instructToAddStrongAcid': ({ substance }) => [
      'Now let\'s prepare the acidic solution that we\'re going to titrate.',
      `*Shake the ${substance.symbol} into the beaker!*`
   ],
   'TitrationSubstanceStatements.instructToAddStrongBaseTitrant': ({ substance }) => [
      `Let\'s add the titrant now! The titration curve starts at a *very low pH*, as the solution is purely acidic now. When HCL is added, it will neutralize the ${substance.symbol} to slowly make it more basic. *Tap to add it.*`
   ],
   'TitrationSubstanceStatements.midAddingStrongBaseTitrantPostEP': ({ substance }) => [
      `At this stage there is no more ${substance.symbol} in the solution to react with the KOH, so this one is fully dissociating into ${hydroxide}. The solution is rapidly increasing its pH. *Keep adding by tapping the burette!*`
   ],
   'TitrationSubstanceStatements.instructToAddStrongBase': ({ substance }) => [
      'Now, let\'s prepare the basic solution that we\'re going to titrate. Add the ' + substance.symbol + '.',
      '*Shake it into it.*'
   ],
   'TitrationSubstanceStatements.instructToAddStrongAcidTitrantPreEP': ({ substance }) => [
      `Let\'s just add the titrant now! The titration curve starts at a *very high pH*, as the solution is purely basic now. When HCl is added, it will neutralize the ${substance.symbol} to slowly make it more acidic. *Tap to add it.*`
   ],
   'TitrationSubstanceStatements.midAddingStrongAcidTitrantPostEP': ({ substance }) => [
      `At this stage there is no more ${substance.symbol} in the solution to react with the HCl, so this is fully dissociating into ${hydrogen}. The solution is rapidly decreasing its pH. *Keep adding by tapping the burette!*`
   ],
   'TitrationSubstanceStatements.explainWeakAcidTitrationReaction': ({ substance }) => [
      `For this *neutralization* reaction, *K^+^* ions are spectator ions, meaning that they don\'t actually take part in the reaction. So, let\'s just write KOH as *${hydroxide}* and ${substance.symbol} as *${formatSecondary(substance)}*.`
   ],
   'TitrationSubstanceStatements.instructToAddWeakAcid': ({ substance }) => [
      'Now let\'s prepare the acidic solution that we\'re going to titrate.',
      `*Shake the ${substance.symbol} into the beaker.*`
   ],
   'TitrationSubstanceStatements.endOfWeakAcidReaction': ({ substance, pH, substanceMoles }) => [
      `The concentration of *${hydrogen}* is now a little higher, and the solution is acidic. Recall the the equations from the previous weak acid-base part. *Ka is ${toScientific(substance.kA)}, pH is ${pH.toFixed(2)} and the initial moles of ${substance.symbol} are ${substanceMoles.toFixed(2)} moles*. Let\'s remember those values!`
   ],
   'TitrationSubstanceStatements.explainWeakAcidTitrationStages': ({ substance }) => [
      `For titrations of weak acids, there are more stages involved: buffer region (before the EP), at the EP, and finally after the EP. Before the EP, there\'s plenty of ${substance.symbol} in the solution, which will react with any moles of *${hydroxide}* added.`
   ],
   'TitrationSubstanceStatements.explainWeakAcidBufferRegion': ({ substance }) => [
      `Before the equivalence point, in this case, this section is called the *buffer region*, because the weak acid solution will act as a buffer during this stage, due to the relation between ${substance.symbol} and ${formatSecondary(substance)} present in the solution.`
   ],
   'TitrationSubstanceStatements.explainWeakAcidHasselbalch': ({ substance }) => [
      'That\'s why the equation of *Henderson-Hasselbalch* can be used in this part.',
      `Until the EP is reached, any mole of *${hydroxide}* added will react with ${substance.symbol} to produce the same amount of *${formatSecondary(substance)}* moles, and to consume *${substance.symbol}* moles.`
   ],
   'TitrationSubstanceStatements.explainWeakAcidBufferMoles': ({ substance }) => [
      `That\'s why at this stage, the moles of *${hydroxide}* added will be the same as the moles of ${substance.symbol} in the solution. While the moles of ${formatSecondary(substance)} will be what\'s already present in the solution, minus the ones consumed by the added  *${hydroxide}.*`
   ],
   'TitrationSubstanceStatements.instructToAddTitrantToWeakAcid': ({ substance }) => [
      `Let\'s add the titrant now! The titration curve starts at a *very low pH*, as the solution is purely acidic right now. When KOH is added, it will neutralize the ${substance.symbol} to slowly make it more basic. *Tap to add it.*`
   ],
   'TitrationSubstanceStatements.reachedWeakAcidMaxBufferCapacity': ({ substance }) => [
      `This is the point of max buffer capacity, as there\'s equal amounts of ${formatSecondary(substance)} and ${substance.symbol} right now. At this point, *$pH = pKA$*. It\'s the mid-point, half way through the EP.`
   ],
   'TitrationSubstanceStatements.instructToAddTitrantToWeakAcidPostMaxBufferCapacity': ({ substance }) => [
      `At this stage, *${hydroxide}* is reacting with the ${substance.symbol} present in the solution to form ${formatSecondary(substance)} and water. The solution is slowly increasing its pH (becoming more basic). *Keep adding by tapping the burette!*`
   ],
   'TitrationSubstanceStatements.reachedWeakAcidEquivalencePoint': ({ substance, pH }) => [
      `We\'ve reached the *equivalence point.* Unlike strong titrations, in this case the pH isn\'t 7 but ${pH.toFixed(2)}, being slightly basic. Right now, all of the added *${hydroxide}* has neutralized all of the ${substance.symbol}, and there\'s no more of it in the solution.`
   ],
   'TitrationSubstanceStatements.explainWeakAcidEP1': ({ substance }) => [
      `As we saw in the previous parts, ${formatSecondary(substance)} is the conjugate base of ${substance.symbol}. Because there are so many ${formatSecondary(substance)} ions in the solution, it produces little amounts of *${hydroxide}*, making the solution basic.`
   ],
   'TitrationSubstanceStatements.instructToAddWeakBase': ({ substance }) => [
      'Now, let\'s prepare the basic solution that we\'re going to titrate.',
      `*Shake the ${substance.symbol} into the beaker*`
   ],
   'TitrationSubstanceStatements.endOfWeakBaseReaction': ({ substance, pH, substanceMoles }) => [
      `The concentration of *${hydroxide}* is getting a little higher, so the solution is now basic. Recall the equations from the previous weak acid-base part. *Kb is ${toScientific(substance.kB)}*, pOH is ${(14 - pH).toFixed(2)} and the initial moles of ${substance.symbol} are ${substanceMoles.toFixed(2)}. Let\'s remember those values!`
   ],
   'TitrationSubstanceStatements.explainWeakBaseTitrationStages': ({ substance }) => [
      `For titrations of weak bases, there are more stages involved: buffer region (before the EP), at the EP, and finally after the EP. Before the EP, there\'s plenty of ${substance.symbol} in the solution, which will react with any moles of *${hydrogen}* added.`
   ],
   'TitrationSubstanceStatements.explainWeakBaseBufferRegion': ({ substance }) => [
      `Before the equivalence point, in this case, this section is called the *buffer region*, because the weak base solution will act as a buffer during this stage, due to the relation between ${formatSecondary(substance)} and ${substance.symbol} present in the solution.`
   ],
   'TitrationSubstanceStatements.explainWeakBaseHasselbalch': ({ substance }) => [
      'That\'s why the equation of *Henderson-Hasselbalch* can be used in this part.',
      `Until the EP is reached, any mole of *${hydrogen}* added will react with ${formatSecondary(substance)} to produce the same amount of *${formatSecondary(substance)}* moles, and to consume *${substance.symbol}* moles.`
   ],
   'TitrationSubstanceStatements.explainWeakBaseBufferMoles': ({ substance }) => [
      `That\'s why at this stage, the moles of *${hydrogen}* added will be the same as the moles of ${formatSecondary(substance)} in the solution. While the moles of ${substance.symbol} will be what\'s already present in the solution, minus the ones consumed by the added  *${hydrogen}.*`
   ],
   'TitrationSubstanceStatements.instructToAddTitrantToWeakBase': ({ substance }) => [
      `Let\'s add the titrant now! The titration curve starts at a *very high pH*, as the solution is purely basic right now. When ${hydrogen} is added, it will neutralize the ${substance.symbol} to slowly make it more basic. *Tap to add it.*`
   ],
   'TitrationSubstanceStatements.reachedWeakBaseMaxBufferCapacity': ({ substance }) => [
      `This is the point of max buffer capacity, as there\'s equal amounts of ${substance.symbol} and ${formatSecondary(substance)} right now. At this point, *$pH = pKA$*. It\'s the mid-point, half way through the EP.`
   ],
   'TitrationSubstanceStatements.instructToAddTitrantToWeakBasePostMaxBufferCapacity': ({ substance }) => [
      `At this stage, *${hydrogen}* is reacting with the ${substance.symbol} present in the solution to form ${formatSecondary(substance)} and water. The solution is slowly decreasing its pH (becoming more acidic). *Keep adding by tapping the burette!*`
   ],
   'TitrationSubstanceStatements.reachedWeakBaseEquivalencePoint': ({ substance, pH }) => [
      `We\'ve reached the *equivalence point.* Unlike strong titrations, in this case the pH isn\'t 7 but ${pH.toFixed(2)}, being slightly acidic. Right now, all of the added *${hydrogen}* has neutralized all of the ${substance.symbol}, and there\'s no more of it in the solution.`
   ],
   'TitrationSubstanceStatements.explainWeakBaseEP1': ({ substance }) => [
      `As we saw in the previous parts, the ${formatSecondary(substance)} is the conjugate acid of ${substance.symbol}. Because there are so many ${substance.symbol} ions in the solution, it produce little amounts of *${hydrogen}*, making the solution basic.`
   ]
};

export const resolveTitrationStatement = (key: string | undefined, ctx: TitrationStatementContext): string[] | null => {
   if (!key) return null;
   const resolver = statements[key];
   if (!resolver) return null;
   return resolver(ctx);
};
