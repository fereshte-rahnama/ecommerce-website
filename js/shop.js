'use strict';

const productsGrid = document.querySelector('.product-grid');
const productCount = document.querySelector('#product-count');

let allProducts = [];

fetch('./data/products.json')
    .then(res => res.json())
    .then(data => {
        allProducts = data;
        renderProducts(allProducts);
    })
    .catch(error => console.log(error));


function renderProducts(products) {

    productsGrid.innerHTML = '';

    productCount.textContent =
        `Showing 1-${products.length} of ${allProducts.length} results`;

    products.forEach((e) => {

        productsGrid.innerHTML += `
            <div class="product-card">

                <div class="product-image">
                    <img src="${e.image}" alt="${e.title}">
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

            </div>
        `;
    });
}

// category filter

const categoryInputs=document.querySelectorAll(".category-filter input");

categoryInputs.forEach((input) => {

    input.addEventListener('change', () => {

        const selectedCategories = [...categoryInputs]
            .filter((input) => input.checked)
            .map((input) => input.value);

        const filteredProducts = selectedCategories.length === 0
            ? allProducts
            : allProducts.filter((product) => {
                return selectedCategories.includes(product.category);
            });

        renderProducts(filteredProducts);
    });

});

const allProductsLink=document.querySelector('.category-filter a');

allProductsLink.addEventListener('click',(e)=>{
    e.preventDefault();
    categoryInputs.forEach((input)=>{
            input.addEventListener('change', () => {
        filterProducts();
    });
    });
    renderProducts(allProducts)
});

// price

const priceRange=document.querySelector('#price-range')
const priceValue=document.querySelector('#price-value')

priceRange.addEventListener('input', () => {

    priceValue.textContent = `$${priceRange.value}`;

    filterProducts();

});
function filterProducts() {

    const selectedCategories = [...categoryInputs]
        .filter((input) => input.checked)
        .map((input) => input.value);

    const maxPrice = Number(priceRange.value);

    const filteredProducts = allProducts.filter((product) => {

        const categoryMatch =
            selectedCategories.length === 0 ||
            selectedCategories.includes(product.category);

        const priceMatch =
            product.price <= maxPrice;

        return categoryMatch && priceMatch;
    });

    renderProducts(filteredProducts);
}