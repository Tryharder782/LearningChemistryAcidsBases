import type { ReactNode } from 'react';
import { ACIDS_BASES_BEAKER_ANCHOR } from './layoutPresets';

type AnchoredBeakerBlockProps = {
   slider: ReactNode;
   beaker: ReactNode;
   footer?: ReactNode;
};

export const AnchoredBeakerBlock = ({ slider, beaker, footer }: AnchoredBeakerBlockProps) => {
   return (
      <div className="flex flex-col items-start gap-4 h-full">
         <div
            className="flex items-end"
            style={{
               width: `${ACIDS_BASES_BEAKER_ANCHOR.blockWidthPx}px`,
               marginLeft: `${ACIDS_BASES_BEAKER_ANCHOR.leftOffsetPx}px`
            }}
         >
            {slider}
            {beaker}
         </div>
         {footer ? <div className="flex justify-center gap-6">{footer}</div> : null}
      </div>
   );
};
