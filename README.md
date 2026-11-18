# Expense Tracker

A web app for recording expenses in Kenyan shillings (KES), tracking how much you spend each day, and browsing your transaction history.

## Project Links

- [Live Expense Tracker](https://annengendo25-design.github.io/expense-tracker/)
- [GitHub Repository](https://github.com/annengendo25-design/expense-tracker)

## Features

- Add an expense with a description, amount, category, and date.
- View all saved expenses or filter them by category.
- Delete an expense from the list.
- See today's spending and the total number of recorded transactions.
- Keep your expenses after refreshing the page with browser local storage.

## How to Use

1. Open the live app and fill in the **Add New Expense** form.
2. Select **Add Expense** to save the transaction.
3. In the **Expenses** section, choose a category to filter the list or select **All Categories** to see everything.
4. Select **Delete** beside a transaction to remove it.

## Technologies Used

- HTML, CSS, and Tailwind CSS for the responsive dashboard
- JavaScript classes for managing expenses
- Local Storage for saving expenses in the browser
- Jest with jsdom for testing
- GitHub Pages for hosting

## Run the Tests

With Node.js installed, open the project folder in PowerShell and run:

```powershell
npm.cmd ci
npm.cmd test
```

The six tests cover adding and deleting expenses, calculating totals, filtering by category, recovering from invalid saved data, and loading expenses saved by the original app.

## Project Files

| File | Purpose |
| --- | --- |
| `index.html` | Dashboard, expense form, and transaction list |
| `style.css` | Dashboard styling |
| `expenseTracker.js` | Expense classes and local storage logic |
| `script.js` | Form handling, filtering, and rendering |
| `expenseTracker.test.js` | Jest tests |

## Author

Ann Ng'endo