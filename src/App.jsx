import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import LandingPage from './pages/LandingPage';
import IntroPage from './pages/IntroPage';
import TestPage from './pages/TestPage';
import ResultPage from './pages/ResultPage';

const AnimatedRoutes = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<LandingPage />} />
                <Route path="/intro" element={<IntroPage />} />
                <Route path="/test" element={<TestPage />} />
                <Route path="/result" element={<ResultPage />} />
            </Routes>
        </AnimatePresence>
    );
};

const App = () => {
    return (
        <BrowserRouter>
            <div className="app-container">
                <AnimatedRoutes />
            </div>
        </BrowserRouter>
    );
};

export default App;
