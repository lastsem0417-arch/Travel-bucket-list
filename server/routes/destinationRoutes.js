const express = require("express");
const router = express.Router();

const {
addDestination,
getDestinations,
deleteDestination,
toggleVisited
} = require("../controllers/destinationController");

const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, getDestinations);
router.post("/add", authMiddleware, addDestination);
router.delete("/:id", authMiddleware, deleteDestination);
router.put("/visit/:id", authMiddleware, toggleVisited);

module.exports = router;