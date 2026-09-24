// =========================================================
// PRODUCT DETAILS
// =========================================================

const mainImage = document.querySelector('.main-image');
const smallImages = document.querySelectorAll('.small-image');

const productTitle = document.querySelector('.product-title');
const productRating = document.querySelector('.product-rating span');
const productPrice = document.querySelector('.product-price');
const productDescription = document.querySelector('.product-description');

const colorOptions = document.querySelector('.color-options');
const addToCartButton = document.querySelector('.add-to-cart');


// Get product ID from URL

const params = new URLSearchParams(window.location.search);
const productId = Number(params.get('id'));


// Product variable
let product;


// Fetch products

fetch('./data/products.json')
    .then((res) => res.json())
    .then((products) => {

        product = products.find((item) => {
            return item.id === productId;
        });

        if (!product) return;


        // Main image

        mainImage.innerHTML = `
            <img
                src="${product.image}"
                alt="${product.title}"
            >
        `;


        // Small images

        smallImages.forEach((image) => {

            image.innerHTML = `
                <img
                    src="${product.image}"
                    alt="${product.title}"
                >
            `;

        });


        // Product information

        productTitle.textContent =
            product.title;

        productRating.textContent =
            product.rating;

        productPrice.textContent =
            `$${product.price}`;

        productDescription.textContent =
            `A stylish ${product.category.toLowerCase()} piece designed for everyday wear.`;


        // Color

        colorOptions.innerHTML = `
            <span
                class="color-option"
                style="background-color: ${product.color};"
                title="${product.color}"
            ></span>
        `;


        // Size

        const sizeOptions =
            document.querySelector('.size-options');

        sizeOptions.innerHTML = product.sizes
            .map((size) => {
                return `
                    <button
                        type="button"
                        class="size-option"
                    >
                        ${size}
                    </button>
                `;
            })
            .join('');


        // Size selection

        const sizeButtons =
            document.querySelectorAll('.size-option');

        sizeButtons.forEach((button) => {

            button.addEventListener('click', () => {

                sizeButtons.forEach((btn) => {
                    btn.classList.remove('active');
                });

                button.classList.add('active');

            });

        });

    })
    .catch((error) => {
        console.log(error);
    });


// =========================================================
// QUANTITY
// =========================================================

const countButtons =
    document.querySelectorAll('.count-control button');

const countValue =
    document.querySelector('.count-control span');

let quantity = 1;


countButtons.forEach((button) => {

    button.addEventListener('click', () => {

        if (button.textContent.trim() === '+') {
            quantity += 1;
        }

        if (
            button.textContent.trim() === '-' &&
            quantity > 1
        ) {
            quantity -= 1;
        }

        countValue.textContent = quantity;

    });

});


// =========================================================
// ADD TO CART
// =========================================================

addToCartButton.addEventListener('click', () => {

    // Make sure product is loaded

    if (!product) {
        return;
    }


    // Get selected size

    const selectedSize =
        document.querySelector('.size-option.active');


    if (!selectedSize) {
        alert('Please select a size.');
        return;
    }


    // Get cart

    const cart =
        JSON.parse(localStorage.getItem('cart')) || [];


    // Create product for cart

    const productInCart = {
        ...product,
        quantity: quantity,
        selectedSize: selectedSize.textContent.trim()
    };


    // Add product

    cart.push(productInCart);


    // Save cart

    localStorage.setItem(
        'cart',
        JSON.stringify(cart)
    );
    updateCartCount();

});


// =========================================================
// PRODUCT INFORMATION TABS
// =========================================================

const infoButtons =
    document.querySelectorAll('.info-buttons button');

const infoPanels =
    document.querySelectorAll('.info-panel');


infoButtons.forEach((button, index) => {

    button.addEventListener('click', () => {

        // Remove active class from all buttons

        infoButtons.forEach((btn) => {
            btn.classList.remove('active');
        });


        // Hide all panels

        infoPanels.forEach((panel) => {
            panel.classList.remove('active');
        });


        // Activate clicked button

        button.classList.add('active');


        // Show matching panel

        infoPanels[index].classList.add('active');

    });

});


// =========================================================
// CART COUNT
// =========================================================

function updateCartCount() {

    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    const cartCount = document.querySelector('.cart-count');

    if (!cartCount) return;

    const totalQuantity = cart.reduce((total, item) => {
        return total + item.quantity;
    }, 0);

    cartCount.textContent = totalQuantity;
}

updateCartCount();