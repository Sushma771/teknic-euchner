const submitContact = (req, res, next) => {
    try {
        const { name, email, phone, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: "Name, email and message are required."
            });
        }

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Please enter a valid email address."
            });
        }

        console.log("Contact Request:", {
            name,
            email,
            phone,
            message
        });

        return res.status(201).json({
            success: true,
            message: "Your enquiry has been submitted successfully."
        });

    } catch (error) {
        next(error);
    }
};

module.exports = {
    submitContact
};