import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTravel } from '../context/TravelContext';
import './PlaceDetail.css';

const PlaceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { places, dispatch } = useTravel();

  const place = places.find(p => p.id === id);

  if (!place) {
    return (
      <div className="place-detail">
        <div className="not-found">
          <h2>Place not found</h2>
          <p>The place you're looking for doesn't exist.</p>
          <Link to="/places" className="btn-primary">Back to Places</Link>
        </div>
      </div>
    );
  }

  const handleToggleVisited = () => {
    dispatch({ type: 'TOGGLE_VISITED', payload: place.id });
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${place.name}"?`)) {
      dispatch({ type: 'DELETE_PLACE', payload: place.id });
      navigate('/places');
    }
  };

  return (
    <div className="place-detail">
      <motion.div 
        className="place-detail-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="back-navigation"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <button onClick={() => navigate(-1)} className="back-btn">
            ← Back
          </button>
        </motion.div>

        <motion.div 
          className="place-hero"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="place-image-container">
            <img 
              src={place.imageUrl || '/placeholder-image.jpg'} 
              alt={place.name}
              className="place-hero-image"
              onError={(e) => {
                e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400"><rect width="800" height="400" fill="%23f3f4f6"/><text x="400" y="200" text-anchor="middle" fill="%23666" font-size="24">No Image Available</text></svg>';
              }}
            />
            <div className="place-hero-overlay">
              <div className={`status-badge ${place.isVisited ? 'visited' : 'planned'}`}>
                {place.isVisited ? '✅ Visited' : '📌 Planned'}
              </div>
              <div className={`priority-badge priority-${place.priority.toLowerCase()}`}>
                {place.priority} Priority
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="place-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="place-header">
            <div className="place-title-section">
              <h1 className="place-title">{place.name}</h1>
              <p className="place-location">📍 {place.country}</p>
              {place.dateVisited && (
                <p className="visit-date">
                  Visited on {new Date(place.dateVisited).toLocaleDateString()}
                </p>
              )}
            </div>

            <div className="place-actions">
              <motion.button
                className={`action-btn primary ${place.isVisited ? 'visited' : 'planned'}`}
                onClick={handleToggleVisited}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {place.isVisited ? '✅ Mark as Not Visited' : '☐ Mark as Visited'}
              </motion.button>

              <motion.button
                className="action-btn secondary"
                onClick={handleDelete}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                🗑️ Delete
              </motion.button>
            </div>
          </div>

          <div className="place-details-grid">
            <motion.div 
              className="detail-card"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <h3>📝 Description</h3>
              <p>{place.description}</p>
            </motion.div>

            <motion.div 
              className="detail-card"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <h3>📊 Trip Details</h3>
              <div className="trip-info">
                <div className="info-item">
                  <span className="label">Trip Type:</span>
                  <span className="value">{place.tripType}</span>
                </div>
                <div className="info-item">
                  <span className="label">Priority:</span>
                  <span className={`value priority-${place.priority.toLowerCase()}`}>
                    {place.priority}
                  </span>
                </div>
                {place.estimatedBudget > 0 && (
                  <div className="info-item">
                    <span className="label">Budget:</span>
                    <span className="value">{place.estimatedBudget.toLocaleString()}</span>
                  </div>
                )}
                {place.bestTimeToVisit && (
                  <div className="info-item">
                    <span className="label">Best Time:</span>
                    <span className="value">{place.bestTimeToVisit}</span>
                  </div>
                )}
              </div>
            </motion.div>

            {place.notes && (
              <motion.div 
                className="detail-card full-width"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}

                
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <h3>📋 Notes</h3>
                <p>{place.notes}</p>
              </motion.div>
            )}

            <motion.div 
              className="detail-card full-width"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <h3>📅 Timeline</h3>
              <div className="timeline">
                <div className="timeline-item">
                  <div className="timeline-dot added"></div>
                  <div className="timeline-content">
                    <p><strong>Added to bucket list</strong></p>
                    <p className="timeline-date">
                      {new Date(place.dateAdded).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                {place.dateVisited && (
                  <div className="timeline-item">
                    <div className="timeline-dot visited"></div>
                    <div className="timeline-content">
                      <p><strong>Visited!</strong></p>
                      <p className="timeline-date">
                        {new Date(place.dateVisited).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PlaceDetail;
