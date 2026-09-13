'use strict'
const products=document.querySelector('.product-grid')

const productImages=[
    './assets/images/floral_summer_dress.jpg',
    './assets/images/classic_white_sneakers.jpg',
    './assets/images/leather_handbag.jpg',
    './assets/images/denim_jacket.jpg',
    './assets/images/watch-pic.jpg',
    './assets/images/sunglasses.jpg',
    './assets/images/casual_tshirt.jpg',
    './assets/images/running_shoes.jpg',
    './assets/images/backpack.jpg',

];



fetch('https://dummyjson.com/products')
    .then(res => res.json())
    .then(data => {

        data.products.map((e, index) => {
            console.log(e.thumbnail);
             products.innerHTML += `
        <div class="product-card">

            <div class="product-image">
                <img src="${productImages[index % productImages.length]}" alt="${e.title}">

                <button class="wishlist-btn">
                    <i class='bx bx-heart'></i>
                </button>
            </div>

            <div class="product-info">

                <p class="product-category">${e.category}</p>

                <h3>${e.title}</h3>

                <div class="product-rating">
                    <i class='bx bxs-star'></i>
                    <span>${e.rating}</span>
                </div>

                <div class="product-bottom">
                    <p class="product-price">$${e.price}</p>

                    <button class="cart-btn">
                        <i class='bx bx-shopping-bag'></i>
                    </button>
                </div>

            </div>

        </div>`
        });

    });