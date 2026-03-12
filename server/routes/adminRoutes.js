const express = require("express");
const router = express.Router();

const auth = require("../middleware/authmiddleware");

const {
getUsers,
getPlaces,
deletePlace
} = require("../controllers/adminController");

router.get("/users",auth,getUsers);

router.get("/places",auth,getPlaces);

router.delete("/place/:id",auth,deletePlace);

module.exports = router;