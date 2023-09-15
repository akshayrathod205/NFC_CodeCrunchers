const express = require("express");
const router = express.Router();
const {
  createBudget,
  getAllBudgets,
  getBudgetById,
  updateBudgetById,
  deleteBudgetById,
} = require("../controllers/budgets");
const {
  createExpense,
  getAllExpenses,
  deleteExpenseById,
} = require("../controllers/expenses");
const Authentication = require("../middlewares/Authentication");

router.route("/").get(Authentication, getAllBudgets);
router.route("/").post(Authentication, createBudget);
router.route("/:budgetId").get(Authentication, getBudgetById);
router.route("/:budgetId").patch(Authentication, updateBudgetById);
router.route("/:budgetId").delete(Authentication, deleteBudgetById);

router.route("/:budgetId/expenses").get(Authentication, getAllExpenses);
router.route("/:budgetId/expenses").post(Authentication, createExpense);
router
  .route("/:budgetId/expenses/:expenseId")
  .delete(Authentication, deleteExpenseById);

module.exports = router;
