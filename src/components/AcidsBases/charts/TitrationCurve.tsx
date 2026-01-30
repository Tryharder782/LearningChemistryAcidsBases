/**
 * TitrationCurve component - SVG line chart for pH vs volume.
 */

import type { TitrationPoint } from '../../../helper/acidsBases/types';

interface TitrationCurveProps {
   /** Array of titration data points */
   data: TitrationPoint[];
   /** Current titrant volume (for indicator) */
   currentVolume?: number;
   /** Equivalence point volume */
   equivalenceVolume?: number;
   /** Chart width */
   width?: number;
   /** Chart height */
   height?: number;
   /** Optional className */
   className?: string;
}

export function TitrationCurve({
   data,
   currentVolume = 0,
   equivalenceVolume,
   width = 300,
   height = 200,
   className = '',
}: TitrationCurveProps) {
   if (data.length === 0) {
      return <div className={className}>No data</div>;
   }

   // Chart margins
   const margin = { top: 20, right: 20, bottom: 40, left: 50 };
   const chartWidth = width - margin.left - margin.right;
   const chartHeight = height - margin.top - margin.bottom;

   // Find data range
   const maxVolume = Math.max(...data.map(d => d.volume), 1);
   const minPH = 0;
   const maxPH = 14;

   // Scale functions
   const scaleX = (volume: number) => (volume / maxVolume) * chartWidth;
   const scaleY = (pH: number) => chartHeight - ((pH - minPH) / (maxPH - minPH)) * chartHeight;

   // Generate SVG path
   const pathD = data
      .map((point, i) => `${i === 0 ? 'M' : 'L'} ${scaleX(point.volume)} ${scaleY(point.pH)}`)
      .join(' ');

   // Current position indicator
   const currentPoint = data.find(d => d.volume >= currentVolume) || data[data.length - 1];

   return (
      <div className={`bg-white rounded-lg shadow p-4 ${className}`}>
         <h3 className="text-sm font-semibold text-gray-700 mb-2">Titration Curve</h3>
         <svg width={width} height={height}>
            <g transform={`translate(${margin.left}, ${margin.top})`}>
               {/* Grid lines */}
               {[0, 2, 4, 6, 7, 8, 10, 12, 14].map(pH => (
                  <g key={pH}>
                     <line
                        x1={0}
                        y1={scaleY(pH)}
                        x2={chartWidth}
                        y2={scaleY(pH)}
                        stroke="#f0f0f0"
                        strokeWidth={pH === 7 ? 2 : 1}
                     />
                     <text
                        x={-8}
                        y={scaleY(pH)}
                        textAnchor="end"
                        alignmentBaseline="middle"
                        className="text-xs fill-gray-500"
                     >
                        {pH}
                     </text>
                  </g>
               ))}

               {/* Equivalence point vertical line */}
               {equivalenceVolume && (
                  <line
                     x1={scaleX(equivalenceVolume)}
                     y1={0}
                     x2={scaleX(equivalenceVolume)}
                     y2={chartHeight}
                     stroke="#FF9500"
                     strokeWidth={2}
                     strokeDasharray="4,4"
                  />
               )}

               {/* Titration curve */}
               <path
                  d={pathD}
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
               />

               {/* Current position indicator */}
               <circle
                  cx={scaleX(currentVolume)}
                  cy={scaleY(currentPoint?.pH || 7)}
                  r={6}
                  fill="#EF4444"
                  stroke="white"
                  strokeWidth={2}
               />

               {/* X-axis */}
               <line
                  x1={0}
                  y1={chartHeight}
                  x2={chartWidth}
                  y2={chartHeight}
                  stroke="#ccc"
               />
               <text
                  x={chartWidth / 2}
                  y={chartHeight + 30}
                  textAnchor="middle"
                  className="text-xs fill-gray-600"
               >
                  Volume (mL)
               </text>

               {/* Y-axis label */}
               <text
                  x={-chartHeight / 2}
                  y={-35}
                  textAnchor="middle"
                  transform="rotate(-90)"
                  className="text-xs fill-gray-600"
               >
                  pH
               </text>
            </g>
         </svg>
      </div>
   );
}

export default TitrationCurve;
