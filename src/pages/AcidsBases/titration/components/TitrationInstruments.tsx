
import { Pipette, FlaskConical } from "lucide-react";

export const TitrationInstruments = () => {
   return (
      <div className="flex h-full items-end justify-around pb-4">
         {/* Placeholder icons to represent the instruments in the reference */}
         <div className="flex flex-col items-center gap-2 opacity-50">
            <div className="w-12 h-20 border-2 border-slate-300 rounded-lg flex items-center justify-center">
               <span className="text-xs text-slate-400">Stand</span>
            </div>
         </div>

         <div className="flex flex-col items-center gap-2">
            <Pipette className="w-12 h-12 text-slate-600 rotate-45" />
            <span className="text-xs font-medium text-slate-500">Dropper</span>
         </div>

         <div className="flex flex-col items-center gap-2">
            <FlaskConical className="w-12 h-12 text-slate-600" />
            <span className="text-xs font-medium text-slate-500">Burette</span>
         </div>

         <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-14 bg-emerald-800 rounded-md flex items-center justify-center text-white/80 text-xs font-bold shadow-md">
               HCl
            </div>
            <span className="text-xs font-medium text-slate-500">Acid</span>
         </div>
      </div>
   );
};
