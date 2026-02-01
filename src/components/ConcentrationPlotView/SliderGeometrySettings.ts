class SliderGeometrySettings {

  handleWidth: number
  handleThickness: number
  handleCornerRadius: number
  barThickness: number

  constructor(
    handleWidth: number,
    handleThickness: number,
    handleCornerRadius: number,
    barThickness: number
  ) {
    this.handleWidth = handleWidth
    this.handleThickness = 0.5 * handleWidth
    this.handleCornerRadius = 0.125 * handleWidth
    this.barThickness = 0.094 * handleWidth
    this.updating(handleWidth, handleThickness, handleCornerRadius, barThickness)
  }

  updating(
    handleWidth: number,
    handleThickness: number,
    handleCornerRadius: number,
    barThickness: number
  ) {
    this.handleWidth = handleWidth ?? this.handleWidth
    this.handleThickness = handleThickness ?? this.handleThickness
    this.handleCornerRadius = handleCornerRadius ?? this.handleCornerRadius
    this.barThickness = barThickness ?? this.barThickness
  }
}

export { SliderGeometrySettings }