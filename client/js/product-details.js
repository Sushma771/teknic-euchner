const getProductId = () => {

    const params = new URLSearchParams(
        window.location.search
    );

    return params.get("id");
};


const renderProduct = (product) => {

    const container =
        document.getElementById("productDetails");

    container.innerHTML = `
        <div class="product-details">

            <div class="product-details-image">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                >

            </div>

            <div class="product-details-content">

                <span class="product-category">
                    ${product.category}
                </span>

                <h1>
                    ${product.name}
                </h1>

                <p>
                    ${product.description}
                </p>

                <div class="product-meta">

                    <div>
                        <strong>Product ID</strong>
                        <span>${product.id}</span>
                    </div>

                    <div>
                        <strong>Category</strong>
                        <span>${product.category}</span>
                    </div>

                </div>

                <a
                    href="contact.html"
                    class="btn btn-primary"
                >
                    Enquire Now →
                </a>

            </div>

        </div>
    `;
};


const loadProductDetails = async () => {

    const container =
        document.getElementById("productDetails");

    const productId = getProductId();

    if (!productId) {

        container.innerHTML = `
            <p class="products-error">
                Product ID is missing.
            </p>
        `;

        return;
    }

    try {

        const response = await fetch(
            `/api/products/${encodeURIComponent(productId)}`
        );

        if (!response.ok) {
            throw new Error(
                `HTTP ${response.status}`
            );
        }

        const result =
            await response.json();

        console.log("Product API:", result);

        if (!result.success || !result.data) {
            throw new Error(
                "Invalid product response"
            );
        }

        renderProduct(result.data);

    } catch (error) {

        console.error(
            "Product details error:",
            error
        );

        container.innerHTML = `
            <p class="products-error">
                Unable to load product.
            </p>
        `;
    }
};


loadProductDetails();