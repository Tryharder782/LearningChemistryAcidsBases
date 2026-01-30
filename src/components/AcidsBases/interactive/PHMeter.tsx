/**
 * PHMeter - Draggable pH measurement device
 * When the tip touches the liquid in the beaker, displays the current pH
 */

import { useState, useRef, useEffect, useCallback } from 'react';

interface PHMeterProps {
   /** Current pH value to display when in liquid */
   currentPH: number;
   /** Beaker bounds for collision detection */
   beakerBounds?: { x: number; y: number; width: number; height: number; liquidLevel: number };
   /** Initial position */
   initialPosition?: { x: number; y: number };
   /** Optional className */
   className?: string;
}

export function PHMeter({
   currentPH,
   beakerBounds,
   initialPosition = { x: 50, y: 100 },
   className = '',
}: PHMeterProps) {
   const [position, setPosition] = useState(initialPosition);
   const [isDragging, setIsDragging] = useState(false);
   const [isInLiquid, setIsInLiquid] = useState(false);
   const dragStart = useRef({
      mouseX: 0,
      mouseY: 0,
      elemX: 0,
      elemY: 0,
      clickOffsetX: 0, // Offset of click relative to element's top-left
      clickOffsetY: 0
   });
   const meterRef = useRef<HTMLDivElement>(null);

   // Check if meter tip is in liquid (uses Global Coordinates)
   const checkCollision = useCallback((globalX: number, globalY: number) => {
      if (!beakerBounds) return false;

      const tipY = globalY + 80; // Tip is at bottom of meter
      const tipX = globalX + 20; // Center of meter

      // Check if tip is within beaker liquid area
      const inBeakerX = tipX >= beakerBounds.x && tipX <= beakerBounds.x + beakerBounds.width;
      const liquidTop = beakerBounds.y + beakerBounds.height * (1 - beakerBounds.liquidLevel);
      const inLiquidY = tipY >= liquidTop && tipY <= beakerBounds.y + beakerBounds.height;

      return inBeakerX && inLiquidY;
   }, [beakerBounds]);

   // Mouse handlers
   const handleMouseDown = (e: React.MouseEvent) => {
      e.preventDefault();
      setIsDragging(true);
      const rect = meterRef.current?.getBoundingClientRect();
      if (rect) {
         dragStart.current = {
            mouseX: e.clientX,
            mouseY: e.clientY,
            elemX: position.x,
            elemY: position.y,
            clickOffsetX: e.clientX - rect.left,
            clickOffsetY: e.clientY - rect.top,
         };
      }
   };

   useEffect(() => {
      const handleMouseMove = (e: MouseEvent) => {
         if (!isDragging) return;

         // Calculate new local position (for CSS top/left)
         const deltaX = e.clientX - dragStart.current.mouseX;
         const deltaY = e.clientY - dragStart.current.mouseY;

         const newLocalX = dragStart.current.elemX + deltaX;
         const newLocalY = dragStart.current.elemY + deltaY;

         setPosition({ x: newLocalX, y: newLocalY });

         // Calculate global position (for collision detection)
         const globalX = e.clientX - dragStart.current.clickOffsetX;
         const globalY = e.clientY - dragStart.current.clickOffsetY;

         setIsInLiquid(checkCollision(globalX, globalY));
      };

      const handleMouseUp = () => {
         setIsDragging(false);
         setPosition(initialPosition);
      };

      if (isDragging) {
         window.addEventListener('mousemove', handleMouseMove);
         window.addEventListener('mouseup', handleMouseUp);
      }

      return () => {
         window.removeEventListener('mousemove', handleMouseMove);
         window.removeEventListener('mouseup', handleMouseUp);
      };
   }, [isDragging, checkCollision, initialPosition]);

   return (
      <div
         ref={meterRef}
         className={`absolute cursor-grab select-none ${isDragging ? 'cursor-grabbing' : ''} ${className}`}
         style={{
            left: position.x,
            top: position.y,
            zIndex: isDragging ? 1000 : 50,
            transition: isDragging ? 'none' : 'all 0.3s ease-out'
         }}
         onMouseDown={handleMouseDown}
      >
         {/* pH Meter Image & Text */}
         <div className="relative w-[120px] h-[120px]">
            <img
               src="/source-images/pH%20tester.svg"
               alt="pH Meter"
               className="w-full h-full object-contain pointer-events-none"
               draggable={false}
            />

            {/* Display text overlay - Adjusted to fit inside the gray box */}
            {isInLiquid && (
               <div className="absolute top-[0px] left-[60px] w-full text-center" style={{ transform: 'translateX(-50%)' }}>
                  <span className="text-[11px] font-bold text-gray-800 tracking-tight">
                     pH: {currentPH.toFixed(1)}
                  </span>
               </div>
            )}
         </div>
      </div>
   );
}

export default PHMeter;
