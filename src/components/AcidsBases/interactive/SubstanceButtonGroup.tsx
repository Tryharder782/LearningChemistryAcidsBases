/**
 * SubstanceButtonGroup - A toggle group for selecting substances.
 * Extracted from TitrationScreen for reuse.
 */

import type { AcidOrBase } from '../../../helper/acidsBases/types';

interface SubstanceButtonGroupProps {
   title?: string;
   substances: AcidOrBase[];
   selected: AcidOrBase | null;
   onSelect: (substance: AcidOrBase) => void;
   className?: string;
}

export function SubstanceButtonGroup({
   title,
   substances,
   selected,
   onSelect,
   className = ''
}: SubstanceButtonGroupProps) {
   return (
      <div className={className}>
         {title && <p className="text-xs text-gray-500 mb-2 uppercase tracking-tight">{title}</p>}
         <div className="flex gap-2 flex-wrap">
            {substances.map((s) => (
               <button
                  key={s.id}
                  onClick={() => onSelect(s)}
                  className={`
                     px-3 py-1.5 rounded-md text-sm font-semibold transition-all duration-200
                     ${selected?.id === s.id
                        ? 'bg-blue-500 text-white shadow-md transform scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 active:bg-gray-300'}
                  `}
               >
                  {s.symbol}
               </button>
            ))}
         </div>
      </div>
   );
}

export default SubstanceButtonGroup;
