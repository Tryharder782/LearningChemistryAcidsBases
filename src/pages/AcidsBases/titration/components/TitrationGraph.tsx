
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, ReferenceDot, ReferenceLine } from 'recharts';
import type { TitrationPoint } from '../../../../helper/acidsBases/types';

type TitrationGraphProps = {
   data: TitrationPoint[];
   currentVolume: number;
   currentPH: number;
   maxVolume?: number;
   checkpoints?: number[];
};

export const TitrationGraph = ({ data, currentVolume, currentPH, maxVolume, checkpoints = [] }: TitrationGraphProps) => {
   const hasData = data.length > 0;
   const xDomain: [number, string | number] = maxVolume && maxVolume > 0 ? [0, maxVolume] : [0, 'dataMax'];
   const safeCurrentVolume = maxVolume && maxVolume > 0 ? Math.min(currentVolume, maxVolume) : currentVolume;
   const xMax = maxVolume && maxVolume > 0 ? maxVolume : Math.max(...data.map(point => point.volume), 0);
   const xTicks = xMax > 0
      ? Array.from({ length: 8 }, (_, i) => Number(((xMax / 7) * i).toFixed(3)))
      : Array.from({ length: 8 }, (_, i) => i);
   const yTicks = [0, 2, 4, 6, 8, 10, 12, 14];

   return (
      <div className="w-full h-full relative">
         <div className="absolute inset-0 border-2 border-black">
            <ResponsiveContainer width="100%" height="100%">
               <LineChart data={hasData ? data : [{ volume: 0, pH: 0 }]} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <XAxis
                     dataKey="volume"
                     type="number"
                     domain={hasData ? xDomain : [0, 7]}
                     tick={{ fontSize: 0 }}
                     tickFormatter={() => ''}
                     mirror={true}
                     tickLine={{ stroke: '#111827', strokeWidth: 2 }}
                     axisLine={{ stroke: '#111827', strokeWidth: 2 }}
                     tickSize={8}
                     ticks={xTicks}
                  />
                  <YAxis
                     dataKey="pH"
                     type="number"
                     domain={[0, 14]}
                     tick={{ fontSize: 0 }}
                     tickFormatter={() => ''}
                     mirror={true}
                     tickLine={{ stroke: '#111827', strokeWidth: 2 }}
                     axisLine={{ stroke: '#111827', strokeWidth: 2 }}
                     ticks={yTicks}
                     tickSize={8}
                  />
                  {hasData && (
                     <Line
                        type="monotone"
                        dataKey="pH"
                        stroke="#b46bd8"
                        strokeWidth={2}
                        dot={false}
                        isAnimationActive={false}
                     />
                  )}
                  {hasData && checkpoints.map((checkpoint, index) => (
                     <ReferenceLine
                        key={`checkpoint-${index}`}
                        x={checkpoint}
                        stroke="#b46bd8"
                        strokeDasharray="6 6"
                     />
                  ))}
                  {hasData && <ReferenceDot x={safeCurrentVolume} y={currentPH} r={4} fill="#b46bd8" stroke="#fff" />}
               </LineChart>
            </ResponsiveContainer>
         </div>

         <span className="absolute -left-7 top-1/2 -translate-y-1/2 writing-mode-vertical text-sm font-semibold text-slate-800">
            pH
         </span>
         <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-sm font-semibold text-slate-800">
            Titrant added
         </span>
      </div>
   );
};
