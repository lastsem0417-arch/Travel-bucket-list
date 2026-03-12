const Destination = require("../models/Destination");


// =============================
// ADD DESTINATION
// =============================
exports.addDestination = async (req, res) => {

  try {

    const { name, country } = req.body;

    // basic validation
    if (!name || !country) {
      return res.status(400).json({
        message: "Name and country are required"
      });
    }

    const newPlace = new Destination({
      ...req.body,
      user: req.user.id
    });

    const savedPlace = await newPlace.save();

    res.status(201).json(savedPlace);

  } catch (err) {

    console.error("Add destination error:", err);

    res.status(500).json({
      message: "Error adding destination"
    });

  }

};


// =============================
// GET USER DESTINATIONS
// =============================
exports.getDestinations = async (req, res) => {

  try {

    const destinations = await Destination
      .find({ user: req.user.id })
      .sort({ createdAt: -1 });

    res.status(200).json(destinations);

  } catch (err) {

    console.error("Fetch destinations error:", err);

    res.status(500).json({
      message: "Failed to fetch destinations"
    });

  }

};


// =============================
// DELETE DESTINATION
// =============================
exports.deleteDestination = async (req, res) => {

  try {

    const deleted = await Destination.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });

    if (!deleted) {
      return res.status(404).json({
        message: "Destination not found"
      });
    }

    res.status(200).json({
      message: "Destination deleted",
      id: req.params.id
    });

  } catch (err) {

    console.error("Delete error:", err);

    res.status(500).json({
      message: "Failed to delete destination"
    });

  }

};


// =============================
// TOGGLE VISITED STATUS
// =============================
exports.toggleVisited = async (req, res) => {

  try {

    const place = await Destination.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!place) {
      return res.status(404).json({
        message: "Destination not found"
      });
    }

    place.isVisited = !place.isVisited;
    place.dateVisited = place.isVisited ? new Date() : null;

    const updatedPlace = await place.save();

    res.status(200).json(updatedPlace);

  } catch (err) {

    console.error("Toggle visited error:", err);

    res.status(500).json({
      message: "Failed to update destination"
    });

  }

};