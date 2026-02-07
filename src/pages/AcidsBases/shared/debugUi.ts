export const shouldShowAcidsChapterTabs = (): boolean => {
   if (typeof window === 'undefined') return false;

   const query = new URLSearchParams(window.location.search);
   if (query.get('debugChapters') === '1') return true;

   return window.localStorage.getItem('acids.showChapters') === '1';
};
