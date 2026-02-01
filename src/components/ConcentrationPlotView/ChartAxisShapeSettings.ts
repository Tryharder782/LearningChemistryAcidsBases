class ChartAxisShapeSettings {
  verticalTicks: number
  horizontalTicks: number
  tickSize: number
  gapToTop: number
  gapToSide: number
  readonly lineWidth = 1

  constructor(chartSize: number) {
    this.verticalTicks = 11
    this.horizontalTicks = 11
    this.tickSize = 0.04 * chartSize
    this.gapToTop = 0.2 * chartSize
    this.gapToSide = 0.2 * chartSize
  }
}

export { ChartAxisShapeSettings }