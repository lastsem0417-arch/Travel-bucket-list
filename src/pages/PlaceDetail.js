import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTravel } from '../context/TravelContext';
import './PlaceDetail.css';

const PlaceDetail = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  const { places, deletePlace, toggleVisited } = useTravel();

  const place = places.find(p => p._id === id);

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

    toggleVisited(place._id);

  };

  const handleDelete = () => {

    if (window.confirm(`Are you sure you want to delete "${place.name}"?`)) {

      deletePlace(place._id);

      navigate('/places');

    }
  };

  return (
    <div className="place-detail">

      <motion.div 
        className="place-detail-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >

        <div className="back-navigation">

          <button onClick={() => navigate(-1)} className="back-btn">
            ← Back
          </button>

        </div>

        <div className="place-hero">

          <img 
            src={place.imageUrl || '/placeholder-image.jpg'} 
            alt={place.name}
            className="place-hero-image"
          />

        </div>

        <div className="place-content">

          <div className="place-header">

            <h1 className="place-title">{place.name}</h1>

            <p className="place-location">
              📍 {place.country}
            </p>

          </div>

          <div className="place-actions">

            <button
              className={`action-btn primary ${place.isVisited ? 'visited' : 'planned'}`}
              onClick={handleToggleVisited}
            >

              {place.isVisited
                ? '✅ Mark as Not Visited'
                : '☐ Mark as Visited'}

            </button>

            <button
              className="action-btn secondary"
              onClick={handleDelete}
            >

              🗑️ Delete

            </button>

          </div>

          <div className="place-details-grid">

            <div className="detail-card">

              <h3>📝 Description</h3>

              <p>{place.description}</p>

            </div>

          </div>

        </div>

      </motion.div>

    </div>
  );
};

export default PlaceDetail;