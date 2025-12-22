import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTravel } from '../context/TravelContext';
import toast, { Toaster } from 'react-hot-toast';
import './AddPlace.css';

const AddPlace = () => {
  const navigate = useNavigate();
  const { dispatch } = useTravel();

  const [formData, setFormData] = useState({
    name: '',
    country: '',
    city: '',
    description: '',
    bestTimeToVisit: '',
    estimatedBudget: '',
    tripType: 'Adventure',
    priority: 'Medium',
    imageUrl: '',
    notes: '',
    category: '',
    rating: '',
    coordinates: null,
    address: '',
    website: '',
    phone: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const countries = [
    "Afghanistan","Albania","Algeria","Argentina","Armenia","Australia","Austria","Azerbaijan",
    "Bahrain","Bangladesh","Belarus","Belgium","Bolivia","Brazil","Bulgaria","Cambodia",
    "Canada","Chile","China","Colombia","Croatia","Cuba","Cyprus","Czech Republic",
    "Denmark","Egypt","England","Estonia","Ethiopia","Finland","France","Georgia",
    "Germany","Ghana","Greece","Hungary","Iceland","India","Indonesia","Iran","Iraq",
    "Ireland","Israel","Italy","Japan","Jordan","Kazakhstan","Kenya","Kuwait","Latvia",
    "Lebanon","Lithuania","Luxembourg","Malaysia","Malta","Mexico","Morocco","Nepal",
    "Netherlands","New Zealand","Norway","Pakistan","Peru","Philippines","Poland",
    "Portugal","Qatar","Romania","Russia","Saudi Arabia","Scotland","Singapore",
    "Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","Sweden",
    "Switzerland","Thailand","Turkey","Ukraine","United Arab Emirates","United States",
    "Uruguay","Venezuela","Vietnam","Wales"
  ];

  const tripTypes = [
    "Adventure", "Relaxation", "Cultural", "Food & Cuisine", "Nature & Wildlife", 
    "History & Heritage", "Beach & Islands", "Mountain & Hiking", "City Break", 
    "Photography", "Spiritual", "Business"
  ];

  // Unsplash API se image fetch karne ka function
  const fetchPlaceImage = async (placeName) => {
    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(placeName)}&client_id=xTiXK2H9BFZcJ3S7HAG9HY9vFy2EbxuM7VTZ2qkXMcI`
      );
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        return data.results[0].urls.small;
      }
      return "";
    } catch (error) {
      console.error("Image fetch failed", error);
      return "";
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Place name is required';
    if (!formData.country) newErrors.country = 'Country is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (formData.estimatedBudget && (isNaN(formData.estimatedBudget) || formData.estimatedBudget < 0)) {
      newErrors.estimatedBudget = 'Budget must be a valid positive number';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    setIsSubmitting(true);
    const loadingToast = toast.loading('Adding place to your bucket list...');

    try {
      let fetchedImage = await fetchPlaceImage(formData.name);

      const newPlace = {
        ...formData,
        estimatedBudget: formData.estimatedBudget ? parseInt(formData.estimatedBudget) : 0,
        imageUrl: fetchedImage || formData.imageUrl
      };

      dispatch({ type: 'ADD_PLACE', payload: newPlace });

      toast.success(`🎉 ${formData.name} added to your bucket list!`, {
        id: loadingToast,
        duration: 4000
      });

      setTimeout(() => {
        navigate('/places');
      }, 1000);

    } catch (error) {
      toast.error('Failed to add place. Please try again.', { id: loadingToast });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#ffffff',
            color: '#1f2937',
            borderRadius: '12px',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(229, 231, 235, 0.8)'
          }
        }}
      />

      <div className="add-place">
        <motion.div 
          className="add-place-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="page-header">
            <motion.h1 initial={{ y: -20 }} animate={{ y: 0 }} transition={{ delay: 0.1, duration: 0.5 }}>
              ✈️ Add New Destination
            </motion.h1>
            <motion.p initial={{ y: -20 }} animate={{ y: 0 }} transition={{ delay: 0.2, duration: 0.5 }}>
              Discover and add amazing places to your travel bucket list
            </motion.p>
          </div>

          <motion.form 
            className="add-place-form" 
            onSubmit={handleSubmit} 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <div className="form-grid">

              {/* Place Name */}
              <motion.div className="form-group">
                <label htmlFor="name">Place Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., Santorini, Machu Picchu"
                  className={errors.name ? 'error' : ''}
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </motion.div>

              {/* Country */}
              <motion.div className="form-group">
                <label htmlFor="country">Country *</label>
                <select 
                  id="country" 
                  name="country" 
                  value={formData.country} 
                  onChange={handleInputChange} 
                  className={errors.country ? 'error' : ''}
                >
                  <option value="">Choose a country</option>
                  {countries.map(country => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
                {errors.country && <span className="error-message">{errors.country}</span>}
              </motion.div>

              {/* Description */}
              <motion.div className="form-group full-width">
                <label htmlFor="description">Description *</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Why do you want to visit this place?"
                  rows="4"
                  className={errors.description ? 'error' : ''}
                />
                {errors.description && <span className="error-message">{errors.description}</span>}
              </motion.div>

              {/* Budget (INR) */}
              <motion.div className="form-group">
                <label htmlFor="estimatedBudget">Budget (INR)</label>
                <input
                  type="number"
                  id="estimatedBudget"
                  name="estimatedBudget"
                  value={formData.estimatedBudget}
                  onChange={handleInputChange}
                  placeholder="2500"
                  min="0"
                />
              </motion.div>

              {/* Trip Type */}
              <motion.div className="form-group">
                <label htmlFor="tripType">Trip Type</label>
                <select id="tripType" name="tripType" value={formData.tripType} onChange={handleInputChange}>
                  {tripTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </motion.div>

              {/* Priority */}
              <motion.div className="form-group">
                <label htmlFor="priority">Priority</label>
                <select 
                  id="priority" 
                  name="priority" 
                  value={formData.priority} 
                  onChange={handleInputChange}
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </motion.div>

            </div>

            <motion.div className="form-actions">
              <motion.button 
                type="button" 
                className="btn-secondary" 
                onClick={() => navigate('/places')} 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
              >
                Cancel
              </motion.button>

              <motion.button
                type="submit"
                className="btn-primary"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
              >
                {isSubmitting ? 'Adding...' : '✅ Add to Bucket List'}
              </motion.button>
            </motion.div>

          </motion.form>
        </motion.div>
      </div>
    </>
  );
};

export default AddPlace;
