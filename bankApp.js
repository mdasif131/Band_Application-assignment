/*------Step 01 ----------*/

// dashboard id initialize
const dashboard = document.querySelector('#dashboard');
//Action Buttons initialize
const addMoney = document.querySelector('#addMoney');
const WidthDrow = document.querySelector('#WidthDrow');
const transactionHistory = document.querySelector('#transactionHis');

//Add Money page show
addMoney.addEventListener('click', () => {
  showSection('add');
});
// Add Money page button
const btn1_2 = document.querySelector('#btn1_2');
btn1_2.addEventListener('click', () => {
  showSection('dashboard');
});
// withdraw Money page show
WidthDrow.addEventListener('click', () => {
  showSection('subtract');
});
//withdraw Money page button
const btn2_2 = document.querySelector('#btn2_2');
btn2_2.addEventListener('click', () => {
  showSection('dashboard');
});
// Transaction History page show
transactionHistory.addEventListener('click', () => {
  showSection('history');
});

//Transaction History page button
const btn3_2 = document.querySelector('#btn3_2');
btn3_2.addEventListener('click', () => {
  showSection('dashboard');
});

// Page show and Cancel page
function showSection(sectionId) {
  document.querySelectorAll('div[id]').forEach(div => {
    div.classList.add('hidden');
  });
  document.getElementById(sectionId).classList.remove('hidden');
}

//---step 02 -----
let currentBalance = 0;
let transactions = [];

// Display show Balance
function updateBalanceDisplay() {
  document.getElementById('balance').textContent = `$${currentBalance.toFixed(
    2
  )}`;
}
// Add Money Section: handle money
const handleAddMoney = document.querySelector('#handleAddMoney');
handleAddMoney.addEventListener('click', () => {
  const amountInput = document.getElementById('addAmount');
  const errorElement = document.getElementById('addError');
  const amount = parseFloat(amountInput.value);

  if (isNaN(amount) || amount <= 0) {
    errorElement.textContent = 'Please enter a valid positive number';
    return;
  }

  currentBalance += amount;
  addTransaction('Add', amount);
  updateBalanceDisplay();
  amountInput.value = '';
  errorElement.textContent = '';
  showSection('dashboard');
});

//Withdraw Money Section: handle withdraw
const handleWithdraw = document.querySelector('#handleWithdraw');
handleWithdraw.addEventListener('click', () => {
  const amountInput = document.getElementById('withdrawAmount');
  const errorElement = document.getElementById('withdrawError');
  const amount = parseFloat(amountInput.value);

  if (isNaN(amount) || amount <= 0) {
    errorElement.textContent = 'Please enter a valid positive number';
    return;
  }

  if (amount > currentBalance) {
    errorElement.textContent = 'Insufficient funds';
    return;
  }

  currentBalance -= amount;
  addTransaction('Withdraw', amount);
  updateBalanceDisplay();
  amountInput.value = '';
  errorElement.textContent = '';
  showSection('dashboard');
});

//transaction add and show history
function addTransaction(type, amount) {
  const transaction = {
    date: new Date().toLocaleString(),
    type: type,
    amount: amount,
    balance: currentBalance,
  };
  transactions.push(transaction);
  showTransactionHistory();
}

function showTransactionHistory() {
  const tbody = document.getElementById('transactionList');

  transactions.forEach(transaction => {
    const row = document.createElement('tr');
    row.className = 'text-sm';
    row.innerHTML = `
                    <td class="py-2">${transaction.date}</td>
                    <td class="py-2 ${
                      transaction.type === 'Add'
                        ? 'text-green-500'
                        : 'text-red-500'
                    }">
                        ${transaction.type}
                    </td>
                    <td class="py-2">$${transaction.amount.toFixed(2)}</td>
                    <td class="py-2">$${transaction.balance.toFixed(2)}</td>
                `;
    tbody.appendChild(row);
  });

  showSection('history');
}
