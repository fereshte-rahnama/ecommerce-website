'use strict';

const productsGrid = document.querySelector('.product-grid');
const productCount = document.querySelector('#product-count');

const categoryInputs = document.querySelectorAll(
    '.category-filter input'
);

const allProductsLink = document.querySelector(
    '.category-filter a'
);

const priceRange = document.querySelector('#price-range');
const priceValue = document.querySelector('#price-value');

const colorInputs = document.querySelectorAll(
    '.color-filter input'
);

const sizeButtons = document.querySelectorAll(
    '.sizes button'
);

const sortSelect = document.querySelector('#sidebar-sort');

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

                        <button class="cart-btn">
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


        return (
            categoryMatch &&
            priceMatch &&
            colorMatch &&
            sizeMatch
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