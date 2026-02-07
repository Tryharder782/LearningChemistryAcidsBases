import { GRID_ROWS_MIN, GRID_ROWS_MAX } from './particles/types';

const getAvailableRows = (rowsFloat: number): number => {
   const baseRows = Math.floor(rowsFloat);
   const fractionalPart = rowsFloat - baseRows;
   return fractionalPart > 0.4 ? Math.ceil(rowsFloat) : baseRows;
};

export const getGridRowsForWaterLevel = (
   waterLevel: number,
   waterLevelMin: number,
   waterLevelMax: number,
   rowsMin: number = GRID_ROWS_MIN,
   rowsMax: number = GRID_ROWS_MAX
): number => {
   const clamped = Math.max(waterLevelMin, Math.min(waterLevelMax, waterLevel));
   const normalized = (clamped - waterLevelMin) / (waterLevelMax - waterLevelMin);
   const rowsFloat = rowsMin + (rowsMax - rowsMin) * normalized;
   // Matches iOS GridCoordinateList.availableRows(for:)
   const availableRows = getAvailableRows(rowsFloat);
   return Math.max(rowsMin, Math.min(rowsMax, availableRows));
};

export const getModelLevelForWaterLevel = (
   waterLevel: number,
   waterLevelMin: number,
   waterLevelMax: number
): number => Math.max(0, Math.min(1, (waterLevel - waterLevelMin) / (waterLevelMax - waterLevelMin)));
