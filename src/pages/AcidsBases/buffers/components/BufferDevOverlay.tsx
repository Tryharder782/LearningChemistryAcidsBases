import type { ReactNode } from 'react';

type DevSection = {
   title: string;
   rows: Array<{ label: string; value: ReactNode }>;
};

type BufferDevOverlayProps = {
   sections: DevSection[];
};

export const BufferDevOverlay = ({ sections }: BufferDevOverlayProps) => {
   if (process.env.NODE_ENV === 'production') return null;

   return (
      <div className="fixed right-4 bottom-4 z-[9999] max-w-[360px] text-[11px] leading-4 text-white">
         <div className="rounded-md border border-white/20 bg-black/80 p-3 shadow-lg">
            <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-white/80">Dev overlay</div>
            <div className="space-y-3">
               {sections.map(section => (
                  <div key={section.title}>
                     <div className="mb-1 text-[10px] font-semibold uppercase text-white/60">{section.title}</div>
                     <div className="space-y-0.5">
                        {section.rows.map(row => (
                           <div key={`${section.title}-${row.label}`} className="flex items-start justify-between gap-3">
                              <span className="text-white/70">{row.label}</span>
                              <span className="text-right tabular-nums">{row.value}</span>
                           </div>
                        ))}
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
};
