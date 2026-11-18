class Expense{
    constructor(description, amount, category, date, id = globalThis.crypto.randomUUID()) {
        this.id = id;
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
        try {
            const savedExpenses = JSON.parse(localStorage.getItem("expenses"));
            if (!Array.isArray(savedExpenses)) return [];

            return savedExpenses
                .filter(expense => expense && (
                    typeof expense.id === "string" || Number.isFinite(expense.id)
                ) && typeof expense.description === "string" &&
                    typeof expense.category === "string" &&
                    typeof expense.date === "string" &&
                    Number.isFinite(expense.amount) && expense.amount > 0)
                .map(({ id, description, amount, category, date }) =>
                    new Expense(description, amount, category, date, id)
                );
        } catch {
            return [];
        }
    }
}

function getTodayDate() {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

if (typeof module !== "undefined") module.exports = { Expense, ExpenseTracker };
