import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTravel } from '../context/TravelContext';
import './Settings.css';

const Settings = () => {
  const { places, dispatch } = useTravel();
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleThemeToggle = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.body.className = newTheme;
  };

  const exportData = () => {
    const dataStr = JSON.stringify(places, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `travel-bucket-list-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const importData = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedPlaces = JSON.parse(e.target.result);
        if (Array.isArray(importedPlaces)) {
          dispatch({ type: 'LOAD_PLACES', payload: importedPlaces });
          alert('Data imported successfully!');
        } else {
          alert('Invalid file format. Please select a valid JSON file.');
        }
      } catch (error) {
        alert('Error reading file. Please make sure it\'s a valid JSON file.');
      }
    };
    reader.readAsText(file);
    event.target.value = ''; // Reset input
  };

  const clearAllData = () => {
    dispatch({ type: 'CLEAR_ALL_DATA' });
    setShowDeleteConfirm(false);
    alert('All data has been cleared.');
  };

  const stats = {
    totalPlaces: places.length,
    visitedPlaces: places.filter(p => p.isVisited).length,
    totalBudget: places.reduce((sum, p) => sum + (p.estimatedBudget || 0), 0),
    dataSize: JSON.stringify(places).length
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

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <div className="settings">
      <motion.div 
        className="settings-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="page-header"
          variants={cardVariants}
        >
          <h1>Settings ⚙️</h1>
          <p>Manage your preferences and data</p>
        </motion.div>

        <div className="settings-grid">
          <motion.div className="settings-card" variants={cardVariants}>
            <h3>🎨 Appearance</h3>
            <div className="setting-item">
              <div className="setting-info">
                <div className="setting-label">Theme</div>
                <div className="setting-description">
                  Switch between light and dark mode
                </div>
              </div>
              <motion.button
                className={`theme-toggle ${theme}`}
                onClick={handleThemeToggle}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {theme === 'light' ? '🌙' : '☀️'}
                {theme === 'light' ? 'Dark' : 'Light'}
              </motion.button>
            </div>
          </motion.div>

          <motion.div className="settings-card" variants={cardVariants}>
            <h3>📊 Data Overview</h3>
            <div className="data-stats">
              <div className="stat-row">
                <span>Total Places:</span>
                <span className="stat-value">{stats.totalPlaces}</span>
              </div>
              <div className="stat-row">
                <span>Visited Places:</span>
                <span className="stat-value">{stats.visitedPlaces}</span>
              </div>
              <div className="stat-row">
                <span>Total Budget:</span>
                <span className="stat-value">{stats.totalBudget.toLocaleString()}</span>
              </div>
              <div className="stat-row">
                <span>Data Size:</span>
                <span className="stat-value">{(stats.dataSize / 1024).toFixed(1)} KB</span>
              </div>
            </div>
          </motion.div>

          <motion.div className="settings-card" variants={cardVariants}>
            <h3>💾 Data Management</h3>
            <div className="data-actions">
              <motion.button
                className="btn-secondary"
                onClick={exportData}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={places.length === 0}
              >
                📤 Export Data
              </motion.button>
              <p className="action-description">
                Download your travel data as a JSON file for backup
              </p>

              <div className="import-section">
                <motion.label
                  className="btn-secondary import-btn"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  📥 Import Data
                  <input
                    type="file"
                    accept=".json"
                    onChange={importData}
                    style={{ display: 'none' }}
                  />
                </motion.label>
                <p className="action-description">
                  Import travel data from a JSON file
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div className="settings-card danger-zone" variants={cardVariants}>
            <h3>⚠️ Danger Zone</h3>
            <div className="danger-actions">
              <motion.button
                className="btn-danger"
                onClick={() => setShowDeleteConfirm(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={places.length === 0}
              >
                🗑️ Clear All Data
              </motion.button>
              <p className="action-description">
                Permanently delete all places from your bucket list
              </p>
            </div>
          </motion.div>

          <motion.div className="settings-card" variants={cardVariants}>
            <h3>ℹ️ About</h3>
            <div className="about-info">
              <div className="about-item">
                <strong>Travel Bucket List App</strong>
              </div>
              <div className="about-item">
                Version 1.0.0
              </div>
              <div className="about-item">
                Built with React & Framer Motion
              </div>
              <div className="about-item">
                Data stored locally in your browser
              </div>
            </div>
          </motion.div>

          <motion.div className="settings-card" variants={cardVariants}>
            <h3>💡 Tips & Tricks</h3>
            <div className="tips-list">
              <div className="tip-item">
                <span className="tip-icon">💾</span>
                <span>Export your data regularly for backup</span>
              </div>
              <div className="tip-item">
                <span className="tip-icon">🔍</span>
                <span>Use filters to find places quickly</span>
              </div>
              <div className="tip-item">
                <span className="tip-icon">📊</span>
                <span>Check statistics to track your progress</span>
              </div>
              <div className="tip-item">
                <span className="tip-icon">🎯</span>
                <span>Set priorities to plan your next trips</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <motion.div 
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            className="modal delete-modal"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <h3>⚠️ Confirm Delete</h3>
            <p>
              Are you sure you want to delete all your travel data? 
              This action cannot be undone.
            </p>
            <div className="modal-actions">
              <motion.button
                className="btn-secondary"
                onClick={() => setShowDeleteConfirm(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Cancel
              </motion.button>
              <motion.button
                className="btn-danger"
                onClick={clearAllData}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Delete All Data
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Settings;
