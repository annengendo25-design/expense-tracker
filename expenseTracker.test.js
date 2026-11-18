const { Expense, ExpenseTracker } = require("./expenseTracker");

beforeEach(() => {
    localStorage.clear();
});

test("adds a single expense and a batch, and reloads them from storage", () => {
    const tracker = new ExpenseTracker();
    const lunch = new Expense("Lunch", 250, "Food", "2026-11-18");
    const fare = new Expense("Bus fare", 80, "Transport", "2026-11-18");
    const water = new Expense("Water", 30, "Food", "2026-11-18");

    tracker.addExpense(lunch);
    tracker.addExpenses(fare, water);

    expect(new ExpenseTracker().expenses).toEqual([lunch, fare, water]);
});

test("removes only the selected expense and persists the deletion", () => {
    const tracker = new ExpenseTracker();
    const lunch = new Expense("Lunch", 250, "Food", "2026-11-18");
    const fare = new Expense("Bus fare", 80, "Transport", "2026-11-18");
    tracker.addExpenses(lunch, fare);

    tracker.removeExpense(lunch.id);

    expect(new ExpenseTracker().expenses).toEqual([fare]);
});

test("calculates today's total separately from the all-time total", () => {
    jest.useFakeTimers();
    try {
        jest.setSystemTime(new Date(2026, 10, 18, 12));
        const tracker = new ExpenseTracker();
        tracker.addExpenses(
            new Expense("Lunch", 250.50, "Food", "2026-11-18"),
            new Expense("Bus fare", 80, "Transport", "2026-11-18"),
            new Expense("Shopping", 500, "Shopping", "2026-10-18")
        );

        expect(tracker.getTodayTotal()).toBe(330.50);
        expect(tracker.getTotalExpenses()).toBe(830.50);
    } finally {
        jest.useRealTimers();
    }
});

test("filters expenses by category without changing the full list", () => {
    const tracker = new ExpenseTracker();
    const lunch = new Expense("Lunch", 250, "Food", "2026-11-18");
    const fare = new Expense("Bus fare", 80, "Transport", "2026-11-18");
    tracker.addExpenses(lunch, fare);

    expect(tracker.filterByCategory("Food")).toEqual([lunch]);
    expect(tracker.filterByCategory("Bills")).toEqual([]);
    expect(tracker.expenses).toEqual([lunch, fare]);
});

test("recovers from malformed JSON and a saved value that is not an array", () => {
    for (const value of ["{broken", "{}"]) {
        localStorage.setItem("expenses", value);
        expect(new ExpenseTracker().expenses).toEqual([]);
    }
});

test("loads expenses saved by the original app with numeric IDs", () => {
    const savedExpense = {
        id: 123,
        description: "Lunch",
        amount: 250,
        category: "Food",
        date: "2026-11-18"
    };
    localStorage.setItem("expenses", JSON.stringify([savedExpense]));

    const [expense] = new ExpenseTracker().expenses;
    expect(expense).toBeInstanceOf(Expense);
    expect(expense).toMatchObject(savedExpense);
});
