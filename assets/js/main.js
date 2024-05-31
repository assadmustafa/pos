let itemsData;
let totalPrice = 0;

// Fetch the JSON data
fetch('assets/data/items.json')
    .then(response => response.json())
    .then(data => {
        itemsData = data;
    })
    .catch(error => console.error('Error fetching items:', error));

// Load items of a specific category
function loadCategory(category) {
    const itemsContainer = document.getElementById('display');
    itemsContainer.innerHTML = ''; // Clear previous items

    itemsData[category].forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.textContent = `${item.name} - $${item.price}`;
        itemDiv.classList.add('elem');
        itemDiv.onclick = () => addToOrder(item);
        itemsContainer.appendChild(itemDiv);
    });
}

// Add item to the order list and update the total price
function addToOrder(item) {
    const orderValues = document.getElementById('order-values');
    const orderRow = document.createElement('div');
    orderRow.classList.add('order-values');
    const itemName = document.createElement('div');
    itemName.classList.add('order-value');
    itemName.textContent = item.name;
    const itemQuantity = document.createElement('div');
    itemQuantity.classList.add('order-value');
    itemQuantity.textContent = 1;
    const itemTax = document.createElement('div');
    itemTax.classList.add('order-value');
    itemTax.textContent = (item.price * 0.1).toFixed(2); // Assuming 10% tax
    const itemPrice = document.createElement('div');
    itemPrice.classList.add('order-value');
    itemPrice.textContent = item.price.toFixed(2);
    orderRow.appendChild(itemName);
    orderRow.appendChild(itemQuantity);
    orderRow.appendChild(itemTax);
    orderRow.appendChild(itemPrice);
    orderValues.appendChild(orderRow);
    addToTotal(item.price);
    document.getElementById('total-price').textContent = `${totalPrice.toFixed(2)} $`;
}

// Add item price to total
function addToTotal(price) {
    totalPrice += price;
    document.querySelector('.calc-typed').textContent = `€ ${totalPrice.toFixed(2)}`;
}

// Delete all order values and reset the total price
function clearOrder() {
    const orderValues = document.getElementById('order-values');
    orderValues.innerHTML = ''; // Clear all order items
    totalPrice = 0;
    document.querySelector('.calc-typed').textContent = `€ ${totalPrice.toFixed(2)}`; // Reset total price display
}

// button clear the order event listener
document.addEventListener('DOMContentLoaded', () => {
    const clearButton = document.getElementById('ce');
    clearButton.onclick = clearOrder;
});



