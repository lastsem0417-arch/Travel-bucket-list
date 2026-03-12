import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTravel } from "../context/TravelContext";
import PlaceCard from "../components/PlaceCard/PlaceCard";
import "./Places.css";

const Places = () => {

  const { places = [], filters = {}, dispatch, viewMode } = useTravel();

  const [showFilters, setShowFilters] = useState(false);

  const filteredPlaces = useMemo(() => {

    const status = filters?.status || "all";
    const priorityFilter = filters?.priority || "all";
    const tripFilter = filters?.tripType || "all";
    const search = (filters?.search || "").toLowerCase();

    return (places || []).filter((place) => {

      const name = (place?.name || "").toLowerCase();
      const country = (place?.country || "").toLowerCase();
      const priority = (place?.priority || "").toLowerCase();
      const tripType = place?.tripType || "";

      const matchesSearch =
        name.includes(search) ||
        country.includes(search);

      const matchesStatus =
        status === "all" ||
        (status === "visited" && place?.isVisited) ||
        (status === "notVisited" && !place?.isVisited);

      const matchesPriority =
        priorityFilter === "all" ||
        priority === priorityFilter;

      const matchesTripType =
        tripFilter === "all" ||
        tripType === tripFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority &&
        matchesTripType
      );

    });

  }, [places, filters]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (

    <div className="places">

      <motion.div
        className="places-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >

        <div className="header-top">

          <h1>My Places ({filteredPlaces.length})</h1>

          <div className="header-actions">

            <motion.button
              className="btn-secondary"
              onClick={() => setShowFilters(!showFilters)}
            >
              🔍 Filters
            </motion.button>

            <div className="view-toggle">

              <motion.button
                className={`view-btn ${viewMode === "grid" ? "active" : ""}`}
                onClick={() =>
                  dispatch({ type: "SET_VIEW_MODE", payload: "grid" })
                }
              >
                ⊞
              </motion.button>

              <motion.button
                className={`view-btn ${viewMode === "list" ? "active" : ""}`}
                onClick={() =>
                  dispatch({ type: "SET_VIEW_MODE", payload: "list" })
                }
              >
                ☰
              </motion.button>

            </div>

            <Link to="/add" className="btn-primary">
              ➕ Add Place
            </Link>

          </div>

        </div>

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

              <PlaceCard
                key={place._id}
                place={place}
                viewMode={viewMode}
              />

            ))

          ) : (

            <motion.div className="empty-state">

              <div className="empty-icon">🌍</div>

              <h3>No places found</h3>

              <p>
                Try adjusting your filters or add a new place to get started!
              </p>

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