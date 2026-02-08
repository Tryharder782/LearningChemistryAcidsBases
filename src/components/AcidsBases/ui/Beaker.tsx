/**
 * Beaker component - placeholder visualization of a chemistry beaker.
 * Displays liquid level and serves as container for particles.
 */

import type { Particle } from '../../../helper/acidsBases/particles/types';
import { GRID_COLS, GRID_ROWS_DEFAULT, GRID_ROWS_TOTAL } from '../../../helper/acidsBases/particles/types';

interface BeakerProps {
   /** Current liquid level as fraction (0-1) */
   liquidLevel?: number;
   /** Color of the liquid */
   liquidColor?: string;
   /** pH value to display */
   pH?: number;
   /** Width in pixels */
   width?: number;
   /** Height in pixels */
   height?: number;
   /** Array of particles to render */
   particles?: Particle[];
   /** Visible grid rows used for particle placement */
   gridRows?: number;
   /** Visualization mode: 'micro' (particles + static blue) or 'macro' (no particles + dynamic color) */
   visualizationMode?: 'micro' | 'macro';
   /** Optional className */
   className?: string;
   /** Children (e.g. ParticleSystem) */
   children?: React.ReactNode;
}

const WATER_BLUE = '#dbf5feff';

export function Beaker({
   liquidLevel = 0.7,
   liquidColor = WATER_BLUE,
   width = 200,
   height = 300,
   particles = [],
   gridRows = GRID_ROWS_DEFAULT,
   visualizationMode = 'macro',
   className = '',
   children,
}: BeakerProps) {
   const inset = Math.max(10, Math.round(Math.min(width, height) * 0.04));
   const innerRadius = Math.max(12, Math.round(Math.min(width, height) * 0.1));

   // Liquid is always full height of the container, we mask it by translating it
   const liquidTranslateY = (1 - liquidLevel) * 100;

   // Grid dimensions for rendering
   // Note: We need to map grid coordinates to percentage positions
   const getParticleStyle = (p: Particle) => {
      const colWidth = 100 / GRID_COLS;
      const rowHeight = 100 / GRID_ROWS_TOTAL;

      return {
         left: `${p.position.col * colWidth + colWidth / 2}%`,
         top: `${p.position.row * rowHeight + rowHeight / 2}%`,
         backgroundColor: p.displayColor,
         transition: p.isInitialAppearance
            ? 'none'
            : `background-color ${p.transitionMs ?? 500}ms ease`,
         transitionDelay: p.isInitialAppearance
            ? undefined
            : `${p.transitionDelayMs ?? 0}ms`,
         opacity: p.opacity ?? 1,
         width: '12px',
         height: '12px',
         borderRadius: '50%',
         position: 'absolute' as const,
         transform: `translate(-50%, -50%) scale(${p.scale ?? 1})`,
      };
   };

   return (
      <div
         className={`relative select-none ${className}`}
         style={{ width, height }}
      >
         {/* Beaker overlay SVG */}
         <img
            src="/source-images/beaker-overlay.svg"
            alt="Beaker"
            className="absolute inset-0 w-full h-full object-contain pointer-events-none"
            draggable={false}
            style={{ zIndex: 20 }}
         />

         {/* Inner Container (Mask) */}
         <div
            className="absolute overflow-hidden mb-[10px]"
            style={{
               left: inset,
               right: inset,
               top: inset,
               bottom: inset,
               borderRadius: `0 0 ${innerRadius}px ${innerRadius}px`,
            }}
         >
            {/* Liquid Block (Sliding) */}
            <div
               className="absolute w-full transition-colors duration-700 ease-in-out"
               style={{
                  height: '100%',
                  top: 0,
                  left: 0,
                  backgroundColor: visualizationMode === 'micro' ? WATER_BLUE : liquidColor,
                  opacity: 1,
                  transform: `translateY(${liquidTranslateY}%)`,
               }}
            >


               {/* Particles Rendered at Grid Positions */}
               {visualizationMode === 'micro' && (
                  <div className="absolute inset-0">
                     {/* Placeholder grid */}
                     {Array.from({ length: GRID_ROWS_TOTAL * GRID_COLS }).map((_, idx) => {
                        const row = Math.floor(idx / GRID_COLS);
                        const col = idx % GRID_COLS;
                        const colWidth = 100 / GRID_COLS;
                        const rowHeight = 100 / GRID_ROWS_TOTAL;

                        return (
                           <div
                              key={`placeholder-${idx}`}
                              style={{
                                 position: 'absolute',
                                 left: `${col * colWidth + colWidth / 2}%`,
                                 top: `${row * rowHeight + rowHeight / 2}%`,
                                 width: '12px',
                                 height: '12px',
                                 borderRadius: '50%',
                                 backgroundColor: row < Math.ceil(gridRows) ? 'rgba(144, 170, 196, 0.2)' : 'transparent',
                                 border: row < Math.ceil(gridRows) ? '' : 'none',
                                 transform: 'translate(-50%, -50%)',
                              }}
                           />
                        );
                     })}

                     {particles
                        .filter(p => p.position.row < Math.ceil(gridRows))
                        .map(p => (
                           <div
                              key={p.id}
                              style={getParticleStyle(p)}
                              className="shadow-sm"
                           />
                        ))}
                     {children}
                  </div>
               )}
            </div>
         </div>

         {/* pH indicator badge */}
         {/* {pH !== undefined && (
            <div
               className="absolute top-4 right-4 px-2 py-1 rounded-md text-xs font-bold z-30"
               style={{
                  backgroundColor: getPHColor(pH),
                  color: pH > 3 && pH < 11 ? '#000' : '#fff',
               }}
            >
               pH {pH.toFixed(1)}
            </div>
         )} */}

         {/* Measurement lines are part of the overlay SVG */}
      </div>
   );
}

export default Beaker;
