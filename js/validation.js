function validateInput() {
    const form = document.forms["signupform"];
    const username = form["username"].value.trim();
    const email = form["email"].value.trim();
    const birthday = form["birthday"].value;
    const gender = document.querySelector('input[name="gender"]:checked');
    const course = form["course"].value;
    const password = form["password"].value;
    const confirmPassword = form["confirm_password"].value;

    const namePattern = /^[a-zA-Z\s\.\-']+$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    let errorMessages = [];

    if (username === "" || !namePattern.test(username)) {
        errorMessages.push("Please enter a valid name.");
        document.getElementById("username").style.border = "2px solid rgba(232, 18, 18, 1)";
    }
    else {
        document.getElementById("username").style.border = "2px solid rgba(255, 255, 255, 0.2)";
    }

    if (email === "" || !emailPattern.test(email)) {
        errorMessages.push("Please enter a valid email address.");
        document.getElementById("email").style.border = "2px solid rgba(232, 18, 18, 1)";
    }
    else {
        document.getElementById("email").style.border = "2px solid rgba(255, 255, 255, 0.2)";
    }

    if (birthday === "" || !isValidAge(birthday)) {
        if (birthday === "") {
            errorMessages.push("Please select your birthdate.");
            document.getElementById("birthday").style.borderColor = "red";
        } else if (!isValidAge(birthday)) {
            errorMessages.push("You must be at least 13 years old to register.");
            document.getElementById("birthday").style.borderColor = "red";
        }
    }
    else {
        document.getElementById("birthday").style.borderColor = "white";
    }

    if (!gender) {
        errorMessages.push("Please select your gender.");
        document.getElementById("gender_box").style.color = "red";
    }
    else {
        document.getElementById("gender_box").style.color = "white";
    }

    if (course === "") {
        errorMessages.push("Please select a course.");
        document.getElementById("course").style.border = "2px solid rgba(232, 18, 18, 1)";
    }
    else {
        document.getElementById("course").style.border = "2px solid rgba(255, 255, 255, 0.2)";
    }

    if (password.length < 8 || !passwordPattern.test(password)) {
        errorMessages.push("Password must have at least one lowercase letter, at least one uppercase letter, at least one digit, at least one special character and at least 8 characters total.");
        document.getElementById("password").style.border = "2px solid rgba(232, 18, 18, 1)";
    }
    else {
        document.getElementById("password").style.border = "2px solid rgba(255, 255, 255, 0.2)";
    }

    if (password !== confirmPassword) {
        errorMessages.push("Passwords do not match.");
        document.getElementById("confirm_password").style.border = "2px solid rgba(232, 18, 18, 1)";
    }
    else {
        document.getElementById("confirm_password").style.border = "2px solid rgba(255, 255, 255, 0.2)";
    }

    if (errorMessages.length > 0) {
        alert(errorMessages.join("\n"));
        return false;
    }
    else {
        return true;
    }
}

function validateForm() {
    if (validateInput() != true) {
        console.log("False");
        return false;
    }
}

function isValidAge(birthday) {
    const birthDate = new Date(birthday); 
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    console.log(age);
    if (age > 12) {
        return true;
    }

    return false;
}
