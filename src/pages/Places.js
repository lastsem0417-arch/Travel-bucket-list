import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTravel } from '../context/TravelContext';
import PlaceCard from '../components/PlaceCard/PlaceCard';
import './Places.css';

const Places = () => {
  const { places, filters, dispatch, viewMode } = useTravel();
  const [showFilters, setShowFilters] = useState(false);

  const filteredPlaces = useMemo(() => {
    return places.filter(place => {
      const matchesSearch = place.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                           place.country.toLowerCase().includes(filters.search.toLowerCase());
      const matchesStatus = filters.status === 'all' || 
                           (filters.status === 'visited' && place.isVisited) ||
                           (filters.status === 'notVisited' && !place.isVisited);
      const matchesPriority = filters.priority === 'all' || 
                             place.priority.toLowerCase() === filters.priority;
      const matchesTripType = filters.tripType === 'all' || 
                             place.tripType === filters.tripType;

      return matchesSearch && matchesStatus && matchesPriority && matchesTripType;
    });
  }, [places, filters]);

  const handleFilterChange = (key, value) => {
    dispatch({ type: 'SET_FILTERS', payload: { [key]: value } });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="places">
      <motion.div 
        className="places-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="header-top">
          <h1>My Places ({filteredPlaces.length})</h1>
          <div className="header-actions">
            <motion.button
              className="btn-secondary"
              onClick={() => setShowFilters(!showFilters)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              🔍 Filters
            </motion.button>

            <div className="view-toggle">
              <motion.button
                className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => dispatch({ type: 'SET_VIEW_MODE', payload: 'grid' })}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                ⊞
              </motion.button>
              <motion.button
                className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => dispatch({ type: 'SET_VIEW_MODE', payload: 'list' })}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                ☰
              </motion.button>
            </div>

            <Link to="/add" className="btn-primary">
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                ➕ Add Place
              </motion.span>
            </Link>
          </div>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div 
              className="filters-panel"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="filters-grid">
                <div className="filter-group">
                  <label>Search</label>
                  <input
                    type="text"
                    placeholder="Search places or countries..."
                    value={filters.search}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                  />
                </div>

                <div className="filter-group">
                  <label>Status</label>
                  <select 
                    value={filters.status} 
                    onChange={(e) => handleFilterChange('status', e.target.value)}
                  >
                    <option value="all">All Places</option>
                    <option value="visited">Visited</option>
                    <option value="notVisited">Not Visited</option>
                  </select>
                </div>

                <div className="filter-group">
                  <label>Priority</label>
                  <select 
                    value={filters.priority} 
                    onChange={(e) => handleFilterChange('priority', e.target.value)}
                  >
                    <option value="all">All Priorities</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>

                <div className="filter-group">
                  <label>Trip Type</label>
                  <select 
                    value={filters.tripType} 
                    onChange={(e) => handleFilterChange('tripType', e.target.value)}
                  >
                    <option value="all">All Types</option>
                    <option value="Adventure">Adventure</option>
                    <option value="Relaxation">Relaxation</option>
                    <option value="Cultural">Cultural</option>
                    <option value="Food & Cuisine">Food & Cuisine</option>
                    <option value="Nature & Wildlife">Nature & Wildlife</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div 
        className={`places-grid ${viewMode}`}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence>
          {filteredPlaces.length > 0 ? (
            filteredPlaces.map((place) => (
              <PlaceCard key={place.id} place={place} viewMode={viewMode} />
            ))
          ) : (
            <motion.div 
              className="empty-state"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="empty-icon">🌍</div>
              <h3>No places found</h3>
              <p>Try adjusting your filters or add a new place to get started!</p>
              <Link to="/add" className="btn-primary">
                Add Your First Place
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Places;
