class Expense{
    constructor(description,amount,category,date){
        this.id=Date.now();
        this.description=description;
        this.amount=Number(amount);
        this.category=category;
        this.date=date;
    }
}

class ExpenseTracker{
    constructor(){
        this.expenses=this.loadExpenses();
    }
    addExpense(expense){
        this.expenses=[...this.expenses,expense];
        this.saveExpenses();
    }
    addExpenses(...newExpenses){
        this.expenses=[...this.expenses,...newExpenses];
        this.saveExpenses();
    }
    removeExpense(id){
        this.expenses=this.expenses.filter(
            expense=> expense.id !==id
        );
        this.saveExpenses();
    }
    filterByCategory(category){
        return this.expenses.filter(
            expense=> expense.category === category
        );
    }
    getTotalExpenses(){
        return this.expenses.reduce(
            (total,expense) => total + expense.amount, 0
        );
    }
    getTodayExpenses(){
        const today = getTodayDate();
        return this.expenses.filter(
            expense => expense.date === today
        );
    }
    getTodayTotal(){
        return this.getTodayExpenses().reduce(
            (total,expense) => total + expense.amount,0
        );
    }
    saveExpenses(){
        const expenses=this.expenses.map(
            ({id,description,amount,category,date})=>
            ({id,description,amount,category,date})
        );
        localStorage.setItem("expenses",JSON.stringify(expenses));
    }
    loadExpenses(){
        const saveExpenses=JSON.parse(localStorage.getItem("expenses"))||[];
        return saveExpenses.map(({id,description,amount,category,date})=>{
            const expense=new Expense(
                description,
                amount,
                category,
                date
            );
            expense.id=id;
            return expense;
        });
    }
} 

const tracker = new ExpenseTracker();

const expenseForm = document.getElementById("expense-form");
const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const categoryInput = document.getElementById("category");
const dateInput = document.getElementById("expense-date");

const dailyTotal = document.getElementById("daily-total");
const expenseCount = document.getElementById("expense-count");
const currentDate = document.getElementById("current-date");

function getTodayDate() {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

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
