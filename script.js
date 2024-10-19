let expenses = [];
let totalAmount = 0;
let editIndex = -1;

const categorySelect = document.getElementById('category-select');
const amountInput = document.getElementById('amount-input');
const dateInput = document.getElementById('date-input');
const addBtn = document.getElementById('add-btn');
const expenseTableBody = document.getElementById('expense-table-body');
const totalAmountCell = document.getElementById('total-amount');

// Load expenses from local storage
function loadExpenses() {
    const storedExpenses = localStorage.getItem('expenses');
    if (storedExpenses) {
        expenses = JSON.parse(storedExpenses);
        updateTable();
    }
}

// Save expenses to local storage
function saveExpenses() {
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

// Update the table after changes
function updateTable() {
    expenseTableBody.innerHTML = '';
    totalAmount = 0;

    expenses.forEach((expense, index) => {
        totalAmount += expense.amount;

        const newRow = expenseTableBody.insertRow();
        const categoryCell = newRow.insertCell();
        const amountCell = newRow.insertCell();
        const dateCell = newRow.insertCell();
        const actionsCell = newRow.insertCell();

        categoryCell.textContent = expense.category;
        amountCell.textContent = expense.amount;
        dateCell.textContent = expense.date;

        // Create Delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', function () {
            expenses.splice(index, 1);
            saveExpenses(); // Save after deletion
            updateTable();
        });

        // Create Edit button
        const editBtn = document.createElement('button');
        editBtn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
        editBtn.classList.add('edit-btn');
        editBtn.addEventListener('click', function () {
            categorySelect.value = expense.category;
            amountInput.value = expense.amount;
            dateInput.value = expense.date;

            editIndex = index;
            addBtn.innerHTML = 'Update Expense';
        });

        actionsCell.appendChild(editBtn);
        actionsCell.appendChild(deleteBtn);
    });

    totalAmountCell.textContent = totalAmount;
    saveExpenses(); // Save after updating the table
}

// Event listener for the Add/Update button
addBtn.addEventListener('click', function () {
    const category = categorySelect.value;
    const amount = Number(amountInput.value);
    const date = dateInput.value;

    if (category === '' || isNaN(amount) || amount <= 0 || date === '') {
        alert('Please fill all fields with valid data');
        return;
    }

    if (editIndex !== -1) {
        expenses[editIndex] = { category, amount, date };
        editIndex = -1;
        addBtn.innerHTML = 'Add Expense';
    } else {
        expenses.push({ category, amount, date });
    }

    categorySelect.value = '';
    amountInput.value = '';
    dateInput.value = '';

    updateTable();
});

// Call loadExpenses when the page loads
loadExpenses();


