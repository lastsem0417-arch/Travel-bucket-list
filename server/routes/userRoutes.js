const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/register", async(req,res)=>{

const user = new User(req.body);

await user.save();

res.json(user);

});

router.get("/users", async(req,res)=>{

const users = await User.find();

res.json(users);

});

module.exports = router;