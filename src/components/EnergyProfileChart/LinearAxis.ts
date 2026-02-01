/// Encapsulates a linear axis, which moves from two positions and two values
class LinearAxis {
  minValuePosition: number
  maxValuePosition: number
  minValue: number
  maxValue: number

  constructor(minValuePosition: number, maxValuePosition: number, minValue: number, maxValue: number) {
    this.minValuePosition = minValuePosition
    this.maxValuePosition = maxValuePosition
    this.minValue = minValue
    this.maxValue = maxValue
  }

  getPosition(value: number) {
    return (this.m * value) + this.c
  }

  getValue(position: number) {
    return (position - this.c) / this.m
  }

  /// Returns the increment to use for accessibility
  accessibilityIncrement() {
    return (this.maxValue - this.minValue) / 10
  }

  /// Returns a new axis with the minimum value updated to the provided value.
  /// The minimum value position is updated to keep the same axis scale
  updateMinValue(value: number) {
    let valuePosition = this.getPosition(value)
    return this.withNewMin(valuePosition, value)
  }

  /// Returns a new axis with the minimum value position updated to the provided value.
  /// The minimum value is updated to keep the same axis scale
  updateMinPosition(position: number) {
    let valueForPosition = this.getValue(position)
    return this.withNewMin(position, valueForPosition)
  }

  /// Returns a new axis with the maximum value updated to the provided value.
  /// The maximum value position is updated to keep the same axis scale
  updateMaxValue(value: number) {
    let valuePosition = this.getPosition(value)
    return this.withNewMax(valuePosition, value)
  }

  /// Returns a new axis with the maximum value position updated to the provided value.
  /// The maximum value is updated to keep the same axis scale
  updateMaxPosition(position: number) {
    let valueForPosition = this.getValue(position)
    return this.withNewMax(position, valueForPosition)
  }

  /// Returns a value which corresponds to the distance `distance`
  valueForDistance(distance: number) {
    let scaledDistance = Math.abs(distance / (this.maxValuePosition - this.minValuePosition))
    let dValue = this.maxValue - this.minValue
    return this.minValue + (scaledDistance * dValue)
  }

  withNewMin(position: number, value: number) {
    return new LinearAxis(
      position,
      this.maxValuePosition,
      value,
      this.maxValue
    )
  }

  withNewMax(position: number, value: number) {
    return new LinearAxis(
      this.minValuePosition,
      position,
      this.minValue,
      value
    )
  }

  shift(delta: number) {
    return new LinearAxis(
      this.minValuePosition,
      this.maxValuePosition,
      this.minValue + delta,
      this.maxValue + delta
    )
  }

  get m() {
    return (this.maxValuePosition - this.minValuePosition) / (this.maxValue - this.minValue)
  }

  get c() {
    return this.minValuePosition - (this.m * this.minValue)
  }
}

export { LinearAxis }