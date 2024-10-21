
async function fetchProducts() {
    try {
        const response = await fetch('https://dummyjson.com/products');
        const data = await response.json();
        return data.products;
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}


function displayProducts(products) {
    const productGrid = document.getElementById('product-grid');
    productGrid.innerHTML = ''; 

    products.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('card');

        card.innerHTML = `
            <img src="${product.thumbnail}" alt="${product.title}">
            <div class="card-body">
                <h3>${product.title}</h3>
                <p>${product.description}</p>
            </div>
            <ul class="list-group">
                <li class="list-group-item">Price: $${product.price}</li>
                <li class="list-group-item">Rating: ${product.rating}</li>
                <li class="list-group-item">Discount: ${product.discountPercentage}%</li>
            </ul>
            <div class="card-links">
                <a href="#">Card Link</a>
                <a href="#">Another Link</a>
            </div>
        `;

        productGrid.appendChild(card);
    });
}


function filterProductsByCategory(products, category) {
    if (category === 'all') {
        return products;
    }
    return products.filter(product => product.category.toLowerCase() === category);
}


function searchProducts(products, searchTerm) {
    return products.filter(product => product.title.toLowerCase().includes(searchTerm.toLowerCase()));
}


async function init() {
    const products = await fetchProducts();

    
    displayProducts(products);

    
    document.querySelectorAll('.sidebar ul li').forEach(categoryItem => {
        categoryItem.addEventListener('click', function () {
            const category = this.getAttribute('data-category');
            const filteredProducts = filterProductsByCategory(products, category);
            displayProducts(filteredProducts);
        });
    });

    
    document.getElementById('searchBar').addEventListener('input', function () {
        const searchTerm = this.value;
        const searchedProducts = searchProducts(products, searchTerm);
        displayProducts(searchedProducts);
    });
}


window.onload = init;
