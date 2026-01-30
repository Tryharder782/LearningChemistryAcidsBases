/**
 * ReagentBottles - Container for 4 reagent bottles
 * Manages bottle states based on guide step
 */

import { ReagentBottle } from './ReagentBottle';
import type { BottleState } from './ReagentBottle';
import { useGuideStore } from '../guide/useGuideStore';
import { getSubstancesByType } from '../../../helper/acidsBases/substances';
import type { AcidOrBase, SubstanceType } from '../../../helper/acidsBases/types';
import { useState, useEffect } from 'react';

export interface BottleConfig {
   substance: AcidOrBase | null;
   state: BottleState;
   onClick: () => void;
   onPourComplete?: () => void;
   onPouringStart?: () => void;
   onRegister?: (element: HTMLDivElement | null) => void;
   customTranslation?: { x: number; y: number };
   forceGreyedOut?: boolean;
}

interface ReagentBottlesProps {
   /** Called when a bottle pours its contents (legacy mode) */
   onPour?: (substance: AcidOrBase) => void;
   /** Optional className */
   className?: string;
   /** Explicit bottle configuration (overrides legacy store logic) */
   bottles?: BottleConfig[];
}

// Bottle configuration for each slot (Legacy)
const BOTTLE_SLOTS: { type: SubstanceType; unlockStep: number }[] = [
   { type: 'strongAcid', unlockStep: 7 },
   { type: 'strongBase', unlockStep: 17 },
   { type: 'weakAcid', unlockStep: 21 },
   { type: 'weakBase', unlockStep: 26 },
];

export function ReagentBottles({ onPour, className = '', bottles }: ReagentBottlesProps) {
   // Legacy Store Access
   const store = useGuideStore();

   // Internal state for legacy mode
   const [activeSlot, setActiveSlot] = useState<number | null>(null);

   // Legacy: Determine bottle state for each slot
   const getLegacyBottleState = (slotIndex: number): BottleState => {
      const { currentStep, inputState, selectedSubstances } = store;
      const slot = BOTTLE_SLOTS[slotIndex];
      const selectedSubstance = selectedSubstances[slot.type];

      // Locked until unlockStep
      if (currentStep < slot.unlockStep) return 'locked';

      // Check if this slot's type is currently active for adding
      const isActiveType =
         inputState.type === 'addSubstance' && inputState.substanceType === slot.type;

      // Check if it's the choose step for this type
      const isChooseType =
         inputState.type === 'chooseSubstance' && inputState.substanceType === slot.type;

      // If actively adding
      if (isActiveType && selectedSubstance) {
         if (activeSlot === slotIndex) return 'ready'; // Selected and ready to pour
         if (activeSlot !== null) return 'unlocked'; // Another bottle is selected
         return 'active'; // Available to select
      }

      // If choosing, it's active (clickable)
      if (isChooseType) return 'active';

      // Otherwise, just unlocked but greyed
      return 'unlocked';
   };

   // Legacy: Get substance for a slot
   const getLegacySubstanceForSlot = (slotIndex: number): AcidOrBase | null => {
      const { currentStep, selectedSubstances } = store;
      const slot = BOTTLE_SLOTS[slotIndex];

      // If locked, no substance
      if (currentStep < slot.unlockStep) return null;

      // If substance selected for this type, return it
      const selectedSubstance = selectedSubstances[slot.type];
      if (selectedSubstance) return selectedSubstance;

      // Otherwise return first available substance of this type
      const available = getSubstancesByType(slot.type);
      return available[0] || null;
   };

   // Legacy: Handle bottle click
   const handleLegacyBottleClick = (slotIndex: number) => {
      const { inputState, selectSubstance } = store;
      const slot = BOTTLE_SLOTS[slotIndex];
      const state = getLegacyBottleState(slotIndex);
      const substance = getLegacySubstanceForSlot(slotIndex);

      if (state === 'active' && substance) {
         if (inputState.type === 'chooseSubstance') {
            selectSubstance(slot.type, substance);
         } else if (inputState.type === 'addSubstance') {
            // First click: Select/Move bottle
            setActiveSlot(slotIndex);
         }
      }
   };

   // Legacy: Handle pour complete
   const handleLegacyPourComplete = (slotIndex: number) => {
      const { addSubstance } = store;
      const substance = getLegacySubstanceForSlot(slotIndex);
      if (substance) {
         // Add substance fraction (default increment handled by store)
         addSubstance(0);
         onPour?.(substance);
      }
   };

   // Reset active slot when step changes (Legacy)
   useEffect(() => {
      setActiveSlot(null);
   }, [store.currentStep, store.inputState.type]);

   // Render Logic
   const renderBottles = () => {
      if (bottles) {
         return bottles.map((bottle, index) => (
            <ReagentBottle
               key={index}
               substance={bottle.substance}
               state={bottle.state}
               onClick={bottle.onClick}
               onPourComplete={bottle.onPourComplete}
               onPouringStart={bottle.onPouringStart}
               onRegister={bottle.onRegister}
               customTranslation={bottle.customTranslation}
               forceGreyedOut={bottle.forceGreyedOut}
            />
         ));
      }

      // Legacy Render
      return BOTTLE_SLOTS.map((_, index) => (
         <ReagentBottle
            key={index}
            substance={getLegacySubstanceForSlot(index)}
            state={getLegacyBottleState(index)}
            onClick={() => handleLegacyBottleClick(index)}
            onPourComplete={() => handleLegacyPourComplete(index)}
         />
      ));
   };

   return (
      <div className={`flex gap-2 items-end ${className}`}>
         {renderBottles()}
      </div>
   );
}

export default ReagentBottles;
