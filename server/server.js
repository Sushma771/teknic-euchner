const express = require("express");
const path = require("path");

const productRoutes = require("./routes/productRoutes");
const companyRoutes = require("./routes/companyRoutes");
const contactRoutes = require("./routes/contactRoutes");

const errorHandler = require("./middleware/errorHandler");

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());

// Serve frontend
app.use(express.static(path.join(__dirname, "../client")));

// API Routes
app.use("/api/products", productRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/contact", contactRoutes);

// Test API
app.get("/api/test", (req, res) => {
    res.status(200).json({
        success: true,
        message: "TEKNIC EUCHNER API is running"
    });
});

// Invalid API route
app.use("/api/*splat", (req, res) => {
    res.status(404).json({
        success: false,
        message: "API route not found"
    });
});

// Centralized error handler
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});