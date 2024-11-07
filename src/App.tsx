import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Courses from './components/Courses';
import Community from './components/Community';
import Hackathons from './components/Hackathons';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Courses />
      <Community />
      <Hackathons />
    </div>
  );
}

export default App;