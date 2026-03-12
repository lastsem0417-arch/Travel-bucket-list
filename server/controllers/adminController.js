const User = require("../models/User");
const Destination = require("../models/Destination");

// GET ALL USERS
exports.getUsers = async (req,res)=>{

try{

const users = await User.find().select("-password");

res.json(users);

}catch(err){

res.status(500).json({message:err.message});

}

};


// GET ALL PLACES WITH USER INFO
exports.getPlaces = async (req,res)=>{

try{

const places = await Destination.find()
.populate("user","name email")
.sort({createdAt:-1});

res.json(places);

}catch(err){

res.status(500).json({message:err.message});

}

};


// DELETE PLACE
exports.deletePlace = async (req,res)=>{

try{

await Destination.findByIdAndDelete(req.params.id);

res.json({message:"Place deleted"});

}catch(err){

res.status(500).json({message:err.message});

}

};