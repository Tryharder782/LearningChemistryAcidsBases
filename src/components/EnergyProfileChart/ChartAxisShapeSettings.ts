class ChartAxisShapeSettings {
  verticalTicks: number
  horizontalTicks: number
  tickSize: number
  gapToTop: number
  gapToSide: number
  readonly lineWidth = 1

  constructor(chartSize: number) {
    this.verticalTicks = 10
    this.horizontalTicks = 10
    this.tickSize = 0.04 * chartSize
    this.gapToTop = 0.24 * chartSize
    this.gapToSide = 0.24 * chartSize
  }
}

export { ChartAxisShapeSettings }