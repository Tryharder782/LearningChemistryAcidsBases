class BeakerSettings {
  readonly heightToWidth = 1.1
  readonly numTicks = 13

  width: number
  hasLip: boolean
  lineWidth: number

  constructor(width: number, hasLip?: boolean, lineWidth?: number) {
    this.width = width
    this.hasLip = hasLip ?? false
    this.lineWidth = lineWidth ?? 2
  }

  get lipRadius() {
    return this.hasLip ? this.width * 0.03 : 0
  }

  get lipWidthLeft() {
    return this.hasLip ? this.width * 0.01 : 0
  }

  get mediumBeakerRightLipWidth() {
    return this.lipWidthLeft * 9
  }

  get smallBeakerRightLipWidth() {
    return this.mediumBeakerRightLipWidth
  }

  get outerBottomCornerRadius() {
    return this.width * 0.1
  }

  get mediumBeakerRightGap() {
    return this.hasLip ? this.lipWidthLeft * 5 : 0.15 * this.width
  }

  get smallBeakerRightGap() {
    return this.hasLip ? 2 * this.mediumBeakerRightGap : 1.5 * this.mediumBeakerRightGap
  }

  get innerLeftBottomCornerRadius() {
    return this.outerBottomCornerRadius
  }

  get mediumBeakerRightCornerRadius() {
    return this.outerBottomCornerRadius * 1.5
  }

  get smallBeakerRightCornerRadius() {
    return this.mediumBeakerRightCornerRadius * 1.2
  }

  get innerBeakersBottomGap() {
    return this.width * 0.055
  }

  get ticksBottomGap() {
    return this.innerBeakersBottomGap * 1.5
  }

  get ticksMinorWidth() {
    return this.width * 0.075
  }

  get ticksMajorWidth() {
    return this.ticksMinorWidth * 2
  }

  get ticksTopGap() {
    return this.lipRadius * 4
  }

  get ticksRightGap() {
    return this.lipRadius + this.mediumBeakerRightGap + this.mediumBeakerRightLipWidth
  }

  get innerBeakerWidth() {
    return this.width - (2 * this.lipRadius) - (2 * this.lipWidthLeft)
  }
}

export {
  BeakerSettings
}