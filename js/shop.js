'use strict';

const productsGrid = document.querySelector('.product-grid');
const productCount = document.querySelector('#product-count');
const cartCount = document.querySelector('.cart-count');
const categoryInputs = document.querySelectorAll('.category-filter input');
const allProductsLink = document.querySelector('.category-filter a');
const priceRange = document.querySelector('#price-range');
const priceValue = document.querySelector('#price-value');
const colorInputs = document.querySelectorAll('.color-filter input');
const sizeButtons = document.querySelectorAll('.sizes button');
const sortSelect = document.querySelector('#sidebar-sort');
const searchInput=document.querySelector('.search-icon input');

let allProducts = [];


// =========================
// Fetch Products
// =========================

fetch('./data/products.json')
    .then((res) => res.json())
    .then((data) => {
        allProducts = data;
        renderProducts(allProducts);
    })
    .catch((error) => console.log(error));


// =========================
// Render Products
// =========================

function renderProducts(products) {

    productsGrid.innerHTML = '';

    productCount.textContent =
        `Showing 1-${products.length} of ${allProducts.length} results`;

    products.forEach((product) => {

        productsGrid.innerHTML += `
            <div class="product-card">

                <div class="product-image">
                    <img 
                        src="${product.image}" 
                        alt="${product.title}"
                    >
                </div>

                <div class="product-info">

                    <p class="product-category">
                        ${product.category}
                    </p>

                    <h3>${product.title}</h3>

                    <div class="product-rating">
                        <i class='bx bxs-star'></i>
                        <span>${product.rating}</span>
                    </div>

                    <div class="product-bottom">

                        <p class="product-price">
                            $${product.price}
                        </p>

                        <button class="cart-btn" data-id="${product.id}">
                            <i class='bx bx-shopping-bag'></i>
                        </button>

                    </div>

                </div>

            </div>
        `;
    });
}


// =========================
// Filter Products
// =========================

function filterProducts() {

    // Category
    const selectedCategories = [...categoryInputs]
        .filter((input) => input.checked)
        .map((input) => input.value);


    // Price
    const maxPrice = Number(priceRange.value);


    // Color
    const selectedColor = document.querySelector(
        '.color-filter input:checked'
    )?.value;


    // Size
    const selectedSizes = [...sizeButtons]
        .filter((button) => button.classList.contains('active'))
        .map((button) => button.textContent.trim());
    //search
    const searchText=searchInput.value.toLowerCase().trim();

    // Filter
    const filteredProducts = allProducts.filter((product) => {

        const categoryMatch =
            selectedCategories.length === 0 ||
            selectedCategories.includes(product.category);


        const priceMatch =
            product.price <= maxPrice;


        const colorMatch =
            !selectedColor ||
            product.color === selectedColor;


        const sizeMatch =
            selectedSizes.length === 0 ||
            selectedSizes.some((size) =>
                product.sizes.includes(size)
            );

        const searchMatch= product.title.toLowerCase().includes(searchText);


        return (
            categoryMatch &&
            priceMatch &&
            colorMatch &&
            sizeMatch &&
            searchMatch
        );
    });


    // =========================
    // Sort
    // =========================

    const sortValue = sortSelect.value;

    if (sortValue === 'featured') {
    filteredProducts.sort((a, b) => {
        return Number(b.featured) - Number(a.featured);
    });
}

if (sortValue === 'newest') {
    filteredProducts.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
    });
}

if (sortValue === 'best-selling') {
    filteredProducts.sort((a, b) => {
        return b.sales - a.sales;
    });
}


    if (sortValue === 'price-low') {

        filteredProducts.sort((a, b) => {
            return a.price - b.price;
        });

    }


    if (sortValue === 'price-high') {

        filteredProducts.sort((a, b) => {
            return b.price - a.price;
        });

    }


    renderProducts(filteredProducts);
}


// =========================
// Category Filter
// =========================

categoryInputs.forEach((input) => {

    input.addEventListener('change', () => {

        filterProducts();

    });

});


// =========================
// All Products
// =========================
allProductsLink.addEventListener('click', (e) => {
    e.preventDefault();

    categoryInputs.forEach((input) => {
        input.checked = false;
    });

    colorInputs.forEach((input) => {
        input.checked = false;
    });

    sizeButtons.forEach((button) => {
        button.classList.remove('active');
    });

    priceRange.value = priceRange.max;
    priceValue.textContent = `$${priceRange.max}`;

    sortSelect.value = 'featured';

    filterProducts();
});


// =========================
// Price Filter
// =========================

priceRange.addEventListener('input', () => {

    priceValue.textContent =
        `$${priceRange.value}`;

    filterProducts();

});


// =========================
// Color Filter
// =========================

colorInputs.forEach((input) => {

    input.addEventListener('change', () => {

        filterProducts();

    });

});


// =========================
// Size Filter
// =========================

sizeButtons.forEach((button) => {

    button.addEventListener('click', () => {

        button.classList.toggle('active');

        filterProducts();

    });

});


// =========================
// Sort
// =========================

sortSelect.addEventListener('change', () => {

    filterProducts();

});

// cart

let cart=[];
productsGrid.addEventListener('click',(e)=>{
    const cartButton=e.target.closest('.cart-btn')
    if(!cartButton) return;

    const productId=Number(cartButton.dataset.id);
    const selectedProduct=allProducts.find((product)=>{
        return product.id === productId;
    });
    cart.push(selectedProduct);
    cartCount.textContent = cart.length;
    console.log(cart);


});

// search

searchInput.addEventListener('input',()=>{
    filterProducts();
});

// start hamburger menu
const hamburger=document.querySelector('.menu-toggle')
const navEl=document.querySelector('nav ul')

hamburger.addEventListener('click',()=>{
    navEl.classList.toggle('active')
})
// end hamburger menu

