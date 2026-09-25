let allProducts = [];

const productGrid = document.getElementById("productGrid");
const productSearch = document.getElementById("productSearch");
const categoryFilter = document.getElementById("categoryFilter");
const productCount = document.getElementById("productCount");

const createProductCard = (product) => {
    return `
        <article class="product-card">

            <div class="product-image">
                <img
                    src="${product.image}"
                    alt="${product.name}"
                    loading="lazy"
                >
            </div>

            <div class="product-content">

                <span class="product-category">
                    ${product.category}
                </span>

                <h3>
                    ${product.name}
                </h3>

                <p>
                    ${product.description}
                </p>

                <a
                    href="product-details.html?id=${product.id}"
                    class="product-link"
                >
                    View Product →
                </a>

            </div>

        </article>
    `;
};


const renderProducts = (products) => {

    productGrid.innerHTML = "";

    productCount.textContent =
        `${products.length} products found`;

    if (products.length === 0) {

        productGrid.innerHTML = `
            <p class="products-empty">
                No products found.
            </p>
        `;

        return;
    }

    productGrid.innerHTML =
        products.map(createProductCard).join("");
};


const populateCategories = () => {

    const categories = [
        ...new Set(
            allProducts.map(
                product => product.category
            )
        )
    ];

    categoryFilter.innerHTML = `
        <option value="all">
            All Categories
        </option>
    `;

    categories.forEach(category => {

        const option =
            document.createElement("option");

        option.value = category;
        option.textContent = category;

        categoryFilter.appendChild(option);
    });
};


const filterProducts = () => {

    const searchTerm =
        productSearch.value
            .toLowerCase()
            .trim();

    const selectedCategory =
        categoryFilter.value;

    const filteredProducts =
        allProducts.filter(product => {

            const name =
                String(product.name || "")
                    .toLowerCase();

            const description =
                String(product.description || "")
                    .toLowerCase();

            const matchesSearch =
                name.includes(searchTerm) ||
                description.includes(searchTerm);

            const matchesCategory =
                selectedCategory === "all" ||
                product.category === selectedCategory;

            return (
                matchesSearch &&
                matchesCategory
            );
        });

    renderProducts(filteredProducts);
};


const loadProducts = async () => {

    productCount.textContent =
        "Loading products...";

    try {

        const result =
            await fetchProducts();

        if (!result || !Array.isArray(result.data)) {
            throw new Error(
                "Invalid product API response"
            );
        }

        allProducts = result.data;

        populateCategories();

        renderProducts(allProducts);

    } catch (error) {

        console.error(
            "Product loading failed:",
            error
        );

        productCount.textContent =
            "Unable to load products.";

        productGrid.innerHTML = `
            <p class="products-error">
                Unable to load products. Please try again.
            </p>
        `;
    }
};


productSearch.addEventListener(
    "input",
    filterProducts
);

categoryFilter.addEventListener(
    "change",
    filterProducts
);


loadProducts();