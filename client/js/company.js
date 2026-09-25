const renderCompany = (company) => {

    const title =
        document.getElementById("companyTitle");

    const description =
        document.getElementById(
            "companyDescription"
        );


    if (title && company.title) {

        title.textContent =
            company.title;
    }


    if (description && company.description) {

        description.textContent =
            company.description;
    }
};


const loadCompany = async () => {

    try {

        const company =
            await fetchCompany();

        renderCompany(company);

    } catch (error) {

        console.error(
            "Company API Error:",
            error
        );

        const description =
            document.getElementById(
                "companyDescription"
            );

        if (description) {

            description.textContent =
                "Company information is currently unavailable.";
        }
    }
};