import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTravel } from '../../context/TravelContext';
import './PlaceCard.css';

const PlaceCard = ({ place, viewMode }) => {
  const { dispatch } = useTravel();

  const handleToggleVisited = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch({ type: 'TOGGLE_VISITED', payload: place.id });
  };

  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete "${place.name}"?`)) {
      dispatch({ type: 'DELETE_PLACE', payload: place.id });
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      layout
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={`place-card ${viewMode} ${place.isVisited ? 'visited' : 'planned'}`}
    >
      <Link to={`/place/${place.id}`} className="place-card-link">
        <div className="place-image">
          <img 
            src={place.imageUrl || '/placeholder-image.jpg'} 
            alt={place.name}
            onError={(e) => {
              e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200"><rect width="300" height="200" fill="%23f3f4f6"/><text x="150" y="100" text-anchor="middle" fill="%23666" font-size="16">No Image</text></svg>';
            }}
          />
          <div className="place-overlay">
            <div className={`place-status ${place.isVisited ? 'visited' : 'planned'}`}>
              {place.isVisited ? '✅' : '📌'}
            </div>
            <div className={`priority-badge priority-${place.priority.toLowerCase()}`}>
              {place.priority}
            </div>
          </div>
        </div>

        <div className="place-content">
          <div className="place-header">
            <h3 className="place-name">{place.name}</h3>
            <p className="place-country">📍 {place.country}</p>
          </div>

          <p className="place-description">
            {place.description.length > 100 
              ? `${place.description.substring(0, 100)}...` 
              : place.description
            }
          </p>

          <div className="place-meta">
            <div className="place-budget">💰 ${place.estimatedBudget?.toLocaleString()}</div>
            <div className="place-type">🎯 {place.tripType}</div>
          </div>

          <div className="place-actions">
            <motion.button
              className={`action-btn toggle-visited ${place.isVisited ? 'visited' : 'planned'}`}
              onClick={handleToggleVisited}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title={place.isVisited ? 'Mark as not visited' : 'Mark as visited'}
            >
              {place.isVisited ? '✅' : '☐'}
            </motion.button>

            <motion.button
              className="action-btn delete"
              onClick={handleDelete}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title="Delete place"
            >
              🗑️
            </motion.button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default PlaceCard;
