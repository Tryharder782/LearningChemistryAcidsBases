import { LinearAxis } from "./LinearAxis"
import { ReactionRateChartLayoutSettings } from "./ReactionRateChartLayoutSettings"

export type TimeChartLayoutSettings = {
    xAxis: LinearAxis,
    yAxis: LinearAxis,
    haloRadius: number,
    lineWidth: number
}
class EnergyRateChartSettings {
    chartSize: number
    timeChartSettings: ReactionRateChartLayoutSettings

    constructor(chartSize: number) {
        this.chartSize = chartSize
        this.timeChartSettings = new ReactionRateChartLayoutSettings(chartSize)
    }
    
    get chartHeadSize() {
        return this.timeChartSettings.chartHeadPrimarySize
    }

    get chartHeadHaloSize() {
        return this.timeChartSettings.chartHeadPrimaryHaloSize
    }

    get annotationMoleculeSize() {
        return this.chartSize * 0.05
    }

    get yAxis() {
        return new LinearAxis(
            this.chartSize,
            0,
            Math.log(0.6),
            Math.log(8),
        )
    }

    get xAxis() {
        return new LinearAxis(
            0.1 * this.chartSize,
            0.9 * this.chartSize,
            1 / 600,
            1 / 400,
        )
    }
}

export { EnergyRateChartSettings }