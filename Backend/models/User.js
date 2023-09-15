const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
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
  
});

const User = mongoose.model("User", userSchema);
module.exports = User;
