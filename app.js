// Variables
const cartItems = document.querySelectorAll('.add-cart');
const numItemsInCart = document.querySelector('.cart span');
let products = [{
        name: 'Headphones',
        tag: 'headphones',
        img: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1046&q=80',
        price: 100,
        inCart: 0
    },

    {
        name: 'Smartphone',
        tag: 'smartphone',
        img: 'https://images.unsplash.com/photo-1571126770247-9a99e5f7eff7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80',
        price: 500,
        inCart: 0
    },

    {
        name: 'Mouse and Keyboard',
        tag: 'mouse_keyboard',
        img: 'https://images.unsplash.com/photo-1579493593642-e98d33cc52a6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80',
        price: 150,
        inCart: 0
    },

    {
        name: 'Joystick',
        tag: 'joystick',
        img: 'https://images.unsplash.com/photo-1587843618590-dd2f6ea2ccf2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80',
        price: 65,
        inCart: 0
    }
];


// Adding event listener to cart items
for (let i = 0; i < cartItems.length; i++) {
    cartItems[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    });
}


// Check if there are items in cart on page load and print it in cart numbers
function loadNumItemsInCart() {
    let productNumbers = localStorage.getItem('cartNumbers');
    if (productNumbers) numItemsInCart.textContent = parseInt(productNumbers);
}


// Set Local Storage - no:of items in cart
function cartNumbers(item) {
    // Get info from local storage
    let productNumbers = localStorage.getItem('cartNumbers');

    // Set information in local storage
    if (productNumbers) {
        // check if item exists in storage, then add 1 when clicked
        localStorage.setItem('cartNumbers', parseInt(productNumbers) + 1);
        numItemsInCart.textContent = parseInt(productNumbers) + 1;
    } else {
        //  if item doesn't exist in local storage, then set new cart
        localStorage.setItem('cartNumbers', 1);
        numItemsInCart.textContent = 1;
    }

    setItems(item);
}


// Function - Set product item in local storage
function setItems(item) {
    let cartItems = localStorage.getItem('productsInCart');
    // convert local storage string to JSON
    cartItems = JSON.parse(cartItems);

    // if product-item exists, then increase by 1
    if (cartItems != null) {
        // if the item clicked doesn't exist in storage
        if (cartItems[products.tag] === undefined) {
            // update the cartItems object using destructruing
            cartItems = {
                ...cartItems,
                [item.tag]: item
            }
        }
        // increase the item in cart by 1 
        cartItems[item.tag].inCart += 1;
        // else create the product-item and give it 1 item in cart
    } else {
        // set inCart = 1 
        item.inCart = 1;

        // create object to store in local storage
        cartItems = {
            [item.tag]: item
        }
    }

    // saving cart item in local storage
    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
}


// Function - Calculate total cost of the cart
function totalCost(item) {
    let cartTotal = localStorage.getItem('totalCost');
    
    // Set cart total in local storage
    if (cartTotal !== null) {
        // convert cartTotal string to number
        cartTotal = parseInt(cartTotal);
        // check if cart total exists in storage, then add current item price to existing total
        localStorage.setItem('totalCost', cartTotal += item.price);

    } else {
        //  if total cost doesn't exist in local storage, then set new cart total
        localStorage.setItem('totalCost', item.price);
    }
}

// Function - display items in cart
function displayCart() {
    let cartItems = localStorage.getItem('productsInCart');
    let cartTotal = localStorage.getItem('totalCost');
    cartItems = JSON.parse(cartItems);

    // Select products container from cart page
    let productsContainer = document.querySelector('.products');

    // If there are items in cart
    if(cartItems && productsContainer) {
        // productsContainer.innerHTML = ''
        
        Object.values(cartItems).map(item => {
            productsContainer.innerHTML += `
                <div class="product">
                    <i class="material-icons">clear</i>
                    <img src="${item.img}" alt="${item.name} Image">
                    <span>${item.name}</span>
                </div>

                <div class="price">$${item.price}</div>

                <div class="quantity">
                    <i class="material-icons">navigate_before</i>
                        <span>${item.inCart}</span>
                    <i class="material-icons">navigate_next</i>
                </div>

                <div class="total">
                    $${item.inCart * item.price}
                </div>
            `;
        });

        productsContainer.innerHTML += `
            <div class="basket-total-container">
                <h4 class="basket-total-title">Basket Total</h4>
                <h4 class="basket-total">$${cartTotal}</h4>
            </div>
        `
    }
}


// Load Cart
loadNumItemsInCart();

// Displart Cart
displayCart();

// Clear Local Storage
if(document.querySelector('.clear-local')){
    document.querySelector('.clear-local').addEventListener('click', () => {
        localStorage.clear();
        console.log('localStorage - cleared');
    });
}
