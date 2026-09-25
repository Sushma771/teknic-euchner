const fs = require("fs");
const path = require("path");

const getCompany = (req, res, next) => {
    try {
        const filePath = path.join(
            __dirname,
            "../data/company.json"
        );

        const fileData = fs.readFileSync(
            filePath,
            "utf-8"
        );

        const company = JSON.parse(fileData);

        res.status(200).json(company);

    } catch (error) {
        next(error);
    }
};

module.exports = {
    getCompany
};