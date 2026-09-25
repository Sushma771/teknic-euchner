const loadAboutPage = async () => {

    const title =
        document.getElementById("aboutTitle");

    const description =
        document.getElementById(
            "aboutDescription"
        );


    try {

        const company =
            await fetchCompany();


        if (title) {

            title.textContent =
                company.title;
        }


        if (description) {

            description.textContent =
                company.description;
        }

    } catch (error) {

        console.error(error);

        if (description) {

            description.textContent =
                "Unable to load company information.";
        }
    }
};


document.addEventListener(
    "DOMContentLoaded",
    () => {

        initNavbar();

        loadAboutPage();

    }
);