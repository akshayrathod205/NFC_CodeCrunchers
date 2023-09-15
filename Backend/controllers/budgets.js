const User = require("../models/User");
const Budget = require("../models/Budget");

const createBudget = async (req, res) => {
  try {
    const { name, amount } = req.body;
    const loggedInUerId = req.user.payload.userId;
    const loggedInUser = await User.findById(loggedInUerId);
    if (!loggedInUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    const budget = new Budget({
      name: name,
      amount: amount,
    });
    await budget.save();

    loggedInUser.budgets.push(budget);
    await loggedInUser.save();

    res
      .status(200)
      .json({ message: "Budget created successfully", budget: budget });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const getAllBudgets = async (req, res) => {
  try {
    const loggedInUserId = req.user.payload.userId;
    const loggedInUser = await User.findById(loggedInUserId);
    const budgets = loggedInUser.budgets;
    if (!budgets) {
      res.status(404).json({ message: "Budgets not found" });
    }
    res.status(200).json({ budgets: budgets });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const getBudgetById = async (req, res) => {
  try {
    const budgetId = req.params.budgetId;
    const budget = await Budget.findById(budgetId);
    if (!budget) {
      res.status(404).json({ message: "Budget not found" });
    }
    res.status(200).json({ budget: budget });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const updateBudgetById = async (req, res) => {
  try {
    const budgetId = req.params.budgetId;
    const { name, amount, expenses } = req.body;
    const budget = await Budget.findByIdAndUpdate(
      budgetId,
      {
        name: name,
        amount: amount,
        expenses: expenses,
      },
      { new: true }
    );
    if (!budget) {
      res.status(404).json({ message: "Budget not found" });
    }
    res.status(200).json({ budget: budget });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const deleteBudgetById = async (req, res) => {
  try {
    const loggedInUserId = req.user.payload.userId;
    const loggedInUser = await User.findById(loggedInUserId);
    const budgetId = req.params.budgetId;
    const budget = await Budget.findByIdAndDelete(budgetId);
    if (!budget) {
      res.status(404).json({ message: "Budget not found" });
    }
    const budgetIndex = loggedInUser.budgets.findIndex(
      (bud) => bud._id.toString() === budgetId
    );

    if (budgetIndex === -1) {
      return res.status(404).json({ message: "Expense not found" });
    }

    // Remove the expense from the array
    budget.expenses.splice(expenseIndex, 1);

    await budget.save();
    res.status(200).json({ message: "Budget deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createBudget,
  getAllBudgets,
  getBudgetById,
  updateBudgetById,
  deleteBudgetById,
};
