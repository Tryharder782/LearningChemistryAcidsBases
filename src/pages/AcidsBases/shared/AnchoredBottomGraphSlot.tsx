import type { ReactNode } from 'react';
import { ACIDS_BASES_BOTTOM_GRAPH_SLOT } from './layoutPresets';

type AnchoredBottomGraphSlotProps = {
   children: ReactNode;
   verticalAlign?: 'top' | 'center' | 'bottom';
};

export const AnchoredBottomGraphSlot = ({ children, verticalAlign = 'center' }: AnchoredBottomGraphSlotProps) => {
   const verticalClass =
      verticalAlign === 'top'
         ? 'items-start'
         : verticalAlign === 'bottom'
            ? 'items-end'
            : 'items-center';

   return (
      <div className={`w-full h-full flex justify-start ${verticalClass}`}>
         <div
            style={{
               width: `${ACIDS_BASES_BOTTOM_GRAPH_SLOT.widthPx}px`,
               height: `${ACIDS_BASES_BOTTOM_GRAPH_SLOT.heightPx}px`
            }}
         >
            {children}
         </div>
      </div>
   );
};
