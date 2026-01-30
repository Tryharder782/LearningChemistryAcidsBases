import { useEffect, useRef, useState } from 'react';
import type { IntroScreenElement, InputState } from '../../../components/AcidsBases/guide/types';
import type { AcidOrBase } from '../../../helper/acidsBases/types';
import type { EquationState } from './types';

interface BufferEquationsProps {
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
   return `${mantissaStr} x 10${toSuperscript(exponent)}`;
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

// Consistent styling component from TitrationMathPanel
const EquationValue = ({ value, isPlaceholder = false }: { value: string | number, isPlaceholder?: boolean }) => {
   if (isPlaceholder) {
      return (
         <div className="w-8 h-6 border-2 border-dashed border-gray-300 flex items-center justify-center shrink-0" />
      );
   }
   return (
      <span className="text-[#ED5A3B] font-medium text-lg leading-none">
         {value}
      </span>
   );
};

export function BufferEquations({
   className = '',
   state = 'acidBlank',
   substance,
   pH = 7,
   concentrations = { substance: 0, primary: 0, secondary: 0 }
}: BufferEquationsProps) {

   const isFilled = state === 'acidFilled' || state === 'baseFilled' ||
      state === 'acidWithSubstanceConcentration' || state === 'baseWithSubstanceConcentration' ||
      state === 'acidSummary' || state === 'baseSummary';
   const showSubstance = isFilled;
   const isSummary = state === 'acidSummary' || state === 'baseSummary';
   const isBaseSummary = state === 'baseSummary';

   // Derived values
   const valH = Math.pow(10, -pH);
   const valA = concentrations.secondary;
   const valHA = concentrations.substance;
   const substanceLabel = substance?.symbol ?? 'HA';
   const secondaryLabel = substance?.secondaryIon ?? 'A';
   const secondaryCharge = substance?.type === 'weakBase' ? '⁺' : '⁻';
   const secondaryIonLabel = `${secondaryLabel}${secondaryCharge}`;

   const kaVal = substance?.kA || 0;
   const pKaVal = substance?.pKA || 0;
   const kbVal = substance?.kB || 0;
   const isWeakBase = substance?.type === 'weakBase';

   const animatedPH = useAnimatedNumber(pH);
   const animatedValH = useAnimatedNumber(valH);
   const animatedValA = useAnimatedNumber(valA);
   const animatedValHA = useAnimatedNumber(valHA);
   const animatedKa = useAnimatedNumber(kaVal);
   const animatedPKa = useAnimatedNumber(pKaVal);
   const animatedKb = useAnimatedNumber(kbVal);

   const pOH = 14 - pH;
   const animatedPOH = useAnimatedNumber(pOH);

   // Grid styles matching TitrationMathPanel
   const gridClass = "grid gap-y-1 w-fit font-sans text-base text-gray-900 items-center justify-items-center";
   const colStyle = { gridTemplateColumns: 'max-content 24px max-content 24px max-content 48px max-content 24px max-content 24px max-content' };
   const span3 = "row-span-3 mx-2 self-center";
   const lineClass = "col-span-3 border-b border-black w-full h-px self-center";

   return (
      <div className={`flex flex-col gap-2 text-base font-sans whitespace-nowrap ${className}`}>
         {/* === Ka BLOCK === */}
         <div className={gridClass} style={colStyle}>
            {/* Row 1-3: Ka = [H+][A-]/[HA]    pKa = -log(Ka) */}
            <div className={span3}>{isWeakBase ? 'Kb' : 'Ka'}</div>
            <div className={span3}>=</div>
            {/* Numerator */}
            <div>[H⁺][{secondaryIonLabel}]</div>
            <div /><div />
            {/* Spacer */}
            <div className={`w-8 ${span3}`} />
            {/* pKa formula */}
            <div className={`${span3} ${isSummary ? 'invisible' : ''}`}>pKa</div>
            <div className={`${span3} ${isSummary ? 'invisible' : ''}`}>=</div>
            <div className={`${span3} col-span-3 ${isSummary ? 'invisible' : ''}`}>-log(Ka)</div>
            {/* Line */}
            <div className={lineClass} />
            {/* Denominator */}
            <div>[{substanceLabel}]</div>
            <div /><div />

            {/* Spacer row */}
            <div className="col-span-11 h-4" />

            {/* Row 4-6: Ka values */}
            <div className={span3}>
               <EquationValue 
                  value={isSummary ? (isWeakBase ? toScientific(animatedKb) : toScientific(animatedKa)) : toScientific(animatedKa)} 
                  isPlaceholder={!isFilled && !isSummary} 
               />
            </div>
            <div className={`${span3} text-[#ED5A3B]`}>=</div>
            {/* Numerator values */}
            <div className="flex gap-1">
               <EquationValue value={toScientific(animatedValH)} isPlaceholder={!isFilled} />
               <span className="text-[#ED5A3B]">·</span>
               <EquationValue value={toScientific(animatedValA)} isPlaceholder={!isFilled} />
            </div>
            <div /><div />
            {/* Spacer */}
            <div className={`w-8 ${span3}`} />
            {/* pKa values */}
            <div className={`${span3} ${isSummary ? 'invisible' : ''}`}>
               <EquationValue value={animatedPKa.toFixed(2)} isPlaceholder={!isFilled} />
            </div>
            <div className={`${span3} text-[#ED5A3B] ${isSummary ? 'invisible' : ''}`}>=</div>
            <div className={`${span3} text-[#ED5A3B] ${isSummary ? 'invisible' : ''}`}>-log(</div>
            <div className={`${span3}  ${isSummary ? 'invisible' : ''}`}>
               <EquationValue value={toScientific(animatedKa)} isPlaceholder={!isFilled} />
            </div>
            <div className={`${span3} text-[#ED5A3B] ${isSummary ? 'invisible' : ''}`}>)</div>
            {/* Line */}
            <div className={lineClass} />
            {/* Denominator value */}
            <div><EquationValue value={toScientific(animatedValHA)} isPlaceholder={!showSubstance} /></div>
            <div /><div />
         </div>

         {/* === Kw BLOCK === */}
         {!isSummary && (
            <div className={gridClass} style={colStyle}>
               {/* Kw = Ka x Kb */}
               <div>Kw</div>
               <div>=</div>
               <div>Ka</div>
               <div>x</div>
               <div>Kb</div>
               <div className="col-span-6" />

               {/* Values */}
               <div>10⁻¹⁴</div>
               <div className="text-[#ED5A3B]">=</div>
               <EquationValue value={toScientific(animatedKa)} isPlaceholder={!isFilled} />
               <span className="text-[#ED5A3B]">x</span>
               <EquationValue value={toScientific(animatedKb)} isPlaceholder={!isFilled} />
               <div className="col-span-6" />
            </div>
         )}

         {/* === Henderson-Hasselbalch BLOCK === */}
         <div className={gridClass} style={colStyle}>
            {/* Row 1-3: pH = pKa + log([A-]/[HA]) */}
            <div className={span3}>pH</div>
            <div className={span3}>=</div>
            <div className={span3}>pKa</div>
            <div className={span3}>+</div>
            <div className={span3}>log(</div>
            {/* Fraction */}
            <div className="col-span-3">[{secondaryIonLabel}]</div>
            <div className={span3}>)</div>
            <div className="col-span-2" />
            {/* Line - fraction */}
            <div className="col-span-5" />
            <div className={lineClass} />
            <div className="col-span-3" />
            {/* Denominator */}
            <div className="col-span-5" />
            <div className="col-span-3">[{substanceLabel}]</div>
            <div className="col-span-3" />

            {/* Spacer row */}
            <div className="col-span-11 h-4" />

            {/* Row 4-6: HH values */}
            <div className={span3}>
               <EquationValue value={animatedPH.toFixed(2)} isPlaceholder={!isFilled && !isSummary} />
            </div>
            <div className={`${span3} text-[#ED5A3B]`}>=</div>
            <div className={span3}>
               {isSummary ? (
                  <span className="text-gray-900">{animatedPKa.toFixed(2)}</span>
               ) : (
                  <EquationValue value={animatedPKa.toFixed(2)} isPlaceholder={!isFilled} />
               )}
            </div>
            <div className={`${span3} text-[#ED5A3B]`}>+</div>
            <div className={`${span3} text-[#ED5A3B]`}>log(</div>
            {/* Fraction values */}
            <div className="col-span-3"><EquationValue value={toScientific(animatedValA)} isPlaceholder={!isFilled} /></div>
            <div className={`${span3} text-[#ED5A3B]`}>)</div>
            <div className="col-span-2" />
            {/* Line */}
            <div className="col-span-5" />
            <div className={lineClass} />
            <div className="col-span-3" />
            {/* Denominator value */}
            <div className="col-span-5" />
            <div className="col-span-3"><EquationValue value={toScientific(animatedValHA)} isPlaceholder={!showSubstance} /></div>
            <div className="col-span-3" />
         </div>

         {/* === Base Summary: 14 = pH + pOH === */}
         {isBaseSummary && (
            <div className={gridClass} style={colStyle}>
               <div>14</div>
               <div>=</div>
               <div>pH</div>
               <div>+</div>
               <div>pOH</div>
               <div className="col-span-6" />

               <div>14</div>
               <div className="text-[#ED5A3B]">=</div>
               <EquationValue value={animatedPH.toFixed(2)} />
               <span className="text-[#ED5A3B]">+</span>
               <EquationValue value={animatedPOH.toFixed(2)} />
               <div className="col-span-6" />
            </div>
         )}
      </div>
   );
}
