const contactForm = document.getElementById("contactForm");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const messageInput = document.getElementById("message");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const messageError = document.getElementById("messageError");

const formMessage = document.getElementById("formMessage");

const submitButton = document.getElementById("submitButton");
const submitText = document.getElementById("submitText");


const clearErrors = () => {

    nameError.textContent = "";
    emailError.textContent = "";
    messageError.textContent = "";

    formMessage.textContent = "";
};


const validateForm = () => {

    let isValid = true;

    clearErrors();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();


    if (!name) {

        nameError.textContent =
            "Name is required.";

        isValid = false;
    }


    if (!email) {

        emailError.textContent =
            "Email is required.";

        isValid = false;

    } else {

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {

            emailError.textContent =
                "Please enter a valid email.";

            isValid = false;
        }
    }


    if (!message) {

        messageError.textContent =
            "Message is required.";

        isValid = false;
    }


    return isValid;
};


contactForm.addEventListener(
    "submit",
    async (event) => {

        event.preventDefault();

        if (!validateForm()) {
            return;
        }


        submitButton.disabled = true;

        submitText.textContent =
            "Submitting...";


        const formData = {

            name: nameInput.value.trim(),

            email: emailInput.value.trim(),

            phone: phoneInput.value.trim(),

            message: messageInput.value.trim()
        };


        try {

            const response = await fetch(
                "/api/contact",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify(formData)
                }
            );


            const result =
                await response.json();


            if (!response.ok) {

                throw new Error(
                    result.message ||
                    "Unable to submit enquiry."
                );
            }


            formMessage.textContent =
                result.message;

            contactForm.reset();


        } catch (error) {

            console.error(
                "Contact form error:",
                error
            );

            formMessage.textContent =
                error.message ||
                "Something went wrong.";

        } finally {

            submitButton.disabled = false;

            submitText.textContent =
                "Send Enquiry";
        }
    }
);