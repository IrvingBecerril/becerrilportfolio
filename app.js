var cart = {}; // Initialize an empty cart

var itemPrices = {
    "quesadilla": 9.99,
    "fajita": 13.99,
    "tacos": 10.99,
    "chimichanga": 10.99,
    "burrito": 10.99,
}

// Function to add an item to the cart
function addToCart(itemId) {
    var userChoice = confirm("Do you want to add " + itemId + " to cart?");

    if (userChoice) {// If the user clicked OK
        alert(itemId + " added to cart!");
        
        if (cart[itemId]) {// If the item already exists in the cart
            cart[itemId].quantity++;// Increment the quantity
        } else {// If the item does not exist in the cart
            cart[itemId] = {// Add the item to the cart
                quantity: 1,
                name: itemId,
                price: getItemPrice(itemId)
            };
        }
        console.log(cart);// Print the cart to the console

    } else {// If the user clicked Cancel
        alert("Exited without adding to cart.");
    }

    updateCartDisplay();
}

// Function to get item price
function getItemPrice(itemId) {
    if (itemPrices.hasOwnProperty(itemId)) {
        return itemPrices[itemId];
    } else {
        console.error("Item not found: " + itemId);
        return 0;
    }
}

// Function to create buttons for each item
function createItemButtons() {
    var itemsContainer = document.getElementById('itemsContainer');

    for (var itemId in itemPrices) {
        var button = document.createElement('button');
        button.innerText = itemId;
        button.onclick = function(itemId) {
            return function() {
                addToCart(itemId);
            };
        }(itemId);
        itemsContainer.appendChild(button);
    }
}

//Function to toggle the display of the cart contents
function toggleCartDisplay(){
    var cartContents = document.getElementById('cartContents');
    cartContents.style.display = cartContents.style.display === "block" ? "none" : "block";
}

//Function to update the cart contents display
function updateCartDisplay(){
    var cartContents = document.getElementById("cartContents");
    cartContents.innerHTML = "";// Clear the cart contents
    
    var isEmpty = true;
    for(var itemId in cart) {
        if(cart[itemId].quantity > 0) {
            isEmpty = false;
            var itemDisplay = document.createElement("div");
            itemDisplay.innerText = cart[itemId].name + " x " + cart[itemId].quantity;
            cartContents.appendChild(itemDisplay);
        }
    }

    if(isEmpty) {
        cartContents.innerHTML = "<div>Cart is empty</div>";
    }
}

// Call createItemButtons on window load
window.onload = createItemButtons;