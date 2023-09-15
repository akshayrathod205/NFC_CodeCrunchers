const User = require("../models/User");
const Budget = require("../models/Budget");

const createExpense = async (req, res) => {
  try {
    const { name, amount, date } = req.body;
    const budgetId = req.params.budgetId;
    const budget = await Budget.findById(budgetId);
    if (!budget) {
      res.status(404).json({ message: "Budget not found" });
      return;
    }
    const expense = {
      name: name,
      amount: amount,
      date: date,
    };
    budget.expense.push(expense);
    await budget.save();
    res
      .status(200)
      .json({ message: "Expense created successfully", expense: expense });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const getAllExpenses = async (req, res) => {
  try {
    const budgetId = req.params.budgetId;
    const budget = await Budget.findById(budgetId);
    if (!budget) {
      res.status(404).json({ message: "Budget not found" });
    }
    const expenses = budget.expense;
    res.status(200).json({ expenses: expenses });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const getExpenseById = async (req, res) => {
  try {
    const budgetId = req.params.budgetId;
    const budget = await Budget.findById(budgetId);
    if (!budget) {
      res.status(404).json({ message: "Budget not found" });
    }
    const expenseId = req.params.expenseId;
    const expense = budget.expense.id(expenseId);
    res.status(200).json({ expense: expense });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const updateExpenseById = async (req, res) => {
  try {
    const budgetId = req.params.budgetId;
    const budget = await Budget.findById(budgetId);
    if (!budget) {
      res.status(404).json({ message: "Budget not found" });
    }
    const expenseId = req.params.expenseId;
    const expense = budget.expense.id(expenseId);
    if (!expense) {
      res.status(404).json({ message: "Expense not found" });
    }
    const { name, amount, date } = req.body;
    expense.name = name;
    expense.amount = amount;
    expense.date = date;
    await budget.save();
    res
      .status(200)
      .json({ message: "Expense updated successfully", expense: expense });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const deleteExpenseById = async (req, res) => {
  try {
    const budgetId = req.params.budgetId;
    const budget = await Budget.findById(budgetId);
    if (!budget) {
      res.status(404).json({ message: "Budget not found" });
    }
    const expenseId = req.params.expenseId;
    budget.expense.id(expenseId).remove();
    await budget.save();
    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createExpense,
  getAllExpenses,
  getExpenseById,
  updateExpenseById,
  deleteExpenseById,
};
