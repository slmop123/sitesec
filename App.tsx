
import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingBackground from './components/FloatingBackground';
import Home from './pages/Home';
import Vulnerabilities from './pages/Vulnerabilities';
import Vision from './pages/Vision';
import Scanner from './pages/Scanner';
import HTTPScanner from './pages/HTTPScanner';
import Advisor from './pages/Advisor';
import Dashboard from './pages/Dashboard';
import Auth from './pages/Auth';
import Demo from './pages/Demo';
import OSINT from './pages/OSINT';
import Pricing from './pages/Pricing';
import Checkout from './pages/Checkout';
import Contact from './pages/Contact';

const { HashRouter, Routes, Route } = ReactRouterDOM as any;
const Router = HashRouter;

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200 bg-[#0B0524] relative">
        <FloatingBackground />
        <Navbar />
        <main className="flex-grow relative z-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/vulnerabilities" element={<Vulnerabilities />} />
            <Route path="/vision" element={<Vision />} />
            <Route path="/scanner" element={<Scanner />} />
            <Route path="/http-scanner" element={<HTTPScanner />} />
            <Route path="/osint" element={<OSINT />} />
            <Route path="/advisor" element={<Advisor />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/demo" element={<Demo />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
