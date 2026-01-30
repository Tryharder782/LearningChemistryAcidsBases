/**
 * Slider component for controlling simulation parameters.
 */

interface SliderProps {
   /** Current value */
   value: number;
   /** Minimum value */
   min: number;
   /** Maximum value */
   max: number;
   /** Step increment */
   step?: number;
   /** Label text */
   label?: string;
   /** Unit to display after value */
   unit?: string;
   /** Value format function */
   formatValue?: (value: number) => string;
   /** Change handler */
   onChange: (value: number) => void;
   /** Optional className */
   className?: string;
   /** Orientation */
   orientation?: 'horizontal' | 'vertical';
}

export function Slider({
   value,
   min,
   max,
   step = 0.01,
   label,
   unit = '',
   formatValue = (v) => v.toFixed(2),
   onChange,
   className = '',
   orientation = 'horizontal',
}: SliderProps) {
   const isVertical = orientation === 'vertical';

   return (
      <div
         className={`flex ${isVertical ? 'flex-col items-center' : 'flex-col'} ${className}`}
      >
         {/* Label and value display */}
         {label && (
            <div className="flex justify-between items-center mb-2">
               <span className="text-sm font-medium text-gray-700">{label}</span>
               <span className="text-sm font-bold text-gray-900">
                  {formatValue(value)}{unit}
               </span>
            </div>
         )}

         {/* Slider track */}
         <div className={`relative ${isVertical ? 'h-40 w-8' : 'h-8 w-full'}`}>
            <input
               type="range"
               min={min}
               max={max}
               step={step}
               value={value}
               onChange={(e) => onChange(parseFloat(e.target.value))}
               className={`
                  ${isVertical ? 'h-40 w-2 transform -rotate-90 origin-center' : 'w-full h-2'}
                  appearance-none bg-gray-200 rounded-lg cursor-pointer
                  [&::-webkit-slider-thumb]:appearance-none
                  [&::-webkit-slider-thumb]:w-5
                  [&::-webkit-slider-thumb]:h-5
                  [&::-webkit-slider-thumb]:bg-blue-500
                  [&::-webkit-slider-thumb]:rounded-full
                  [&::-webkit-slider-thumb]:cursor-pointer
                  [&::-webkit-slider-thumb]:shadow-md
                  [&::-webkit-slider-thumb]:hover:bg-blue-600
                  [&::-webkit-slider-thumb]:transition-colors
                  [&::-moz-range-thumb]:w-5
                  [&::-moz-range-thumb]:h-5
                  [&::-moz-range-thumb]:bg-blue-500
                  [&::-moz-range-thumb]:rounded-full
                  [&::-moz-range-thumb]:cursor-pointer
                  [&::-moz-range-thumb]:border-none
               `}
               style={{
                  background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${((value - min) / (max - min)) * 100}%, #E5E7EB ${((value - min) / (max - min)) * 100}%, #E5E7EB 100%)`,
               }}
            />
         </div>

         {/* Min/Max labels */}
         <div className={`flex justify-between text-xs text-gray-500 mt-1 ${isVertical ? 'flex-col-reverse h-40' : ''}`}>
            <span>{min}{unit}</span>
            <span>{max}{unit}</span>
         </div>
      </div>
   );
}

export default Slider;
