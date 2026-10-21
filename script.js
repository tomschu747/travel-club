document.addEventListener("DOMContentLoaded", function() {

    // Gallery thumbnails and caption element
    const thumbs = document.querySelectorAll(".thumb");
    const caption = document.getElementById("image-caption");

    // Form element itself
    const form = document.querySelector("form");

    // All form input elements
    const formInputs = document.querySelectorAll(".form-group input");

    // Individual form input elements for easier access
    const username = document.getElementById("username");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const terms = document.getElementById("terms");

    // error message elements
    const usernameError = document.getElementById("error-username");
    const emailError = document.getElementById("error-email");
    const passwordError = document.getElementById("error-password");
    const termsError = document.getElementById("error-terms");

    // Add click and keyboard interaction for gallery thumbnails
    thumbs.forEach(thumb => {
        thumb.addEventListener("click", function() {
            thumbs.forEach(t => t.classList.remove("expanded"));
            this.classList.add("expanded");
            // this.dataset.city gets the text from the data-city attribute of the thumbnail element
            caption.textContent = `This shot is from ${this.dataset.city}`;
        });

        thumb.addEventListener("keydown", function(e) {
            if (e.key === "Enter") {
                this.click();
            }
        });
    });

    // On focus: background becomes #fffae0
    // On blur: background returns to white
    formInputs.forEach(field => {
        field.addEventListener("focus", function() {
            this.style.backgroundColor = "#fffae0";
        });
        field.addEventListener("blur", function() {
            this.style.backgroundColor = "#fff";
        });
    });

    // Validation Rules
    const validateUsername = () => username.value.trim() !== "";
    const validateEmail = () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value);
    const validatePassword = () => password.value.length >= 6;
    const validateTerms = () => terms.checked;
    const isFormValid = () => validateUsername() && validateEmail() && validatePassword() && validateTerms();

    // Form submission handling
    form.addEventListener("submit", function(e) {
        if (!isFormValid()) {
            e.preventDefault();
            alert("Please fill out all fields correctly and accept the terms.");
        } else {
            e.preventDefault();
            alert("Form submitted successfully.");
        }
    });

    // Functions to show and clear error messages for form fields
    const showError = (element, message) => {
        element.textContent = message;
        element.style.display = "block";
    };
    const clearError = (element) => {
        element.textContent = "";
        element.style.display = "none";
    };
    
    // Listeners for form input validation
    // Username validation
    username.addEventListener("input", function() {
        if (validateUsername()) {
            username.className = "";
            clearError(usernameError);
        } else {
            username.className = "error-border";
            showError(usernameError, "Username is required.");
        }
    });

    // Email validation
    email.addEventListener("input", function() {
        if (validateEmail()) {
            email.className = "";
            clearError(emailError);
        } else {
            email.className = "error-border";
            showError(emailError, "Invalid email address.");
        }
    });

    // Password validation
    password.addEventListener("input", function() {
        if (validatePassword()) {
            password.className = "";
            clearError(passwordError);
        } else {
            password.className = "error-border";
            showError(passwordError, "Password must be at least 6 characters.");
        }
    });

    // Terms and conditions validation
    terms.addEventListener("change", function() {
        if (validateTerms()) {
            
            clearError(termsError);
        } else {
            showError(termsError, "You must accept the terms.");
        }
    });
});
