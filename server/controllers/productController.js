const products = require("../data/products.json");

// Get all products
const getProducts = (req, res) => {
    res.status(200).json({
        success: true,
        count: products.length,
        data: products
    });
};

const getProductById = (req, res) => {

    const { id } = req.params;

    const product =
        products.find(
            product =>
                String(product.id) === String(id)
        );

    if (!product) {

        return res.status(404).json({
            success: false,
            message: "Product not found"
        });
    }

    res.status(200).json({
        success: true,
        data: product
    });
};
module.exports = {
    getProducts,
    getProductById
};