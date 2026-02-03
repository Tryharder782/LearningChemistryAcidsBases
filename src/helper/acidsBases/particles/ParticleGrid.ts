import { type GridPosition, GRID_COLS, GRID_ROWS_TOTAL } from './types';

export class ParticleGrid {
   private occupied: Set<string>;

   constructor() {
      this.occupied = new Set();
   }

   /**
    * Reset the grid state
    */
   clear() {
      this.occupied.clear();
   }

   /**
    * Mark a position as occupied
    */
   occupy(pos: GridPosition) {
      this.occupied.add(this.key(pos));
   }

   /**
    * Free a position
    */
   release(pos: GridPosition) {
      this.occupied.delete(this.key(pos));
   }

   /**
    * Check if position is occupied
    */
   isOccupied(pos: GridPosition): boolean {
      return this.occupied.has(this.key(pos));
   }

   /**
    * Get a list of random available positions
    * @param count Number of positions needed
    * @param avoid Positions to specifically avoid (optional)
    * @param effectiveRows Limit rows to this value (for water level constraint)
    */
   getRandomAvailablePositions(
      count: number,
      avoid: GridPosition[] = [],
      effectiveRows: number = GRID_ROWS_TOTAL
   ): GridPosition[] {
      const result: GridPosition[] = [];
      const tempOccupied = new Set(this.occupied);

      // Clamp effectiveRows to valid range
      const maxRows = Math.max(1, Math.min(effectiveRows, GRID_ROWS_TOTAL));

      // Add avoid list to temp set
      avoid.forEach(pos => tempOccupied.add(this.key(pos)));

      // If requested more than total slots, clamp
      const maxSlots = GRID_COLS * maxRows;

      // Count only occupied slots within the current effective rows
      let visibleOccupiedCount = 0;
      tempOccupied.forEach(key => {
         const [c, r] = key.split(',').map(Number);
         if (r < maxRows) {
            visibleOccupiedCount++;
         }
      });

      const availableCount = maxSlots - visibleOccupiedCount;
      const toAdd = Math.min(count, availableCount);

      if (toAdd <= 0) return [];

      let attempts = 0;
      const MAX_ATTEMPTS = maxSlots * 2; // Prevent infinite loops

      while (result.length < toAdd && attempts < MAX_ATTEMPTS) {
         attempts++;
         const pos = {
            col: Math.floor(Math.random() * GRID_COLS),
            // Visible rows are from top (0 to maxRows-1), bottom rows are clipped by container
            row: Math.floor(Math.random() * maxRows)
         };

         const k = this.key(pos);
         if (!tempOccupied.has(k)) {
            tempOccupied.add(k);
            result.push(pos);
         }
      }

      // Fallback if random sampling fails (scan grid from top)
      if (result.length < toAdd) {
         for (let r = 0; r < maxRows && result.length < toAdd; r++) {
            for (let c = 0; c < GRID_COLS && result.length < toAdd; c++) {
               const pos = { col: c, row: r };
               const k = this.key(pos);
               if (!tempOccupied.has(k)) {
                  tempOccupied.add(k);
                  result.push(pos);
               }
            }
         }
      }

      return result;
   }

   private key(pos: GridPosition): string {
      return `${pos.col},${pos.row}`;
   }
}
