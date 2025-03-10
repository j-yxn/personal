// Opens the footer
const footerToggler = document.getElementById("openToggle");
footerToggler.addEventListener("click", function () {
    const footer = document.getElementById("expandable");
    footer.classList.add("open");
});

// Closes the footer
const closeFooterToggler = document.getElementById("closeToggle");
closeFooterToggler.addEventListener("click", function () {
    const footer = document.getElementById("expandable");
    footer.classList.remove("open");
});
