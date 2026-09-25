const API_BASE_URL = "/api";


const fetchProducts = async () => {

    const response = await fetch(
        `${API_BASE_URL}/products`
    );

    if (!response.ok) {
        throw new Error(
            "Failed to load products"
        );
    }

    return response.json();
};


const fetchProductById = async (id) => {

    const response = await fetch(
        `${API_BASE_URL}/products/${id}`
    );

    if (!response.ok) {
        throw new Error(
            "Product not found"
        );
    }

    return response.json();
};


const fetchCompany = async () => {

    const response = await fetch(
        `${API_BASE_URL}/company`
    );

    if (!response.ok) {
        throw new Error(
            "Failed to load company data"
        );
    }

    return response.json();
};