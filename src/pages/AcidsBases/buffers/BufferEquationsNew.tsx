import { useEffect, useRef, useState } from 'react';
import type { IntroScreenElement, InputState } from '../../../components/AcidsBases/guide/types';
import type { AcidOrBase } from '../../../helper/acidsBases/types';
import type { EquationState } from './types';
import { ACIDS_BASES_COLORS } from '../../../theme/acidsBasesColors';

interface BufferEquationsNewProps {
   className?: string;
   overrides?: {
      highlights?: IntroScreenElement[];
      inputState?: InputState;
      hasInteracted?: boolean;
      onInteraction?: () => void;
   };
   state?: EquationState;
   substance?: AcidOrBase | null;
   pH?: number;
   concentrations?: {
      substance: number;
      primary: number;
      secondary: number;
   };
}

// Helper to format scientific notation
function toScientific(val: number): string {
   if (!val || val === 0) return '0';
   const absVal = Math.abs(val);
   const exponent = Math.floor(Math.log10(absVal));

   if (exponent >= -2 && exponent <= 2) {
      return val.toFixed(3);
   }

   const mantissa = val / Math.pow(10, exponent);
   const mantissaStr = mantissa.toFixed(1);
   return `${mantissaStr}×10${toSuperscript(exponent)}`;
}

function toSuperscript(num: number): string {
   const map: Record<string, string> = {
      '-': '⁻', '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴',
      '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹'
   };
   return num.toString().split('').map(c => map[c] || c).join('');
}

function useAnimatedNumber(target: number, durationMs: number = 250): number {
   const [value, setValue] = useState(target);
   const valueRef = useRef(target);

   useEffect(() => {
      if (!Number.isFinite(target)) return;
      const from = valueRef.current;
      const to = target;
      if (Math.abs(to - from) < 1e-9) {
         setValue(to);
         valueRef.current = to;
         return;
      }

      let rafId = 0;
      const start = performance.now();
      const step = (now: number) => {
         const t = Math.min(1, (now - start) / durationMs);
         const next = from + (to - from) * t;
         valueRef.current = next;
         setValue(next);
         if (t < 1) {
            rafId = requestAnimationFrame(step);
         }
      };

      rafId = requestAnimationFrame(step);
      return () => cancelAnimationFrame(rafId);
   }, [target, durationMs]);

   return value;
}

// Placeholder box for empty values
const Placeholder = () => (
   <div className="inline-block w-10 h-6 border-2 border-dashed border-gray-300 rounded-sm align-middle" />
);

// Styled value (orange)
const Val = ({ children }: { children: React.ReactNode }) => (
   <span className="font-medium" style={{ color: ACIDS_BASES_COLORS.ui.phScale.acidLabel }}>{children}</span>
);

