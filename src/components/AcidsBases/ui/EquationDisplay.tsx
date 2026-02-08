/**
 * EquationDisplay - Shows chemical equations and formulas.
 * Handles subscripts, superscripts, and dynamic values.
 */

interface EquationDisplayProps {
   /** Equation components */
   equations: EquationLine[];
   /** Optional highlight which line */
   highlightedIndex?: number;
   /** Optional className */
   className?: string;
}

export interface EquationLine {
   /** Left side of equation */
   formula: string;
   /** Operator (=, →, ⇌) */
   operator: string;
   /** Right side - evaluated value parts */
   valueParts?: { text: string; isHighlighted?: boolean }[];
   /** Color for highlighted parts */
   highlightColor?: string;
   /** Legacy: Right side - evaluated value */
   value?: string;
   /** Legacy: Color for the value */
   valueColor?: string;
}

export function EquationDisplay({
   equations,
   highlightedIndex,
   className = '',
}: EquationDisplayProps) {
   const ids = ['guide-element-pHFormula', 'guide-element-pOHFormula', 'guide-element-pHSumEquation'];

   return (
      <div className={`grid grid-cols-3 gap-2 w-full font-mono ${className}`}>
         {equations.map((eq, index) => (
            <div
               key={index}
               id={ids[index]} // Assign predictable IDs for highlighting
               className={`
                  flex flex-col items-start justify-center gap-2 rounded-xl transition-all
                  ${highlightedIndex === index ? '' : 'bg-transparent'}
               `}
            >
               {/* Top: Abstract Formula */}
               <div className="text-gray-700 text-xl whitespace-nowrap tracking-tight">
                  {parseFormulaText(eq.formula)}
                  {eq.operator && <span className="mx-0.5 text-gray-500">{eq.operator}</span>}
               </div>

               {/* Bottom: Substituted Values */}
               {(eq.valueParts || eq.value) && (
                  <div
                     className="text-xl whitespace-nowrap tracking-tight"
                  >
                     {eq.valueParts ? (
                        <span>
                           {eq.valueParts.map((part, i) => (
                              <span
                                 key={i}
                                 style={{ color: part.isHighlighted ? (eq.highlightColor || '#ED5A3B') : '#1F2937' }}
                              >
                                 {parseFormulaText(part.text)}
                              </span>
                           ))}
                        </span>
                     ) : (
                        <span style={{ color: eq.valueColor || '#F97316' }}>
                           {parseFormulaText(eq.value!)}
                        </span>
                     )}
                  </div>
               )}
            </div>
         ))}
      </div>
   );
}

/**
 * Parse formula text with subscripts and superscripts.
 * Uses Unicode characters for common chemistry symbols.
 */
function parseFormulaText(text: string): string {
   // Replace common patterns
   return text
      // Subscripts: _n_ or just common patterns
      .replace(/_(\d+)_/g, (_, n) => toSubscript(n))
      .replace(/H2O/g, 'H₂O')
      .replace(/H3O/g, 'H₃O')
      .replace(/OH-/g, 'OH⁻')
      .replace(/H\+/g, 'H⁺')
      // Superscripts: ^x^ 
      .replace(/\^([+-]?\d*[+-]?)\^/g, (_, s) => toSuperscript(s))
      .replace(/10\^(-?\d+)/g, (_, exp) => `10${toSuperscript(exp)}`);
}

function toSubscript(text: string): string {
   const subscripts: Record<string, string> = {
      '0': '₀', '1': '₁', '2': '₂', '3': '₃', '4': '₄',
      '5': '₅', '6': '₆', '7': '₇', '8': '₈', '9': '₉',
      '+': '₊', '-': '₋',
   };
   return text.split('').map(c => subscripts[c] || c).join('');
}

function toSuperscript(text: string): string {
   const superscripts: Record<string, string> = {
      '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴',
      '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹',
      '+': '⁺', '-': '⁻',
   };
   return text.split('').map(c => superscripts[c] || c).join('');
}

// Preset equation sets
export const pH_EQUATIONS: EquationLine[] = [
   { formula: 'pH', operator: '=', value: '-log[H⁺]' },
   { formula: 'pOH', operator: '=', value: '-log[OH⁻]' },
   { formula: 'pH + pOH', operator: '=', value: '14' },
];

export function createDynamicEquations(pH: number): EquationLine[] {
   const pOH = 14 - pH;
   const hConc = Math.pow(10, -pH);
   const ohConc = Math.pow(10, -pOH);

   const formatExp = (n: number) => {
      const s = n.toExponential(1);
      const [coeff, exp] = s.split('e');
      const cleanCoeff = coeff;
      const absExp = Math.abs(parseInt(exp));
      return `${cleanCoeff}×10⁻${absExp}`;
   };

   return [
      {
         formula: 'pH = -log[H⁺]',
         operator: '',
         valueParts: [
            { text: `${pH.toFixed(1)}`, isHighlighted: true },
            { text: ' = -log ' },
            { text: formatExp(hConc), isHighlighted: true },
         ],
      },
      {
         formula: 'pOH = -log[OH⁻]',
         operator: '',
         valueParts: [
            { text: `${pOH.toFixed(1)}`, isHighlighted: true },
            { text: ' = -log ' },
            { text: formatExp(ohConc), isHighlighted: true },
         ],
      },
      {
         formula: 'pH + pOH = 14',
         operator: '',
         valueParts: [
            { text: `${pH.toFixed(1)}`, isHighlighted: true },
            { text: ' + ' },
            { text: `${pOH.toFixed(1)}`, isHighlighted: true },
            { text: ' = 14' },
         ],
      },
   ];
}

export default EquationDisplay;
