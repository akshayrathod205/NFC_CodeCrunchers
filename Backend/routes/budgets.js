const express = require("express");
const router = express.Router();
const {
  createBudget,
  getAllBudgets,
  getBudgetById,
  updateBudgetById,
  deleteBudgetById,
} = require("../controllers/budgets");
const Authentication = require("../middlewares/Authentication");

router.route("/").get(Authentication, getAllBudgets);
router.route("/").post(Authentication, createBudget);
router.route("/:budgetId").get(Authentication, getBudgetById);
router.route("/:budgetId").patch(Authentication, updateBudgetById);
router.route("/:budgetId").delete(Authentication, deleteBudgetById);

module.exports = router;
