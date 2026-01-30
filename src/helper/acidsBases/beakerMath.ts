import { GRID_ROWS_MIN, GRID_ROWS_MAX } from './particles/types';

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
   // Always round up so any partially visible row is considered active
   const availableRows = Math.ceil(rowsFloat);
   return Math.max(rowsMin, Math.min(rowsMax, availableRows));
};

export const getModelLevelForWaterLevel = (
   waterLevel: number,
   waterLevelMin: number,
   waterLevelMax: number
): number => Math.max(0, Math.min(1, (waterLevel - waterLevelMin) / (waterLevelMax - waterLevelMin)));
