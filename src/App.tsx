import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import SymptomsAnalysis from './pages/SymptomsAnalysis';
import Features from './pages/Features';
import ImageUploader from './pages/ImageUploader';
import FAQ from './pages/FAQ';
import Chatbot from './pages/Chatbot';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/symptoms" element={<SymptomsAnalysis />} />
            <Route path="/features" element={<Features />} />
            <Route path="/image-analysis" element={<ImageUploader />} />
            <Route path="/chatbot" element={<Chatbot />} />
            <Route path="/faq" element={<FAQ />} />
            
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
