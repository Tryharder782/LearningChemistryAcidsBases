/**
 * ReactionEquation - Shows the chemical reaction equation at the top.
 * e.g., HCl → H⁺ + Cl⁻
 */

import type { AcidOrBase } from '../../../helper/acidsBases/types';

interface ReactionEquationProps {
   /** Current substance */
   substance: AcidOrBase | null;
   /** Show dissociation arrow type */
   arrowType?: 'single' | 'double';
   /** Optional titrant for neutralization reaction */
   titrant?: AcidOrBase;
   /** Optional className */
   className?: string;
}

export function ReactionEquation({
   substance,
   titrant,
   arrowType = 'single',
   className = '',
}: ReactionEquationProps) {
   // Wrapper class for consistent layout
   const wrapperClass = `justify-center flex items-center gap-1 text-2xl font-medium ${className}`;

   if (!substance) {
      return (
         <div className={`flex items-center gap-4 text-gray-400 ${className}`}>
            <span>Select a substance</span>А
         </div>
      );
   }

   const isAcid = substance.type === 'strongAcid' || substance.type === 'weakAcid';
   const isWeak = substance.type === 'weakAcid' || substance.type === 'weakBase';
   const arrow = isWeak ? '⇌' : (arrowType === 'double' ? '⇌' : '→');

   // Parse ion symbols for proper display
   const formatIon = (ion: string, charge: string) => (
      <span className="inline-flex items-baseline">
         {ion}<sup className="text-xs">{charge}</sup>
      </span>
   );

   const renderSpecies = (label: React.ReactNode, color?: string) => (
      <div className="flex flex-col items-center gap-2">
         <span className="text-gray-900">{label}</span>
         <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color || 'transparent' }} />
      </div>
   );

   const renderPlus = () => (
      <div className="flex flex-col items-center gap-2 pb-5">
         <span className="text-gray-500">+</span>
      </div>
   );

   const renderArrow = () => (
      <div className="flex flex-col items-center gap-2 pb-5">
         <span className="text-gray-600">{arrow}</span>
      </div>
   );

   if (titrant) {
      const isSubstanceAcid = substance.type === 'strongAcid' || substance.type === 'weakAcid';
      // Construct Salt symbol: Cation + Anion
      // If substance is Acid (HA), anion is substance.secondaryIon. Cation comes from titrant (BOH) -> titrant.secondaryIon.
      // If substance is Base (BOH), cation is substance.secondaryIon. Anion comes from titrant (HA) -> titrant.secondaryIon.
      const cation = isSubstanceAcid ? titrant.secondaryIon : substance.secondaryIon;
      const anion = isSubstanceAcid ? substance.secondaryIon : titrant.secondaryIon;

      // Simple concat for now, e.g. "K" + "Cl" -> "KCl"
      const saltSymbol = `${cation}${anion}`;

      // Salt color: utilize the anion's color (usually distinct, e.g. Cl is purple)
      const saltColor = isSubstanceAcid ? substance.secondaryColor : titrant.secondaryColor;

      return (
         <div className={wrapperClass}>
            {renderSpecies(substance.symbol, substance.color)}
            {renderPlus()}
            {renderSpecies(titrant.symbol, titrant.color)}
            {renderArrow()}
            {renderSpecies(saltSymbol, saltColor)}
            {renderPlus()}
            {renderSpecies('H₂O', '#ADD8E6')}
         </div>
      );
   }

   if (isWeak) {
      if (isAcid) {
         return (
            <div className={wrapperClass}>
               {renderSpecies(substance.symbol, substance.color)}
               {renderPlus()}
               {renderSpecies('H₂O', '#D1D5DB')}
               {renderArrow()}
               {renderSpecies(formatIon('H₃O', '+'), substance.primaryColor)}
               {renderPlus()}
               {renderSpecies(formatIon(substance.secondaryIon, '⁻'), substance.secondaryColor)}
            </div>
         );
      }

      return (
         <div className={wrapperClass}>
            {renderSpecies(substance.symbol, substance.color)}
            {renderPlus()}
            {renderSpecies('H₂O', '#D1D5DB')}
            {renderArrow()}
            {renderSpecies(formatIon(substance.secondaryIon, '⁺'), substance.secondaryColor)}
            {renderPlus()}
            {renderSpecies(formatIon('OH', '⁻'), substance.primaryColor)}
         </div>
      );
   }

   // Strong acid/base dissociation
   const primarySymbol = isAcid ? 'H' : 'OH';
   const primaryCharge = isAcid ? '+' : '-';

   return (
      <div className={wrapperClass}>
         {renderSpecies(substance.symbol, substance.color)}
         {renderArrow()}
         {renderSpecies(formatIon(primarySymbol, primaryCharge), substance.primaryColor)}
         {renderPlus()}
         {renderSpecies(formatIon(substance.secondaryIon, isAcid ? '⁻' : '⁺'), substance.secondaryColor)}
      </div>
   );
}

export default ReactionEquation;
