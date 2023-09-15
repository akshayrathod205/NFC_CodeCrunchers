const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
    },
    amount: {
      type: Number,
      required: [true, "Please provide an amount"],
    },
    date: {
      type: Date,
      required: [true, "Please provide a date"],
    },
  },
  { _id: false }
);

const budgetSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
    },
    amount: {
      type: Number,
      required: [true, "Please provide an amount"],
    },
    description: {
      type: String,
      required: [true, "Please provide a description"],
    },
    expense: [expenseSchema],
  },
  { timestamps: true }
);

const Budget = mongoose.model("Budget", budgetSchema);
module.exports = Budget;
