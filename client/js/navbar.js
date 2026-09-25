const initNavbar = () => {

    const menuToggle = document.getElementById("menuToggle");
    const mobileNav = document.getElementById("mobileNav");
    const siteHeader = document.getElementById("siteHeader");

    if (!menuToggle || !mobileNav) {
        return;
    }


    // Open / close mobile menu
    menuToggle.addEventListener("click", () => {

        const isOpen = menuToggle.classList.toggle("open");

        mobileNav.classList.toggle("open");

        menuToggle.setAttribute(
            "aria-expanded",
            isOpen
        );

        menuToggle.setAttribute(
            "aria-label",
            isOpen
                ? "Close navigation menu"
                : "Open navigation menu"
        );
    });


    // Close menu after clicking a link
    const mobileLinks = mobileNav.querySelectorAll("a");

    mobileLinks.forEach(link => {

        link.addEventListener("click", () => {

            menuToggle.classList.remove("open");

            mobileNav.classList.remove("open");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );
        });
    });


    // Close menu using Escape
    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            menuToggle.classList.remove("open");

            mobileNav.classList.remove("open");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );
        }
    });


    // Sticky header shadow
    window.addEventListener("scroll", () => {

        if (window.scrollY > 30) {
            siteHeader.classList.add("scrolled");
        } else {
            siteHeader.classList.remove("scrolled");
        }

    });

};