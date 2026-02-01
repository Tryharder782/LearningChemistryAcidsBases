import { ChartAxisShapeSettings } from "./ChartAxisShapeSettings"
import { LinearAxis } from "./LinearAxis"
import { SliderGeometrySettings } from "./SliderGeometrySettings"

export type TimeChartLayoutSettings = {
  xAxis: LinearAxis,
  yAxis: LinearAxis,
  haloRadius: number,
  lineWidth: number
}
class ReactionRateChartLayoutSettings {
  chartSize: number
  minConcentration: number
  maxConcentration: number
  minTime: number
  maxTime: number
  includeAxisPadding: boolean
  readonly chartHStackFactor = 0.03
  readonly sliderHandleWidthFactor = 0.16
  readonly yLabelWidthFactor = 0.35
  readonly xLabelHeightFactor = 0.1
  readonly totalWidthFactor = 1 + (2 * this.chartHStackFactor) + this.sliderHandleWidthFactor + this.yLabelWidthFactor
  readonly totalHeightFactor = 1 + (2 * this.chartHStackFactor) + this.sliderHandleWidthFactor + this.xLabelHeightFactor
  chartAxisShapeSettings: ChartAxisShapeSettings
  timeChartLayoutSettings: TimeChartLayoutSettings

  constructor(chartSize: number, minConcentration: number, maxConcentration: number, minTime: number, maxTime: number, includeAxisPadding: boolean, timeChartLayoutSettings: TimeChartLayoutSettings) {
    this.chartSize = chartSize
    this.minConcentration = minConcentration
    this.maxConcentration = maxConcentration
    this.minTime = minTime
    this.maxTime = maxTime
    this.includeAxisPadding = includeAxisPadding ?? true
    this.chartAxisShapeSettings = new ChartAxisShapeSettings(chartSize)
    this.timeChartLayoutSettings = {
      yAxis: new LinearAxis(
        this.chartSize,
        this.includeAxisPadding ? this.sliderMaxValuePadding : 0,
        this.minConcentration,
        this.maxConcentration
      ),
      xAxis: new LinearAxis(
        0,
        this.includeAxisPadding ? this.chartSize - this.sliderMaxValuePadding : this.chartSize,
        this.minTime,
        this.maxTime
      ),
      haloRadius: this.chartHeadPrimaryHaloSize,
      lineWidth: 1
    }
  }

  get sliderHandleWidth() {
    return this.sliderHandleWidthFactor * this.chartSize
  }

  get sliderMaxValuePadding() {
    return 0.28 * this.chartSize
  }

  get sliderSettings() {
    return new SliderGeometrySettings(this.sliderHandleWidth, 0, 0, 0)
  }

  get indicatorSettings() {
    return new SliderGeometrySettings(
      this.indicatorWidth,
      this.indicatorThickness,
      0,
      0
    )
  }

  get yLabelWidth() {
    return this.yLabelWidthFactor * this.chartSize
  }
  get xLabelHeight() {
    return this.xLabelHeightFactor * this.chartSize
  }

  get labelFontSize() {
    return 0.1 * this.chartSize
  }

  get chartHeadPrimarySize() {
    return 0.02 * this.chartSize
  }

  get chartHeadSecondarySize() {
    return this.chartHeadPrimarySize * 0.5
  }

  get chartHeadPrimaryHaloSize() {
    return 3 * this.chartHeadPrimarySize
  }
  get indicatorThickness() {
    return Math.max(1, 0.015 * this.chartSize)
  }
  get indicatorWidth() {
    return this.sliderHandleWidth * 0.75
  }
  get timePlotLineWidth() {
    return this.chartSize / 180
  }

  get chartHStackSpacing() {
    return this.chartHStackFactor * this.chartSize
  }
  get chartVStackSpacing() {
    return this.chartHStackSpacing
  }

  get largeTotalChartWidth() {
    return this.chartSize + (2 * this.chartHStackSpacing) + this.sliderHandleWidth + this.yLabelWidth
  }

  get yAxis() {
    return new LinearAxis(
      this.chartSize,
      this.includeAxisPadding ? this.sliderMaxValuePadding : 0,
      this.minConcentration,
      this.maxConcentration
    )
  }

  get xAxis() {
    return new LinearAxis(
      0,
      this.includeAxisPadding ? this.chartSize - this.sliderMaxValuePadding : this.chartSize,
      this.minTime,
      this.maxTime
    )
  }

  /// Minimum spacing between two inputs
  get inputSpacing() {
    return 1.1 * this.sliderSettings.handleThickness
  }
}

export { ReactionRateChartLayoutSettings }