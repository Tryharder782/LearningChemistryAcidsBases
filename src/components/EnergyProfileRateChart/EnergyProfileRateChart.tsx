import React from 'react';
import Color from 'color';
import { EnergyRateChartSettings, LinearEquation } from '../EnergyProfileChart';
import { ChartAxisShapeSettings, FirstOrderConcentration, SecondOrderConcentration, TimeChartDataLineView, ZeroOrderConcentration } from '../ConcentrationPlotView';

type EnergyProfileRateChartProps = {
  height: number,
  width: number,
  settings: EnergyRateChartSettings,
  equation?: ZeroOrderConcentration | FirstOrderConcentration | SecondOrderConcentration | LinearEquation,
  currentTime: number,
  currentTempInverse?: number,
  highlightChart: boolean,
  rateChartState: number,
}

type Rect = {
  width: number,
  height: number,
}

const EnergyProfileRateChart = (props: EnergyProfileRateChartProps) => {
  const {
    width,
    height,
    settings,
    equation,
    currentTime,
    currentTempInverse,
    highlightChart,
    rateChartState,
  } = props;
  const canvas = React.useRef<HTMLCanvasElement>(null);
  // console.log({settings, equation})
  React.useEffect(() => {
    const ctx = canvas?.current?.getContext('2d');
    if (ctx) {
      const { height: rectHeight, width: rectWidth } = ctx.canvas;
      const rect: Rect = {
        width: rectWidth,
        height: rectHeight
      }
      ctx.rect(0, 0, rect.width, rect.height)
      ctx.stroke()
      chartAxisShape(ctx, settings.timeChartSettings.chartAxisShapeSettings, rect)
      // chartLine(ctx, equation!, settings.yAxis, settings.xAxis, 1 / 600, 1 / 400, rect)
    }
  })

  const chartAxisShape = (
    ctx: CanvasRenderingContext2D,
    settings: ChartAxisShapeSettings,
    rect: Rect,
  ) => {
    ctx.beginPath()
    ctx.rect(0, 0, rect.width, rect.height)
    let dy = (rect.height - settings.gapToTop) / settings.verticalTicks
    for (let i = 0; i < settings.verticalTicks; i++) {
      let distanceFromBottom = i * dy
      let y = rect.height - distanceFromBottom
      ctx.moveTo(0, y)
      ctx.lineTo(settings.tickSize, y)
    }

    let dx = (rect.width - settings.gapToSide) / settings.horizontalTicks
    for (let i = 0; i < settings.horizontalTicks; i++) {
      let x = i * dx
      ctx.moveTo(x, rect.height)
      ctx.lineTo(x, rect.height - settings.tickSize)
    }
    ctx.stroke()
  }

  return (
    <div
      id='tur_energyProfileRateChart'
      style={{
        position: 'relative',
        backgroundColor: 'white',
        height: 220,
      }}
    >
      <canvas ref={canvas} height={height} width={width} />
      {rateChartState !== 0 && <TimeChartDataLineView
        width={width}
        height={width}
        data={{
          equation: equation!,
          headColor: 'rgb(220, 84, 59)',
          haloColor: Color.rgb(255, 0, 0).alpha(0.3).toString(),
          headRadius: settings.chartHeadSize,
        }}
        settings={settings}
        lineWidth={1}
        initialTime={1 / 600}
        currentTime={currentTime} //$currentTime
        finalTime={1 / 400}
        filledBarColor={'rgb(220, 84, 59)'} //Styling.timeAxisCompleteBar
        canSetCurrentTime={true}
        highlightLhs={true}
        highlightRhs={true}
        showFullLine={true}
        order={-1}
      />}
    </div>
  );
};
export default EnergyProfileRateChart;