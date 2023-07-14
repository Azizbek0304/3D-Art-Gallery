import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Gallery from './components/Gallery';
import About from './components/About';
import Museum from './components/Museum';
import Contact from './components/Contact';
import './app.css';

export default function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/about" element={<About />} />
          <Route path="/museum" element={<Museum />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}
