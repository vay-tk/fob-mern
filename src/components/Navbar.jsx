import React, { useState, useEffect } from 'react'
import '../css/Navbar.css'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-brand">FOB Care</div>
      <div className="nav-img">
        <img src="./Assets/img-1.png" alt="FOB Care Logo"/>
      </div>
      <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
        <li><a href="#home" onClick={() => setIsMenuOpen(false)}>Home</a></li>
        <li><a href="#report" onClick={() => setIsMenuOpen(false)}>Report Issue</a></li>
        <li><a href="#suggestions" onClick={() => setIsMenuOpen(false)}>Suggestions</a></li>
      </ul>
      <button 
        className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </nav>
  )
}

export default Navbar