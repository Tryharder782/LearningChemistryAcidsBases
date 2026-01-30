import { useRef, useEffect } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface ChaptersMenuProps {
   isOpen: boolean;
   onToggle: () => void;
   onClose: () => void;
}

export function ChaptersMenu({ isOpen, onToggle, onClose }: ChaptersMenuProps) {
   const menuRef = useRef<HTMLDivElement>(null);
   const navigate = useNavigate();
   const location = useLocation();

   const activeScreen = location.pathname.includes('buffer') ? 'buffer' :
      location.pathname.includes('intro') ? 'intro' :
         location.pathname.includes('titration') ? 'titration' : 'intro';

   const handleNavigate = (screen: string) => {
      navigate(`/${screen}`);
      onClose();
   };

   useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
         if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            onClose();
         }
      };
      if (isOpen) {
         document.addEventListener('mousedown', handleClickOutside);
      }
      return () => document.removeEventListener('mousedown', handleClickOutside);
   }, [isOpen, onClose]);

   return (
      <div className="relative" ref={menuRef}>
         <button
            onClick={onToggle}
            className={`flex items-center gap-1 text-sm font-medium transition-colors ${isOpen ? 'text-gray-900' : 'text-black-500'}`}
            style={{ 
               background: 'none',
               border: 'none',
               padding: 0,
               cursor: 'pointer'
            }}
         >
            Chapters {isOpen ? <ChevronDown className="w-4 h-4 text-red-500" /> : <ChevronRight className="w-4 h-4 text-red-500" />}
         </button>

         {isOpen && (
            <div 
               className="absolute right-0 top-8 w-64 bg-white rounded-lg shadow-xl py-2 z-[100] text-sm"
               style={{ border: '1px solid #e5e7eb' }}
            >
               {/* Reaction Rates */}
               <div className="px-4 py-2 flex items-center justify-between text-gray-800 hover:bg-gray-50 cursor-pointer">
                  <span>Reaction rates</span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
               </div>

               {/* Equilibrium */}
               <div className="px-4 py-2 flex items-center justify-between text-gray-800 hover:bg-gray-50 cursor-pointer">
                  <span>Equilibrium</span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
               </div>

               {/* Acids & Bases (Expanded) */}
               <div className="px-4 py-2 text-gray-900 font-medium">
                  <div className="flex items-center justify-between cursor-pointer">
                     <span>Acids & bases</span>
                     <ChevronDown className="w-4 h-4 text-gray-600" />
                  </div>

                  <div className="mt-2 ml-2 border-l-2 border-gray-200 pl-4 flex flex-col gap-3">
                     {/* Introduction */}
                     <div
                        className={`font-medium flex items-center gap-2 cursor-pointer ${activeScreen === 'intro' ? 'text-red-500' : 'text-gray-600 hover:text-gray-900'}`}
                        onClick={() => handleNavigate('intro')}
                     >
                        <span>Introduction</span>
                        {activeScreen === 'intro' && <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>}
                     </div>

                     {/* Buffers */}
                     <div
                        className={`font-medium flex items-center gap-2 cursor-pointer ${activeScreen === 'buffer' ? 'text-red-500' : 'text-gray-600 hover:text-gray-900'}`}
                        onClick={() => handleNavigate('buffer')}
                     >
                        <span>Buffers</span>
                        {activeScreen === 'buffer' && <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>}
                     </div>

                     {/* Titration */}
                     <div
                        className={`font-medium flex items-center gap-2 cursor-pointer ${activeScreen === 'titration' ? 'text-red-500' : 'text-gray-600 hover:text-gray-900'}`}
                        onClick={() => handleNavigate('titration')}
                     >
                        <span>Titration</span>
                        {activeScreen === 'titration' && <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>}
                     </div>
                  </div>
               </div>

               {/* Chemical Reactions */}
               <div className="px-4 py-2 flex items-center justify-between text-gray-800 hover:bg-gray-50 cursor-pointer">
                  <span>Chemical reactions</span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
               </div>
            </div>
         )}
      </div>
   );
}
