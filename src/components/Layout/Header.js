import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Header.css';

const Header = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: '🏠', label: 'Home' },
    { path: '/places', icon: '📍', label: 'Places' },
    { path: '/stats', icon: '📊', label: 'Stats' },
    { path: '/settings', icon: '⚙️', label: 'Settings' }
  ];

  return (
    <motion.header 
      className="header"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
    >
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <motion.span 
              className="logo-icon"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              🌍
            </motion.span>
            <span className="logo-text">TravelList</span>
          </Link>

          <nav className="nav">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="nav-content"
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-label">{item.label}</span>
                </motion.div>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
