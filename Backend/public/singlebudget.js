const tableBody = document.getElementById("expense-list");
const urlParams = new URLSearchParams(window.location.search);
const budgetId = urlParams.get("id");
console.log(budgetId);
const submitBtn = document.getElementById("submit");
const expensesData = [];

const showExpenses = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "userLogin.html";
      return;
    }
    const headers = { Authorization: `Bearer ${token}` };
    const {
      data: { expenses },
    } = await axios.get(
      `http://localhost:3002/api/v1/budgets/${budgetId}/expenses`,
      { headers }
    );
    const {
      data: { budget },
    } = await axios.get(`http://localhost:3002/api/v1/budgets/${budgetId}`, {
      headers,
    });
    const amount = budget.amount;
    expensesData.length = 0;
    expensesData.push(...expenses);
    const totalExpenses = expensesData.reduce((acc, curr) => {
      return acc + curr.amount;
    });
    const remainingBalance = amount - totalExpenses;

    if (expensesData.length < 1) {
      tableBody.innerHTML = '<td colspan="4">No Expenses</td>';
      return;
    }

    const allExpenses = expensesData
      .map((expense) => {
        const { name, amount, date, _id: expenseId } = expense;
        const extractedDate = date.substr(0, 10);
        return `<tr>
        <td>${name}</td>
        <td>${amount}</td>
        <td>${extractedDate}</td>
        <td> <button onclick="deleteExpense('${expenseId}')">Delete</button></td>
       
    </tr>`;
      })
      .join("");

    tableBody.innerHTML = allExpenses;
  } catch (error) {
    console.log(error);
    tableBody.innerHTML = "";
  }
};

showExpenses();

submitBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const token = localStorage.getItem("token");
  const name = document.getElementById("expense-name").value;
  const amount = document.getElementById("expense-amt").value;
  const dateInput = document.getElementById("expense-date").value;
  const dateObj = new Date(dateInput);
  const date = dateObj.toISOString().split("T")[0];
  const headers = { Authorization: `Bearer ${token}` };
  try {
    await axios.post(
      `http://localhost:3002/api/v1/budgets/${budgetId}/expenses`,
      {
        name,
        amount,
        date,
      },
      { headers }
    );
    window.location.href = `singlebudget.html?id=${budgetId}`;
  } catch (error) {
    console.log(error);
  }
});

const deleteExpense = async (expenseId) => {
  try {
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };
    await axios.delete(
      `http://localhost:3002/api/v1/budgets/${budgetId}/expenses/${expenseId}`,
      { headers }
    );
    window.location.href = `singlebudget.html?id=${budgetId}`;
  } catch (error) {
    console.log(error);
  }
};
