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
    addExpense(expenses){
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