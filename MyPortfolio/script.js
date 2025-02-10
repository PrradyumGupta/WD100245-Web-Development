document.addEventListener("DOMContentLoaded", function() {
    console.log("Portfolio page loaded.");
    
    const navLinks = document.querySelectorAll("nav a");
    navLinks.forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            window.location.href = this.getAttribute("href");
        });
    });
});
