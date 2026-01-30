
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

const formatFixed = (value: number, digits: number) => {
   if (!Number.isFinite(value)) return '0';
   return value.toFixed(digits);
};

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
   const hasTitrant = titrantVolume > 0.0001; // Small threshold to be safe

   const gridClass = "grid gap-y-1 w-fit font-sans text-base text-gray-900 mt-4 items-center justify-items-center";
   const colStyle = { gridTemplateColumns: 'max-content 24px max-content 24px max-content 48px max-content 24px max-content 24px max-content' };
   const span3 = "row-span-3 self-center";
   const lineClass = "col-span-3 border-b border-black w-full h-px self-center";

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
         <EquationValue value={formatFixed(substanceMoles, 3)} />
         <div className="text-[#ED5A3B]">=</div>
         <EquationValue value={formatFixed(substanceVolume, 3)} />
         <div className="text-[#ED5A3B]">x</div>
         <EquationValue value={formatFixed(substanceMolarity, 3)} />
         <div className="w-8"></div>
         <EquationValue value={formatFixed(titrantMoles, 3)} isPlaceholder={!hasTitrant} />
         <div className="text-[#ED5A3B]">=</div>
         <EquationValue value={formatFixed(titrantVolume, 3)} isPlaceholder={!hasTitrant} />
         <div className="text-[#ED5A3B]">x</div>
         <EquationValue value={formatFixed(titrantMolarity, 3)} isPlaceholder={!hasTitrant} />

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
         <div className={span3}></div> {/* Col 10 empty */}
         <div className={`${span3} whitespace-nowrap`}>[H<sup>+</sup>]</div>

         {/* Fraction Line Row (Left Side Only) */}
         <div className={lineClass}></div>

         {/* Denominator Row (Left Side Only) */}
         <div>V<sub>{substanceLabel}</sub></div>
         <div>+</div>
         <div>V<sub>{titrantLabel}</sub></div>


         {/* SPACER */}
         <div className="col-span-11 h-6" />

         {/* --- ROW 6-8: Bottom Values --- */}
         {/* Left Side: Value = Fraction */}
         <div className={span3}><EquationValue value={formatFixed(hydrogenConcentration, 3)} /></div>
         <div className={`${span3} text-[#ED5A3B]`}>=</div>

         {/* Numerator Values */}
         <EquationValue value={formatFixed(substanceMoles, 3)} />
         <div className="text-[#ED5A3B]">-</div>
         <EquationValue value={formatFixed(titrantMoles, 3)} isPlaceholder={!hasTitrant} />

         {/* Spacer Col 6 */}
         <div className={`w-8 ${span3}`}></div>

         {/* Right Side: Value = -log Value (All spanned) */}
         <div className={span3}><EquationValue value={formatFixed(pH, 2)} /></div>
         <div className={`${span3} text-[#ED5A3B]`}>=</div>
         <div className={`${span3} text-[#ED5A3B] whitespace-nowrap`}>-log</div>
         <div className={span3}></div>
         <div className={span3}><EquationValue value={formatFixed(hydrogenConcentration, 3)} /></div>

         {/* Fraction Line Row (Values) */}
         <div className={lineClass}></div>

         {/* Denominator Values */}
         <EquationValue value={formatFixed(substanceVolume, 3)} />
         <div className="text-[#ED5A3B]">+</div>
         <EquationValue value={formatFixed(titrantVolume, 3)} isPlaceholder={!hasTitrant} />
      </div>
   );
};
