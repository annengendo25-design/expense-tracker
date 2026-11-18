const tracker = new ExpenseTracker();

const expenseForm = document.getElementById("expense-form");
const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const categoryInput = document.getElementById("category");
const dateInput = document.getElementById("expense-date");

const dailyTotal = document.getElementById("daily-total");
const expenseCount = document.getElementById("expense-count");
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
    const todayExpenses = tracker.getTodayExpenses();

    dailyTotal.textContent = `KES ${tracker.getTodayTotal().toFixed(2)}`;

    expenseCount.textContent = todayExpenses.length;
}


expenseForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const description = descriptionInput.value.trim();
    const amount = Number(amountInput.value);
    const category = categoryInput.value;
    const date = dateInput.value;

    if (!description || !category || !date || !Number.isFinite(amount) || amount <= 0) {
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

    updateDashboard();

    expenseForm.reset();

    dateInput.value = getTodayDate();

    alert("Expense added successfully!");
});

updateDashboard();
