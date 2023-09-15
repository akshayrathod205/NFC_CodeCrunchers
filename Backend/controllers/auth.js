const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.JWT_SECRET;

const userSignup = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      age,
      gender,
      phone,
      address,
      city,
      email,
      password,
    } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      const user = await User.create({
        firstName: firstName,
        lastName: lastName,
        age: age,
        gender: gender,
        phone: phone,
        address: address,
        city: city,
        email: email,
        password: hashedPassword,
      });
      res
        .status(200)
        .json({ message: "User created successfully", user: user });
    } else {
      res.status(409).json({ message: "User already exists" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const loggedInUser = await User.findOne({ email: email });
    if (loggedInUser) {
      const isMatch = await bcrypt.compare(password, loggedInUser.password);
      if (isMatch) {
        const token = jwt.sign({ userId: this._id }, secret, {
          expiresIn: "1d",
        });
        res.status(200).json({
          message: "Login successful",
          token: token,
          user: loggedInUser,
        });
      } else {
        res.status(403).json({ error: "Invalid credentials" });
      }
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { userSignup, userLogin };