export function BufferEquationsNew({
   className = '',
   state = 'acidBlank',
   substance,
   pH = 7,
   concentrations = { substance: 0, primary: 0, secondary: 0 }
}: BufferEquationsNewProps) {

   const isAcid = state.startsWith('acid');
   const showSubstance = state !== 'acidBlank' && state !== 'baseBlank';
   const showIonConcentration = state === 'acidWithAllConcentration' || state === 'baseWithAllConcentration' ||
      state === 'acidFilled' || state === 'baseFilled' ||
      state === 'acidSummary' || state === 'baseSummary';
   const showAllTerms = state === 'acidFilled' || state === 'baseFilled' ||
      state === 'acidSummary' || state === 'baseSummary';
   const isSummary = state === 'acidSummary' || state === 'baseSummary';
   const showPKEquations = !isSummary;
   const showKwEquations = isAcid && !isSummary;
   const showPhSumAtTop = state === 'baseSummary';
   const showPhSumAtBottom = !isAcid && !showPhSumAtTop;

   // Labels
   const kTerm = isAcid ? 'Ka' : 'Kb';
   const substanceLabel = substance?.symbol ?? 'HA';
   const secondaryLabel = substance?.secondaryIon ?? 'A';
   const secondaryCharge = substance?.type === 'weakBase' ? '⁺' : '⁻';
   const secondaryIonLabel = `${secondaryLabel}${secondaryCharge}`;
   const primaryIonLabel = substance?.type === 'weakBase' ? 'OH⁻' : 'H⁺';

   // Values
   const kaVal = substance?.kA || 0;
   const kbVal = substance?.kB || 0;
   const kValue = isAcid ? kaVal : kbVal;
   const pKaVal = substance?.pKA || 0;
   const valH = concentrations.primary;
   const valA = concentrations.secondary;
   const valHA = concentrations.substance;

   // Animations
   const animatedPH = useAnimatedNumber(pH);
   const animatedKa = useAnimatedNumber(kaVal);
   const animatedKb = useAnimatedNumber(kbVal);
   const animatedK = useAnimatedNumber(kValue);
   const animatedPKa = useAnimatedNumber(pKaVal);
   const animatedValH = useAnimatedNumber(valH);
   const animatedValA = useAnimatedNumber(valA);
   const animatedValHA = useAnimatedNumber(valHA);
   const pOH = 14 - pH;
   const animatedPOH = useAnimatedNumber(pOH);

   // Grid config matching TitrationMathPanel exactly
   const gridClass = "grid gap-y-1 w-fit font-sans text-base text-gray-900 items-center justify-items-center";
   const colStyle = { gridTemplateColumns: 'max-content 24px max-content 24px max-content 48px max-content 24px max-content 24px max-content' };
   const span3 = "row-span-3 self-center";
   const lineClass = "col-span-3 border-b border-black w-full h-px self-center";

   return (
      <div className={`flex flex-col gap-1 text-base font-sans ${className}`}>
         {/* ======== BLOCK 1: Ka Definition ======== */}
         <div className={gridClass} style={colStyle}>
            {/* Row 1-3: Ka = [H+][A-]/[HA]    pKa = -log(Ka) */}
            {/* Left side */}
            <div className={span3}>{kTerm}</div>
            <div className={span3}>=</div>
            {/* Fraction numerator */}
            <div>[{primaryIonLabel}]</div>
            <div>·</div>
            <div>[{secondaryIonLabel}]</div>
            {/* Spacer */}
            <div className={`w-8 ${span3}`} />
            {/* Right side: pKa = -log(Ka) OR pH sum */}
            {showPKEquations ? (
               <>
                  <div className={span3}>p{kTerm}</div>
                  <div className={span3}>=</div>
                  <div className={`${span3} col-span-3`}>-log({kTerm})</div>
               </>
            ) : showPhSumAtTop ? (
               <>
                  <div className={span3}>14</div>
                  <div className={span3}>=</div>
                  <div className={span3}>pH</div>
                  <div className={span3}>+</div>
                  <div className={span3}>pOH</div>
               </>
            ) : (
               <div className={`${span3} col-span-5`} />
            )}
            {/* Fraction line */}
            <div className={lineClass} />
            {/* Fraction denominator */}
            <div>[{substanceLabel}]</div>
            <div />
            <div />
         </div>

         {/* ======== BLOCK 2: Ka Values ======== */}
         <div className={gridClass} style={colStyle}>
            {/* Left side */}
            <div className={span3}>
               {showAllTerms ? <Val>{toScientific(animatedK)}</Val> : <Placeholder />}
            </div>
            <div className={`${span3}`} style={{ color: ACIDS_BASES_COLORS.ui.phScale.acidLabel }}>=</div>
            {/* Fraction numerator values */}
            <div>{showIonConcentration ? <Val>{toScientific(animatedValH)}</Val> : <Placeholder />}</div>
            <div><Val>·</Val></div>
            <div>{showIonConcentration ? <Val>{toScientific(animatedValA)}</Val> : <Placeholder />}</div>
            {/* Spacer */}
            <div className={`w-8 ${span3}`} />
            {/* Right side values */}
            {showPKEquations ? (
               <>
                  <div className={span3}>
                     {showAllTerms ? <Val>{animatedPKa.toFixed(2)}</Val> : <Placeholder />}
                  </div>
                  <div className={`${span3}`} style={{ color: ACIDS_BASES_COLORS.ui.phScale.acidLabel }}>=</div>
                  <div className={`${span3} col-span-3 flex items-center`}>
                     <Val>-log(</Val>
                     {showAllTerms ? <Val>{toScientific(animatedKa)}</Val> : <Placeholder />}
                     <Val>)</Val>
                  </div>
               </>
            ) : showPhSumAtTop ? (
               <>
                  <div className={span3}>14</div>
                  <div className={`${span3}`} style={{ color: ACIDS_BASES_COLORS.ui.phScale.acidLabel }}>=</div>
                  <div className={span3}><Val>{animatedPH.toFixed(2)}</Val></div>
                  <div className={`${span3}`} style={{ color: ACIDS_BASES_COLORS.ui.phScale.acidLabel }}>+</div>
                  <div className={span3}><Val>{animatedPOH.toFixed(2)}</Val></div>
               </>
            ) : (
               <div className={`${span3} col-span-5`} />
            )}
            {/* Fraction line */}
            <div className={lineClass} />
            {/* Fraction denominator value */}
            <div>{showSubstance ? <Val>{toScientific(animatedValHA)}</Val> : <Placeholder />}</div>
            <div />
            <div />
         </div>

         {/* Spacer */}
         <div className="h-2" />

         {/* ======== BLOCK 3: Kw Definition (acid only) ======== */}
         {showKwEquations && (
            <div className={gridClass} style={colStyle}>
               <div>Kw</div>
               <div>=</div>
               <div>Ka</div>
               <div>x</div>
               <div>Kb</div>
               <div className="col-span-6" />
            </div>
         )}

         {/* ======== BLOCK 4: Kw Values (acid only) ======== */}
         {showKwEquations && (
            <div className={gridClass} style={colStyle}>
               <div>10⁻¹⁴</div>
               <div style={{ color: ACIDS_BASES_COLORS.ui.phScale.acidLabel }}>=</div>
               <div>{showAllTerms ? <Val>{toScientific(animatedKa)}</Val> : <Placeholder />}</div>
               <div><Val>x</Val></div>
               <div>{showAllTerms ? <Val>{toScientific(animatedKb)}</Val> : <Placeholder />}</div>
               <div className="col-span-6" />
            </div>
         )}

         {/* ======== BLOCK 5: pH Sum Definition (base only, bottom) ======== */}
         {showPhSumAtBottom && (
            <>
               <div className={gridClass} style={colStyle}>
                  <div>14</div>
                  <div>=</div>
                  <div>pH</div>
                  <div>+</div>
                  <div>pOH</div>
                  <div className="col-span-6" />
               </div>
               <div className={gridClass} style={colStyle}>
                  <div>14</div>
                  <div style={{ color: ACIDS_BASES_COLORS.ui.phScale.acidLabel }}>=</div>
                  <div>{showAllTerms ? <Val>{animatedPH.toFixed(2)}</Val> : <Placeholder />}</div>
                  <div><Val>+</Val></div>
                  <div>{showAllTerms ? <Val>{animatedPOH.toFixed(2)}</Val> : <Placeholder />}</div>
                  <div className="col-span-6" />
               </div>
            </>
         )}

         {/* Spacer */}
         <div className="h-2" />

         {/* ======== BLOCK 6: Henderson-Hasselbalch Definition ======== */}
         <div className={gridClass} style={colStyle}>
            {/* pH = pKa + log([A-]/[HA]) */}
            <div className={span3}>pH</div>
            <div className={span3}>=</div>
            <div className={span3}>p{kTerm}</div>
            <div className={span3}>+</div>
            {/* log with large parentheses around fraction */}
            <div className={`${span3} flex items-center`}>
               <span>log</span>
               <span className="text-3xl leading-none mx-0.5">(</span>
               <span className="inline-flex flex-col items-center">
                  <span>[{secondaryIonLabel}]</span>
                  <span className="bg-black h-[2px] w-full my-[1px]" />
                  <span>[{substanceLabel}]</span>
               </span>
               <span className="text-3xl leading-none mx-0.5">)</span>
            </div>
            <div className={`w-8 ${span3}`} />
            <div className={`${span3} col-span-5`} />
         </div>

         {/* ======== BLOCK 7: Henderson-Hasselbalch Values ======== */}
         <div className={gridClass} style={colStyle}>
            <div className={span3}>
               {showAllTerms ? <Val>{animatedPH.toFixed(2)}</Val> : <Placeholder />}
            </div>
            <div className={`${span3}`} style={{ color: ACIDS_BASES_COLORS.ui.phScale.acidLabel }}>=</div>
            <div className={span3}>
               {showAllTerms ? <Val>{animatedPKa.toFixed(2)}</Val> : <Placeholder />}
            </div>
            <div className={`${span3}`} style={{ color: ACIDS_BASES_COLORS.ui.phScale.acidLabel }}>+</div>
            {/* log with values */}
            <div className={`${span3} flex items-center`}>
               <Val>log</Val>
               <span className="text-3xl leading-none mx-0.5" style={{ color: ACIDS_BASES_COLORS.ui.phScale.acidLabel }}>(</span>
               <span className="inline-flex flex-col items-center">
                  <span>{showIonConcentration ? <Val>{toScientific(animatedValA)}</Val> : <Placeholder />}</span>
                  <span className="bg-black h-[2px] w-full my-[1px]" />
                  <span>{showSubstance ? <Val>{toScientific(animatedValHA)}</Val> : <Placeholder />}</span>
               </span>
               <span className="text-3xl leading-none mx-0.5" style={{ color: ACIDS_BASES_COLORS.ui.phScale.acidLabel }}>)</span>
            </div>
            <div className={`w-8 ${span3}`} />
            <div className={`${span3} col-span-5`} />
         </div>

         {/* ======== BLOCK 8: Summary for acid ======== */}
         {state === 'acidSummary' && (
            <>
               <div className="h-2" />
               <div className={gridClass} style={colStyle}>
                  <div>pKa</div>
                  <div>=</div>
                  <div className="col-span-3"><Val>{animatedPKa.toFixed(2)}</Val></div>
                  <div className="col-span-6" />
               </div>
            </>
         )}

         {/* ======== BLOCK 9: Summary for base ======== */}
         {state === 'baseSummary' && (
            <>
               <div className="h-2" />
               <div className={gridClass} style={colStyle}>
                  <div>Kb</div>
                  <div>=</div>
                  <div className="col-span-3"><Val>{toScientific(animatedKb)}</Val></div>
                  <div className="col-span-6" />
               </div>
            </>
         )}
      </div>
   );
}
