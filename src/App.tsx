import './App.css';
import HomePage from './pages/home';
import AboutPage from './pages/about';
import { Route, Routes } from 'react-router-dom';
import { routes } from './constants';
import CommonLayout from './layout/CommonLayout';
import './App.css'
import PageError from './pages/404page';
import ReactionZero from './pages/ReactionRates/zero';
import ReactionZeroQuiz from './pages/ReactionRates/zeroQuiz';
import ReactionFirst from './pages/ReactionRates/first';
import ReactionFirstQuiz from './pages/ReactionRates/firstQuiz';
import ReactionSecond from './pages/ReactionRates/second';
import ReactionSecondQuiz from './pages/ReactionRates/secondQuiz';
import ReactionComparison from './pages/ReactionRates/comparison';
import ReactionComparisonQuiz from './pages/ReactionRates/comparisonQuiz';
import ReactionKinetics from './pages/ReactionRates/kinetics';
import ReactionKineticsQuiz from './pages/ReactionRates/kineticsQuiz';
import ReactionZeroReview from './pages/ReactionRates/zeroReview';
import ReactionFirstReview from './pages/ReactionRates/firstReview';
import ReactionSecondReview from './pages/ReactionRates/secondReview';
import ReactionKineticsReview from './pages/ReactionRates/kineticsReview';
import { GuidedIntroScreen as AcidsIntroduction } from './pages/AcidsBases/intro/GuidedIntroScreen';
import { BufferScreen as AcidsBuffers } from './pages/AcidsBases/buffers/BufferScreen';
import { TitrationScreen as AcidsTitration } from './pages/AcidsBases/titration/TitrationScreen';
import AcidsIntroQuiz from './pages/AcidsBases/introQuiz';
import AcidsBuffersQuiz from './pages/AcidsBases/buffersQuiz';
import AcidsTitrationQuiz from './pages/AcidsBases/titrationQuiz';

function App() {
  return (
    <Routes>
      {/* AcidsBases pages - render WITHOUT CommonLayout (they have their own full-screen layout) */}
      <Route path={routes.introduction.path} element={<AcidsIntroduction />} />
      <Route path={routes.buffers.path} element={<AcidsBuffers />} />
      <Route path={routes.titration.path} element={<AcidsTitration />} />
      <Route path="/acids/introduction/quiz" element={<AcidsIntroQuiz />} />
      <Route path="/acids/buffers/quiz" element={<AcidsBuffersQuiz />} />
      <Route path="/acids/titration/quiz" element={<AcidsTitrationQuiz />} />

      {/* ReactionRates pages - render WITH CommonLayout */}
      <Route path="/*" element={
        <CommonLayout>
          <Routes>
            <Route path={routes.zero.path} index element={<ReactionZero />} />
            <Route path={routes.zeroQuiz.path} index element={<ReactionZeroQuiz />} />
            <Route path={routes.zeroReview.path} index element={<ReactionZeroReview />} />
            <Route path={routes.first.path} element={<ReactionFirst />} />
            <Route path={routes.firstQuiz.path} element={<ReactionFirstQuiz />} />
            <Route path={routes.firstReview.path} index element={<ReactionFirstReview />} />
            <Route path={routes.second.path} element={<ReactionSecond />} />
            <Route path={routes.secondQuiz.path} element={<ReactionSecondQuiz />} />
            <Route path={routes.secondReview.path} index element={<ReactionSecondReview />} />
            <Route path={routes.comparison.path} element={<ReactionComparison />} />
            <Route path={routes.comparisonQuiz.path} element={<ReactionComparisonQuiz />} />
            <Route path={routes.kinetics.path} element={<ReactionKinetics />} />
            <Route path={routes.kineticsQuiz.path} element={<ReactionKineticsQuiz />} />
            <Route path={routes.kineticsReview.path} element={<ReactionKineticsReview />} />
            <Route path='about' element={<AboutPage />} />
            <Route path='nopage' element={<PageError />} />
            <Route path='*' element={<PageError />} />
          </Routes>
        </CommonLayout>
      } />
    </Routes>
  );
}

export default App;
