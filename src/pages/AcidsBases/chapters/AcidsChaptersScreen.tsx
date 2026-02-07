import { FlaskConical, Droplets, LineChart, ChevronRight } from 'lucide-react';
import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AcidsBasesLayout from '../../../layout/AcidsBasesLayout';

type ChapterCard = {
   id: 'introduction' | 'buffers' | 'titration';
   title: string;
   subtitle: string;
   path: string;
   Icon: typeof FlaskConical;
};

const chapters: ChapterCard[] = [
   {
      id: 'introduction',
      title: 'Introduction',
      subtitle: 'Unit 1 of 3',
      path: '/acids/introduction',
      Icon: FlaskConical
   },
   {
      id: 'buffers',
      title: 'Buffers',
      subtitle: 'Unit 2 of 3',
      path: '/acids/buffers',
      Icon: Droplets
   },
   {
      id: 'titration',
      title: 'Titration',
      subtitle: 'Unit 3 of 3',
      path: '/acids/titration',
      Icon: LineChart
   }
];

const getActiveChapter = (pathname: string): ChapterCard['id'] | null => {
   if (pathname.includes('/acids/introduction')) return 'introduction';
   if (pathname.includes('/acids/buffers')) return 'buffers';
   if (pathname.includes('/acids/titration')) return 'titration';
   return null;
};

export const AcidsChaptersScreen = () => {
   const navigate = useNavigate();
   const location = useLocation();
   const activeChapter = useMemo(() => getActiveChapter(location.pathname), [location.pathname]);

   return (
      <AcidsBasesLayout>
         <div className="w-full h-full bg-white overflow-hidden">
            <div className="max-w-[920px] mx-auto px-10 py-10 h-full">
               <div className="mb-8">
                  <h1 className="text-5xl font-semibold tracking-tight text-gray-900">Acids & Bases</h1>
                  <p className="mt-2 text-lg text-gray-500">Select where you want to continue</p>
               </div>

               <div className="flex flex-col gap-5">
                  {chapters.map((chapter, index) => {
                     const isActive = activeChapter === chapter.id;
                     return (
                        <button
                           key={chapter.id}
                           type="button"
                           onClick={() => navigate(chapter.path)}
                           className={`
                              w-full bg-white rounded-3xl border px-8 py-7 text-left
                              flex items-center justify-between
                              transition-all duration-300 ease-out
                              hover:-translate-y-0.5 hover:shadow-lg hover:border-violet-200
                              ${isActive ? 'border-violet-300 shadow-md' : 'border-gray-200 shadow-sm'}
                           `}
                           style={{ animation: `fadeSlideIn 260ms ease-out ${index * 60}ms both` }}
                        >
                           <div className="flex items-center gap-6">
                              <div
                                 className={`
                                    w-16 h-16 rounded-2xl flex items-center justify-center
                                    ${isActive ? 'bg-violet-50' : 'bg-gray-50'}
                                 `}
                              >
                                 <chapter.Icon className={`w-8 h-8 ${isActive ? 'text-violet-500' : 'text-gray-500'}`} />
                              </div>
                              <div>
                                 <div className={`text-4xl font-semibold ${isActive ? 'text-violet-600' : 'text-gray-900'}`}>
                                    {chapter.title}
                                 </div>
                                 <div className="mt-1 flex items-center gap-2 text-xl text-gray-500">
                                    <span className="w-2 h-2 rounded-full bg-violet-300" />
                                    {chapter.subtitle}
                                 </div>
                              </div>
                           </div>
                           <ChevronRight className="w-8 h-8 text-gray-500" />
                        </button>
                     );
                  })}
               </div>
            </div>
         </div>
      </AcidsBasesLayout>
   );
};

export default AcidsChaptersScreen;
