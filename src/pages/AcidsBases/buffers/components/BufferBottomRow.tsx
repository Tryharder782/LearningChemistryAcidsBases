import type { RefObject } from 'react';
import type { AcidOrBase } from '../../../../helper/acidsBases/types';
import type { Particle } from '../../../../helper/acidsBases/particles/types';
import type { InputState, IntroScreenElement } from '../../../../components/AcidsBases/guide/types';
import { Beaker, VerticalSlider } from '../../../../components/AcidsBases/ui';
import { Blockable } from '../../../../components/AcidsBases/guide';
import { BufferCharts } from '../BufferCharts';
import { ACIDS_BASES_COLORS } from '../../../../theme/acidsBasesColors';

type GuideOverrides = {
   highlights?: IntroScreenElement[];
   inputState?: InputState;
   hasInteracted?: boolean;
   onInteraction?: () => void;
};

type CurveMeta = {
   currentPh: number;
   initialPh: number;
   finalPh: number;
};

type ChartMode = 'bars' | 'curve' | 'neutralization';

type Concentrations = {
   substance: number;
   primary: number;
   secondary: number;
};

type AnimatedCounts = {
   substance: number;
   primary: number;
   secondary: number;
};

type BufferBottomRowProps = {
   guideOverrides: GuideOverrides;
   waterLevel: number;
   waterLevelMin: number;
   waterLevelMax: number;
   onWaterLevelChange: (level: number) => void;
   beakerContainerRef: RefObject<HTMLDivElement>;
   selectedSubstance: AcidOrBase | null;
   pH: number;
   currentRows: number;
   displayParticles: Particle[];
   concentrations: Concentrations;
   curveMeta?: CurveMeta;
   animatedCounts: AnimatedCounts;
   maxParticles: number;
   forcedChartMode?: ChartMode;
   chartMode?: ChartMode;
   onChartModeChange?: (mode: ChartMode) => void;
};

export const BufferBottomRow = ({
   guideOverrides,
   waterLevel,
   waterLevelMin,
   waterLevelMax,
   onWaterLevelChange,
   beakerContainerRef,
   selectedSubstance,
   pH,
   currentRows,
   displayParticles,
   concentrations,
   curveMeta,
   animatedCounts,
   maxParticles,
   forcedChartMode,
   chartMode,
   onChartModeChange
}: BufferBottomRowProps) => {
   return (
      <div className="grid gap-4 items-start" style={{ gridTemplateColumns: '58% 42%' }}>
         {/* Beaker + Slider */}
         <div className="flex items-end justify-center gap-4 relative">
            {/* Vertical Slider */}
            <Blockable element="waterSlider" overrides={guideOverrides}>
               <VerticalSlider
                  value={waterLevel}
                  min={waterLevelMin}
                  max={waterLevelMax}
                  onChange={onWaterLevelChange}
                  height={280}
                  enabled={guideOverrides.highlights?.includes('waterSlider')}
               />
            </Blockable>

            {/* Beaker Container */}
            <div ref={beakerContainerRef} className="relative w-[280px] h-[350px]">
               <Beaker
                  liquidLevel={waterLevel}
                  liquidColor={selectedSubstance?.color || ACIDS_BASES_COLORS.substances.beakerLiquid}
                  pH={pH}
                  width={280}
                  height={350}
                  gridRows={currentRows}
                  visualizationMode="micro"
                  particles={displayParticles}
               />
            </div>
         </div>

         {/* Bottom: Charts */}
         <div
            id="bottom-chart-container"
            className="w-full"
            style={{ height: 300 }}
         >
            <BufferCharts
               substance={selectedSubstance}
               pH={pH}
               concentrations={concentrations}
               curveMeta={curveMeta}
               animatedCounts={animatedCounts}
               maxParticles={maxParticles}
               forcedMode={forcedChartMode}
               mode={chartMode}
               onModeChange={onChartModeChange}
               barsStyle="titration"
            />
         </div>
      </div>
   );
};
