'use strict'

const mainImage = document.querySelector('.main-image');
const smallImages = document.querySelectorAll('.small-image');
const productTitle = document.querySelector('.product-title');
const productRating = document.querySelector('.product-rating span');
const productPrice = document.querySelector('.product-price');
const productDescription = document.querySelector('.product-description');
const colorOptions = document.querySelector('.color-options');
const addToCartButton = document.querySelector('.add-to-cart');
const params = new URLSearchParams(window.location.search);
const productId = Number(params.get('id'));
let product;

fetch('./data/products.json')
    .then((res) => res.json())
    .then((products) => {

        product = products.find((item) => {
            return item.id === productId;
        });

        if (!product) return;

        mainImage.innerHTML = `
            <img
                src="${product.image}"
                alt="${product.title}"
            >
        `;

        smallImages.forEach((image) => {

            image.innerHTML = `
                <img
                    src="${product.image}"
                    alt="${product.title}"
                >
            `;

        });

        productTitle.textContent =
            product.title;

        productRating.textContent =
            product.rating;

        productPrice.textContent =
            `$${product.price}`;

        productDescription.textContent =
            `A stylish ${product.category.toLowerCase()} piece designed for everyday wear.`;

        colorOptions.innerHTML = `
            <span
                class="color-option"
                style="background-color: ${product.color};"
                title="${product.color}"
            ></span>
        `;

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


// start add to cart

addToCartButton.addEventListener('click', () => {

    if (!product) {
        return;
    }

    const selectedSize =
        document.querySelector('.size-option.active');

    if (!selectedSize) {
        alert('Please select a size.');
        return;
    }

    const cart =
        JSON.parse(localStorage.getItem('cart')) || [];

    const productInCart = {
        ...product,
        quantity: quantity,
        selectedSize: selectedSize.textContent.trim()
    };

    cart.push(productInCart);

    localStorage.setItem(
        'cart',
        JSON.stringify(cart)
    );
    updateCartCount();

});


// start product information tab

const infoButtons =
    document.querySelectorAll('.info-buttons button');

const infoPanels =
    document.querySelectorAll('.info-panel');


infoButtons.forEach((button, index) => {

    button.addEventListener('click', () => {

        infoButtons.forEach((btn) => {
            btn.classList.remove('active');
        });

        infoPanels.forEach((panel) => {
            panel.classList.remove('active');
        });

        button.classList.add('active');

        infoPanels[index].classList.add('active');

    });

});

// start cart count

function updateCartCount() {

    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    const cartCount = document.querySelector('.cart-count');

    if (!cartCount) return;

    const totalQuantity = cart.reduce((total, item) => {
        return total + (item.quantity || 1);
    }, 0);

    cartCount.textContent = totalQuantity;
}

updateCartCount();


// start hamburger menu
const hamburger=document.querySelector('.menu-toggle')
const navEl=document.querySelector('nav ul')

hamburger.addEventListener('click',()=>{
    navEl.classList.toggle('active')
})
// end hamburger menu