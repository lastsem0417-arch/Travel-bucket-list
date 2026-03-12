const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {

try {

console.log("BODY:", req.body);

const { name, email, password } = req.body;

if (!name || !email || !password) {
return res.status(400).json({ message: "All fields required" });
}

const userExists = await User.findOne({ email });

if (userExists) {
return res.status(400).json({ message: "User already exists" });
}

const hashedPassword = await bcrypt.hash(password, 10);

const user = await User.create({
name,
email,
password: hashedPassword
});

res.status(201).json({
message: "User registered successfully"
});

} catch (err) {

console.log(err);

res.status(500).json({ message: "Server error" });

}

};

exports.login = async (req, res) => {

try {

const { email, password } = req.body;

const user = await User.findOne({ email });

if (!user) {
return res.status(400).json({ message: "Invalid email" });
}

const match = await bcrypt.compare(password, user.password);

if (!match) {
return res.status(400).json({ message: "Invalid password" });
}

const token = jwt.sign(
{ id: user._id },
process.env.JWT_SECRET,
{ expiresIn: "7d" }
);

res.json({
token,
user
});

} catch (err) {

res.status(500).json({ message: "Login error" });

}

};