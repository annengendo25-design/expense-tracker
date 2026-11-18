const tracker = new ExpenseTracker();

const expenseForm = document.getElementById("expense-form");
const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const categoryInput = document.getElementById("category");
const dateInput = document.getElementById("expense-date");

const dailyTotal = document.getElementById("daily-total");
const expenseCount = document.getElementById("expense-count");
const filterSelect = document.getElementById("filter-category");
const expenseList = document.getElementById("expense-list");
const listStatus = document.getElementById("expense-list-status");
const currentDate = document.getElementById("current-date");

currentDate.textContent = new Date().toLocaleDateString(
    "en-KE",
    {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    }
);

dateInput.value = getTodayDate();


function updateDashboard() {
    dailyTotal.textContent = `KES ${tracker.getTodayTotal().toFixed(2)}`;

    expenseCount.textContent = tracker.expenses.length;
}


function renderExpenses() {
    const category = filterSelect.value;
    const visible = category === "All" ? tracker.expenses : tracker.filterByCategory(category);

    const items = visible.map(({ id, description, amount, category, date }) => {
        const item = document.createElement("li");
        item.className = "expense-item flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between";

        const details = document.createElement("span");
        details.textContent = `${description} · ${category} · ${date} · KES ${amount.toFixed(2)}`;

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.textContent = "Delete";
        deleteButton.setAttribute("aria-label", `Delete ${description}`);
        deleteButton.addEventListener("click", () => {
            tracker.removeExpense(id);
            renderExpenses();
            updateDashboard();
            filterSelect.focus();
        });

        item.append(details, deleteButton);
        return item;
    });

    expenseList.replaceChildren(...items);
    listStatus.textContent = visible.length > 0 ? "" :
        tracker.expenses.length === 0 ? "No expenses yet." : "No expenses in this category.";
}

filterSelect.addEventListener("change", renderExpenses);

expenseForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const description = descriptionInput.value.trim();
    const amount = Number(amountInput.value);
    const category = categoryInput.value;
    const date = dateInput.value;

    if (!description || !category || !date || !Number.isFinite(amount) || amount < 0.01) {
        alert("Please enter valid expense details.");
        return;
    }

    const expense = new Expense(
        description,
        amount,
        category,
        date
    );

    tracker.addExpense(expense);
    if (filterSelect.value !== "All" && filterSelect.value !== category) {
        filterSelect.value = "All";
    }
    renderExpenses();

    updateDashboard();

    expenseForm.reset();

    dateInput.value = getTodayDate();

});

updateDashboard();
renderExpenses();
