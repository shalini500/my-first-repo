import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import AccessibilityAnalyser from './components/AccessibilityAnalyser';

function App() {
  return (
    <div className='app-container'>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/analyser"
element={<AccessibilityAnalyser />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
