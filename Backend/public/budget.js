const cardContainer = document.querySelector(".card-container");
const submitBtn = document.getElementById("submit");
const budgetsData = [];

const showBudgets = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "userLogin.html";
      return;
    }
    const headers = { Authorization: `Bearer ${token}` };
    const {
      data: { budgets },
    } = await axios.get(`http://localhost:3002/api/v1/budgets/`, { headers });
    budgetsData.length = 0;
    budgetsData.push(...budgets);

    if (budgetsData.length < 1) {
      cardContainer.innerHTML = '<h5 class="empty-list">No Budgets</h5>';
      return;
    }

    const allBudgets = budgetsData
      .map((budget) => {
        const { name, amount, _id: budgetId } = budget;
        return `<div class="cards">
        <h2 class="card-title">${name}</h2>
        <h2 class="card-title">${amount}</h2>
        <a href="singlebudget.html?id=${budgetId}" class="button-link">See More</a>
      </div>`;
      })
      .join("");

    cardContainer.innerHTML = allBudgets;
  } catch (error) {
    console.log(error);
    cardContainer.innerHTML =
      '<h5 class="empty-list">There was an error, please try later....</h5>';
  }
};

showBudgets();

submitBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const token = localStorage.getItem("token");
  const name = document.getElementById("budget-name").value;
  const amount = document.getElementById("budget-amt").value;
  const headers = { Authorization: `Bearer ${token}` };
  try {
    await axios.post(
      "http://localhost:3002/api/v1/budgets/",
      {
        name,
        amount,
      },
      { headers }
    );
    window.location.href = "budget.html";
  } catch (error) {
    console.log(error);
  }
});
