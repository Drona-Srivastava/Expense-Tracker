const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");
const category = document.getElementById("category");
const description = document.getElementById("description");
const date = document.getElementById("datepicker");
const popupContent = document.getElementById('popupContent');
const popupClose = document.getElementById('popupClose');

//Datepicker
$( function() {
  $( "#datepicker" ).datepicker();
} );

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));
  
let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];
 
//Add Transaction
function addTransaction(e){
  e.preventDefault();
  if(text.value.trim() === '' || 
  amount.value.trim() === '' || 
  description.value.trim() === '' || 
  category.value.trim() === '' || 
  date.value.trim() === ''){
    alert('Please fill all the fields')
  }
  else{
    const transaction = {
      id:generateID(),
      text:text.value,
      amount:+amount.value,
      description:description.value,
      category:category.value,
      date:date.value  
    }
    transactions.push(transaction);
  
    addTransactionDOM(transaction);
    updateValues();
    updateLocalStorage();
    text.value='';
    amount.value='';
    description.value='';
    date.value='';
    category.value='';
  }
}
  

//Generate Random ID
function generateID(){
  return Math.floor(Math.random()*1000000000);
}
  
//Add Trasactions to DOM list
function addTransactionDOM(transaction) {
  //GET sign
  const sign = transaction.amount < 0 ? "-" : "+";
  const item = document.createElement("li");
  //Add Class Based on Value
  item.classList.add(
    transaction.amount < 0 ? "minus" : "plus"
  );
  
  item.innerHTML =`${transaction.text} <span>${transaction.date}</span> <span>${sign}${Math.abs(transaction.amount)}</span><span>${transaction.category}</span>
  <span>${transaction.description}</span>
  <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>`;

  list.appendChild(item);
}

//Update the balance income and expence
function updateValues() {
  const amounts = transactions.map(
    (transaction) => transaction.amount
  );
  const total = amounts
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
  const expense =
    (amounts
      .filter((item) => item < 0)
      .reduce((acc, item) => (acc += item), 0) *-1).toFixed(2);
  
    balance.innerText=`₹ ${total}`;
    money_plus.innerText = `₹ ${income}`;
    money_minus.innerText = `₹ ${expense}`;
}
  
//Remove Transaction by ID
function removeTransaction(id){
  transactions = transactions.filter(transaction => transaction.id !== id);
  updateLocalStorage();
  Init();
}

//update Local Storage Transaction
function updateLocalStorage(){
  localStorage.setItem('transactions',JSON.stringify(transactions));
}

//Init App
function Init() {
  list.innerHTML = `
  <li>
    Text 
    <span>Date</span> 
    <span>Amount</span>
    <span>Category</span>
    <span>Description</span>
  </li>`;
  transactions.forEach(addTransactionDOM);
  updateValues();
}
  
Init();
  
form.addEventListener('submit',addTransaction);