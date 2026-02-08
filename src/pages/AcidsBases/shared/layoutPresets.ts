export const ACIDS_BASES_MAIN_GRID = {
   // iOS-derived: intro uses a narrower beaker side and wider theory side.
   introduction: 'minmax(0, 34fr) minmax(0, 66fr)',
   buffers: 'minmax(0, 50fr) minmax(0, 50fr)',
   titration: 'minmax(0, 55fr) minmax(0, 55fr)'
} as const;

export const ACIDS_BASES_LAYOUT_PADDING_PX = 10;

export const ACIDS_BASES_INNER_GRID = {
   // iOS-derived from beaker+slider (~370) vs chart stack (~282) at design width.
   buffers: {
      columns: 'minmax(0, 57fr) minmax(0, 43fr)',
      gapPx: 32
   },
   // Titration keeps similar proportion but slightly tighter inter-column spacing.
   titration: {
      columns: 'minmax(0, 56fr) minmax(0, 44fr)',
      gapPx: 22
   }
} as const;

export const ACIDS_BASES_BEAKER_ANCHOR = {
   blockWidthPx: 372,
   leftOffsetPx: 16
} as const;

export const ACIDS_BASES_GRAPH_ANCHOR = {
   squareSizePx: 200,
   leftOffsetPx: 10
} as const;

export const ACIDS_BASES_BOTTOM_GRAPH_SLOT = {
   widthPx: 292,
   heightPx: 310
} as const;

export const ACIDS_BASES_STABLE_ROW_SLOTS = {
   buffers: {
      topRowHeightPx: 250,
      bottomRowHeightPx: 430,
      rowGapPx: 20
   },
   titration: {
      topRowHeightPx: 250,
      bottomRowHeightPx: 430,
      rowGapPx: 20
   }
} as const;

export const ACIDS_BASES_RIGHT_PANEL_SLOTS = {
   buffers: {
      equationsHeightPx: 312,
      panelGapPx: 16
   },
   titration: {
      reactionHeightPx: 48,
      mathHeightPx: 290,
      panelGapPx: 16
   }
} as const;
