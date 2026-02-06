import { useLocation, useNavigate } from 'react-router-dom';
import { ACIDS_BASES_COLORS } from '../theme/acidsBasesColors';

export const AcidsBasesNav = () => {
   const location = useLocation();
   const navigate = useNavigate();
   const path = location.pathname;

   const items = [
      { label: 'Introduction', path: '/acids/introduction' },
      { label: 'Buffers', path: '/acids/buffers' },
      { label: 'Titration', path: '/acids/titration' },
   ];

   return (
      <div className="flex items-center gap-2 bg-white rounded-lg p-1 shadow-sm border border-gray-200">
         {items.map((item) => {
            const isActive = path.startsWith(item.path);
            return (
               <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`
                     px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-200
                     ${isActive
                        ? 'text-white shadow-sm'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                     }
                  `}
                  style={{
                     backgroundColor: isActive ? ACIDS_BASES_COLORS.ui.primary : 'transparent',
                  }}
               >
                  {item.label}
               </button>
            );
         })}
      </div>
   );
};

export default AcidsBasesNav;
