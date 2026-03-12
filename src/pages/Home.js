import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTravel } from '../context/TravelContext';
import './Home.css';

const Home = () => {

  const { places } = useTravel();

  const stats = {

    total: places.length,

    visited: places.filter(p => p.isVisited).length,

    remaining: places.filter(p => !p.isVisited).length,

    highPriority: places.filter(
      p => (p.priority || "").toLowerCase() === 'high' && !p.isVisited
    ).length

  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <div className="home">

      <motion.div 
        className="hero-section"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >

        <div className="hero-content">

          <motion.h1 className="hero-title">
            Your Travel Dreams Await ✈️
          </motion.h1>

          <motion.p className="hero-subtitle">
            Plan, track, and explore your bucket list destinations
          </motion.p>

          <div className="hero-actions">

            <Link to="/add" className="btn-primary">
              ➕ Add New Place
            </Link>

          </div>

        </div>

      </motion.div>

      <motion.div 
        className="stats-section"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >

        <div className="stats-grid">

          <motion.div className="stat-card total" variants={itemVariants}>
            <div className="stat-icon">🌍</div>
            <div className="stat-number">{stats.total}</div>
            <div className="stat-label">Total Places</div>
          </motion.div>

          <motion.div className="stat-card visited" variants={itemVariants}>
            <div className="stat-icon">✅</div>
            <div className="stat-number">{stats.visited}</div>
            <div className="stat-label">Visited</div>
          </motion.div>

          <motion.div className="stat-card remaining" variants={itemVariants}>
            <div className="stat-icon">🎯</div>
            <div className="stat-number">{stats.remaining}</div>
            <div className="stat-label">To Visit</div>
          </motion.div>

          <motion.div className="stat-card priority" variants={itemVariants}>
            <div className="stat-icon">🔥</div>
            <div className="stat-number">{stats.highPriority}</div>
            <div className="stat-label">High Priority</div>
          </motion.div>

        </div>

      </motion.div>

      <motion.div className="recent-section">

        <div className="section-header">

          <h2>Recent Places</h2>

          <Link to="/places" className="view-all-link">
            View All →
          </Link>

        </div>

        <div className="recent-places">

          {places.slice(0,3).map((place,index)=>{

            const priority = (place.priority || "").toLowerCase();

            return (

              <motion.div
                key={place._id}
                className="place-preview"
              >

                <div className="place-image">

                  <img
                    src={place.imageUrl || '/placeholder-image.jpg'}
                    alt={place.name}
                  />

                  <div className={`place-status ${place.isVisited ? 'visited' : 'planned'}`}>
                    {place.isVisited ? '✅' : '📌'}
                  </div>

                </div>

                <div className="place-info">

                  <h3>{place.name}</h3>

                  <p>{place.country}</p>

                  <div className={`priority priority-${priority}`}>
                    {place.priority || "Medium"}
                  </div>

                </div>

              </motion.div>

            );

          })}

        </div>

      </motion.div>

      <motion.div className="quick-actions">

        <Link to="/places" className="action-card">

          <div>

            <div className="action-icon">📍</div>

            <h3>View All Places</h3>

            <p>Explore your complete bucket list</p>

          </div>

        </Link>

        <Link to="/stats" className="action-card">

          <div>

            <div className="action-icon">📊</div>

            <h3>View Statistics</h3>

            <p>Track your travel progress</p>

          </div>

        </Link>

      </motion.div>

    </div>
  );
};

export default Home;