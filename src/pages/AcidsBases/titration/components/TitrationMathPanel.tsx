import React, { type ReactNode } from 'react';

type TitrationMathPanelValues = {
   substanceLabel: string;
   titrantLabel: string;
   substanceMoles: number;
   substanceVolume: number;
   substanceMolarity: number;
   titrantMoles: number;
   titrantVolume: number;
   titrantMolarity: number;
   hydrogenConcentration: number;
   pH: number;
};

const formatValue = (value: number, digits: number): ReactNode => {
   if (!Number.isFinite(value)) return '0';

   const absVal = Math.abs(value);

   // Strictly zero check
   if (absVal === 0) return (0).toFixed(digits);

   // Determine if we should use scientific notation:
   // 1. Value is very small (< 0.001)
   // 2. OR it rounds to "0.000..." at the requested precision (visual zero)
   const decimalStr = value.toFixed(digits);
   const isVisualZero = !/[1-9]/.test(decimalStr);

   if (absVal < 0.001 || isVisualZero) {
      const expStr = value.toExponential(1); // "1.0e-7"
      const [mantissa, exponent] = expStr.split('e');
      const formattedMantissa = mantissa;
      const expVal = parseInt(exponent);

      return (
         <span className="whitespace-nowrap">
            {formattedMantissa}x10<sup>{expVal}</sup>
         </span>
      );
   }

   return decimalStr;
};

const EquationValue = ({ value, isPlaceholder = false }: { value: ReactNode, isPlaceholder?: boolean }) => {
   if (isPlaceholder) {
      return (
         <div
            className="w-8 h-6 flex items-center justify-center shrink-0"
            style={{ border: '2px dashed #D1D5DB' }}
         />
      );
   }
   return (
      <span className="text-[#ED5A3B] font-medium text-lg leading-none">
         {value}
      </span>
   );
};

export const TitrationMathPanel = ({
   substanceLabel,
   titrantLabel,
   substanceMoles,
   substanceVolume,
   substanceMolarity,
   titrantMoles,
   titrantVolume,
   titrantMolarity,
   hydrogenConcentration,
   pH
}: TitrationMathPanelValues) => {
   // Determine if titrant related values should be shown
   const hasTitrant = titrantVolume > 0;

   const gridClass = "grid gap-y-1 w-fit font-sans text-base text-gray-900 mt-4 items-center justify-items-center";
   const colStyle = { gridTemplateColumns: 'max-content 24px max-content 24px max-content 48px max-content 24px max-content 24px max-content' };
   const span3 = "row-span-3 self-center";
   const lineStyle = { borderBottom: '1px solid black', width: '100%', height: '1px' };

   return (
      <div className={gridClass} style={colStyle}>
         {/* --- ROW 1: Top Formulas --- */}
         <div className="text-lg">n<sub>{substanceLabel}</sub></div>
         <div>=</div>
         <div>V<sub>{substanceLabel}</sub></div>
         <div>x</div>
         <div>M<sub>{substanceLabel}</sub></div>
         <div className="w-8"></div>
         <div className="text-lg">n<sub>{titrantLabel}</sub></div>
         <div>=</div>
         <div>V<sub>{titrantLabel}</sub></div>
         <div>x</div>
         <div>M<sub>{titrantLabel}</sub></div>

         {/* --- ROW 2: Top Values --- */}
         <EquationValue value={formatValue(substanceMoles, 3)} />
         <div className="text-[#ED5A3B]">=</div>
         <EquationValue value={formatValue(substanceVolume, 3)} />
         <div className="text-[#ED5A3B]">x</div>
         <EquationValue value={formatValue(substanceMolarity, 3)} />
         <div className="w-8"></div>
         <EquationValue value={formatValue(titrantMoles, 3)} isPlaceholder={!hasTitrant} />
         <div className="text-[#ED5A3B]">=</div>
         <EquationValue value={formatValue(titrantVolume, 3)} isPlaceholder={!hasTitrant} />
         <div className="text-[#ED5A3B]">x</div>
         <EquationValue value={formatValue(titrantMolarity, 3)} isPlaceholder={!hasTitrant} />

         {/* SPACER */}
         <div className="col-span-11 h-6" />

         {/* --- ROW 3-5: Bottom Formulas --- */}
         {/* Left Side: [H+] = Fraction */}
         <div className={span3}>[H<sup>+</sup>]</div>
         <div className={span3}>=</div>


         {/* Numerator */}
         <div>n<sub>{substanceLabel}</sub></div>
         <div>-</div>
         <div>n<sub>{titrantLabel}</sub></div>

         {/* Spacer Col 6 */}
         <div className={`w-8 ${span3}`}></div>

         {/* Right Side: pH = -log [H+] (All spanned) */}
         <div className={span3}>pH</div>
         <div className={span3}>=</div>
         <div className={`${span3} whitespace-nowrap`}>-log</div>
         <div className={`row-span-3 self-center col-start-10 col-span-2 justify-self-start`}>[H<sup>+</sup>]</div>

         {/* Fraction Line Row (Left Side Only) */}
         <div className="col-span-3 self-center" style={lineStyle}></div>

         {/* Denominator Row (Left Side Only) */}
         <div>V<sub>{substanceLabel}</sub></div>
         <div>+</div>
         <div>V<sub>{titrantLabel}</sub></div>


         {/* SPACER */}
         <div className="col-span-11 h-6" />

         {/* --- ROW 6-8: Bottom Values --- */}
         {/* Left Side: Value = Fraction */}
         <div className={span3}><EquationValue value={formatValue(hydrogenConcentration, 3)} /></div>
         <div className={`${span3} text-[#ED5A3B]`}>=</div>

         {/* Numerator Values */}
         <EquationValue value={formatValue(substanceMoles, 3)} />
         <div className="text-[#ED5A3B]">-</div>
         <EquationValue value={formatValue(titrantMoles, 3)} isPlaceholder={!hasTitrant} />

         {/* Spacer Col 6 */}
         <div className={`w-8 ${span3}`}></div>

         {/* Right Side: Value = -log Value (All spanned) */}
         <div className={span3}><EquationValue value={formatValue(pH, 2)} /></div>
         <div className={`${span3} text-[#ED5A3B]`}>=</div>
         <div className={`${span3} text-[#ED5A3B] whitespace-nowrap`}>-log</div>
         <div className={`row-span-3 self-center col-start-10 col-span-2 justify-self-start`}><EquationValue value={formatValue(hydrogenConcentration, 3)} /></div>

         {/* Fraction Line Row (Values) */}
         <div className="col-span-3 self-center" style={lineStyle}></div>

         {/* Denominator Values */}
         <EquationValue value={formatValue(substanceVolume, 3)} />
         <div className="text-[#ED5A3B]">+</div>
         <EquationValue value={formatValue(titrantVolume, 3)} isPlaceholder={!hasTitrant} />
      </div>
   );
};
