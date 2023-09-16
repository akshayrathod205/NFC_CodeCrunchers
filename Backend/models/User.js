const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.JWT_SECRET;

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please provide a first name"],
    },
    lastName: {
      type: String,
      required: [true, "Please provide a last name"],
    },
    age: {
      type: Number,
      required: [true, "Please provide an age"],
    },
    gender: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: [true, "Please provide a phone number"],
    },
    address: {
      type: String,
      required: [true, "Please provide an address"],
    },
    city: {
      type: String,
      required: [true, "Please provide a city"],
    },
    email: {
      type: String,
      required: [true, "Please provide an email address"],
      match: [
        /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
        "Please provide a valid email",
      ],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
    },
    budgets: {
      type: Array,
      default: [],
    },
    messages: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

userSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, secret, { expiresIn: "1d" });
};

const User = mongoose.model("User", userSchema);
module.exports = User;
