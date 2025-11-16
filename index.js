// Smooth Scrolling for nav links
document.querySelectorAll(".smooth-scroll").forEach(link => {
    link.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({ behavior: "smooth" });
        }
    });
});

// Auto-populate Company name using Element SDK (if available)
if (typeof element !== "undefined") {
    element.ready(async () => {
        try {
            const user = await element.getUser();
            if (user && user.companyName) {
                document.getElementById("company-name").textContent = user.companyName;
            }
        } catch (err) {
            console.warn("Element SDK unavailable or user not loaded.");
        }
    });
}

// Handle Contact Form Submission
const contactForm = document.getElementById("contact-form");

if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const data = {
            firstName: document.getElementById("contact-first-name").value,
            lastName: document.getElementById("contact-last-name").value,
            email: document.getElementById("contact-email").value,
            subject: document.getElementById("contact-subject").value,
            message: document.getElementById("contact-message").value
        };

        console.log("Contact form submitted:", data);

        // Simple success alert **replace with backend later**
        alert("Your message has been sent. Thank you for contacting us!");

        contactForm.reset();
    });
}
