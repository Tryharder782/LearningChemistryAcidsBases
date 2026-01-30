/**
 * StatCard component - matches iOS design for data metrics.
 * Displays a label and a large value with optional color.
 */

interface StatCardProps {
   label: string;
   value: string | number;
   color?: string;
   className?: string;
}

export function StatCard({
   label,
   value,
   color = 'text-gray-900',
   className = '',
}: StatCardProps) {
   // If color doesn't start with '#', assume it's a Tailwind class
   const colorStyle = color.startsWith('#') ? { color } : {};
   const colorClass = !color.startsWith('#') ? color : '';

   return (
      <div className={`bg-white rounded-lg shadow p-4 text-center ${className}`}>
         <div className="text-xs text-gray-500 uppercase font-medium tracking-wider mb-1">
            {label}
         </div>
         <div
            className={`text-2xl font-bold ${colorClass}`}
            style={colorStyle}
         >
            {value}
         </div>
      </div>
   );
}

export default StatCard;
