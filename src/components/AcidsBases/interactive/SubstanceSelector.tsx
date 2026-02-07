import { useState, useRef, useEffect } from 'react';
import type { AcidOrBase } from '../../../helper/acidsBases/types';
import { ChevronDown } from 'lucide-react';

interface SubstanceSelectorProps {
   /** Available substances to choose from */
   substances: AcidOrBase[];
   /** Currently selected substance */
   selected: AcidOrBase | null;
   /** Selection callback */
   onSelect: (substance: AcidOrBase) => void;
   /** Whether selection is enabled */
   enabled?: boolean;
   /** Optional className */
   className?: string;
   /** Placeholder text when nothing is selected */
   placeholder?: string;
   /** External control for open state */
   isOpen?: boolean;
   /** Callback for open state change */
   onOpenChange?: (isOpen: boolean) => void;
   /** Whether to render the menu statically (relative) instead of absolute overlay */
   staticMenu?: boolean;
   /** Compact mode: only show toggle button when inactive */
   compact?: boolean;
   /** Alignment of the dropdown menu */
   align?: 'left' | 'right';
}

export function SubstanceSelector({
   substances,
   selected,
   onSelect,
   enabled = true,
   className = '',
   placeholder = 'Choose a substance',
   isOpen: controlledIsOpen,
   onOpenChange,
   staticMenu = false,
   compact = false,
   align = 'left',
}: SubstanceSelectorProps) {
   const [internalIsOpen, setInternalIsOpen] = useState(false);
   const isControlled = controlledIsOpen !== undefined;
   const isOpen = isControlled ? controlledIsOpen : internalIsOpen;
   const containerRef = useRef<HTMLDivElement>(null);

   const handleOpenChange = (newOpen: boolean) => {
      if (isControlled) {
         onOpenChange?.(newOpen);
      } else {
         setInternalIsOpen(newOpen);
      }
   };

   // Close dropdown when clicking outside
   useEffect(() => {
      const handleClickOutside = (event: Event) => {
         if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
            handleOpenChange(false);
         }
      };
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
      return () => {
         document.removeEventListener('mousedown', handleClickOutside);
         document.removeEventListener('touchstart', handleClickOutside);
      };
   }, [isControlled, onOpenChange]); // Add dependencies as these might change

   useEffect(() => {
      window.dispatchEvent(new Event('guide:highlight-update'));
   }, [isOpen]);

   // In compact mode when disabled: show only the toggle button
   if (compact && !enabled) {
      return (
         <button
            className="w-10 h-10 flex items-center justify-center border-2 border-black rounded-sm bg-white hover:bg-gray-50 transition-colors"
            disabled={true}
         >
            <ChevronDown className="w-5 h-5 text-black rotate-180" />
         </button>
      );
   }

   return (
      <div className={`relative ${className}`} ref={containerRef}>
         {/* Dropdown Header */}
         <button
            onClick={() => enabled && handleOpenChange(!isOpen)}
            disabled={!enabled}
            className={`
               w-full flex items-center justify-between px-4 py-3 bg-white border-2 border-black rounded-sm shadow-sm
               text-left font-semibold transition-all
               ${!enabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:shadow-md'}
            `}
         >
            <span className={`block truncate ${!selected ? 'text-gray-500' : 'text-black'}`}>
               {placeholder}
            </span>
            <ChevronDown className={`w-5 h-5 text-black flex-shrink-0 transition-transform ml-2 ${isOpen ? 'rotate-180' : ''}`} />
         </button>

         {/* Dropdown Options */}
         {isOpen && (
            <div className={`
               w-full mt-1 bg-white border-2 border-black rounded-sm shadow-lg max-h-60 overflow-auto
               ${staticMenu ? 'relative' : 'absolute z-[200]'}
               ${align === 'right' ? 'right-0' : 'left-0'}
            `}>
               {substances.map((substance) => {
                  const isSelected = selected?.id === substance.id;
                  return (
                     <div
                        key={substance.id}
                        onClick={() => {
                           onSelect(substance);
                           handleOpenChange(false);
                        }}
                        className={`
                           flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors font-medium
                           border-b border-gray-200 last:border-b-0
                           ${isSelected ? 'bg-gray-300 text-black' : 'hover:bg-gray-100 text-gray-800'}
                        `}
                     >
                        <span className={`flex-1 truncate`}>
                           {substance.symbol}
                        </span>
                     </div>
                  );
               })}
            </div>
         )}
      </div>
   );
}

export default SubstanceSelector;
