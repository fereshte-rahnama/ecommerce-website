'use strict';

const cartItems = document.querySelector('.cart-items');
const cartItemsCount = document.querySelector('.cart-items-count');
const cartCount = document.querySelector('.cart-count');
const clearCart = document.querySelector('.clear-cart');
const subtotal = document.querySelector('.subtotal');
const shipping = document.querySelector('.shipping');
const discount = document.querySelector('.discount');
const total = document.querySelector('.total');
const promoInput = document.querySelector('.promo-input');
const promoButton = document.querySelector('.promo-code button');
const cartActions = document.querySelector('.cart-actions');


let cart = JSON.parse(localStorage.getItem('cart')) || [];
let discountRate = 0;

cart = cart.map((product) => ({

    ...product,

    quantity: product.quantity || 1

}));


localStorage.setItem(
    'cart',
    JSON.stringify(cart)
);

// RENDER CART

function renderCart() {

    cartItemsCount.textContent =
        `${cart.length} Items`;

    cartCount.textContent =
        cart.length;

    const oldCartItems =
        cartItems.querySelectorAll('.cart-item');

    oldCartItems.forEach((item) => {

        item.remove();

    });

    let subtotalPrice = 0;

    cart.forEach((product) => {

        subtotalPrice +=
            Number(product.price) *
            product.quantity;

    });


    subtotal.textContent =
        `$${subtotalPrice.toFixed(2)}`;

    let shippingPrice = 0;

    if (
        subtotalPrice > 0 &&
        subtotalPrice < 50
    ) {

        shippingPrice = 5;
    }

    shipping.textContent =
        shippingPrice === 0
            ? 'Free'
            : `$${shippingPrice.toFixed(2)}`;

    const discountPrice =
        subtotalPrice * discountRate;


    if (discountPrice > 0) {

        discount.textContent =
            `-$${discountPrice.toFixed(2)}`;

    } else {

        discount.textContent =
            '$0.00';
    }

    const totalPrice =
        subtotalPrice +
        shippingPrice -
        discountPrice;


    total.textContent =
        `$${totalPrice.toFixed(2)}`;

    cart.forEach((product, index) => {

        cartActions.insertAdjacentHTML(
            'beforebegin',

            `
            <div
                class="cart-item"
                data-index="${index}"
            >

                <div class="cart-product">

                    <div class="cart-product-image">

                        <img
                            src="${product.image}"
                            alt="${product.title}"
                        >

                    </div>


                    <div class="cart-product-info">

                        <h3>
                            ${product.title}
                        </h3>

                        <p>
                            ${product.category}
                        </p>

                        <span>
                            Color: ${product.color}
                        </span>

                        <span>
                            Size: ${product.sizes[0]}
                        </span>

                    </div>

                </div>


                <div class="cart-item-price">

                    $${Number(product.price).toFixed(2)}

                </div>


                <div class="cart-quantity">

                    <button type="button">
                        −
                    </button>

                    <span>
                        ${product.quantity}
                    </span>

                    <button type="button">
                        +
                    </button>

                </div>


                <div class="cart-item-total">

                    $${(
                        Number(product.price) *
                        product.quantity
                    ).toFixed(2)}

                </div>


                <button
                    class="remove-item"
                    type="button"
                >

                    <i class="bx bx-trash"></i>

                </button>

            </div>
            `
        );

    });

}
renderCart();

cartItems.addEventListener(
    'click',
    (e) => {

        const cartItem =
            e.target.closest('.cart-item');

        if (!cartItem) return;


        const itemIndex =
            Number(cartItem.dataset.index);

        const removeButton =
            e.target.closest('.remove-item');


        if (removeButton) {

            cart.splice(
                itemIndex,
                1
            );


            localStorage.setItem(
                'cart',
                JSON.stringify(cart)
            );

            renderCart();

            return;

        }

        const button =
            e.target.closest(
                '.cart-quantity button'
            );


        if (!button) return;

        if (
            button.textContent.trim() === '+'
        ) {

            cart[itemIndex].quantity += 1;

        }

        else if (
            button.textContent.trim() === '−'
        ) {

            if (
                cart[itemIndex].quantity > 1
            ) {

                cart[itemIndex].quantity -= 1;

            }

        }

        localStorage.setItem(
            'cart',
            JSON.stringify(cart)
        );

        renderCart();

    }
);

clearCart.addEventListener(
    'click',
    () => {

        cart.length = 0;

        discountRate = 0;

        promoInput.value = '';

        localStorage.setItem(
            'cart',
            JSON.stringify(cart)
        );

        renderCart();
    }
);


promoButton.addEventListener(
    'click',
    () => {

        const code =
            promoInput.value
                .trim()
                .toUpperCase();

        if (code === 'VELORA10') {

            discountRate = 0.10;

        }

        else {

            discountRate = 0;

        }
        renderCart();
    }
);