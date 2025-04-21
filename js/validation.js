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
        document.getElementById("error_username").innerHTML = "Please enter a valid name.";
    }
    else {
        document.getElementById("username").style.border = "2px solid rgba(255, 255, 255, 0.2)";
        document.getElementById("error_username").innerHTML = ""
    }

    if (email === "" || !emailPattern.test(email)) {
        errorMessages.push("Please enter a valid email address.");
        document.getElementById("email").style.border = "2px solid rgba(232, 18, 18, 1)";
        document.getElementById("error_email").innerHTML = "Please enter a valid email address.";
    }
    else {
        document.getElementById("email").style.border = "2px solid rgba(255, 255, 255, 0.2)";
        document.getElementById("error_email").innerHTML = "";
    }

    if (birthday === "" || !isValidAge(birthday)) {
        if (birthday === "") {
            errorMessages.push("Please select your birthdate.");
            document.getElementById("birthday").style.borderColor = "red";
            document.getElementById("error_birthday").innerHTML = "Please select your birthdate.";
        } else if (!isValidAge(birthday)) {
            errorMessages.push("You must be at least 13 years old to register.");
            document.getElementById("birthday").style.borderColor = "red";
            document.getElementById("error_birthday").innerHTML = "You must be at least 13 years old to register.";
        }
    }
    else {
        document.getElementById("birthday").style.borderColor = "white";
        document.getElementById("error_birthday").innerHTML = "";
    }

    if (!gender) {
        errorMessages.push("Please select your gender.");
        document.getElementById("gender_box").style.color = "red";
        document.getElementById("error_gender").innerHTML = "Please select your gender.";
    }
    else {
        document.getElementById("gender_box").style.color = "white";
        document.getElementById("error_gender").innerHTML = "";
    }

    if (course === "") {
        errorMessages.push("Please select a course.");
        document.getElementById("course").style.border = "2px solid rgba(232, 18, 18, 1)";
        document.getElementById("error_course").innerHTML = "Please select a course.";
    }
    else {
        document.getElementById("course").style.border = "2px solid rgba(255, 255, 255, 0.2)";
        document.getElementById("error_course").innerHTML = "";
    }

    if (password.length < 8 || !passwordPattern.test(password)) {
        errorMessages.push("Password must have at least one lowercase letter, at least one uppercase letter, at least one digit, at least one special character and at least 8 characters total.");
        document.getElementById("password").style.border = "2px solid rgba(232, 18, 18, 1)";
        document.getElementById("error_password").innerHTML = "Invalid password";
    }
    else {
        document.getElementById("password").style.border = "2px solid rgba(255, 255, 255, 0.2)";
        document.getElementById("error_password").innerHTML = "";
    }

    if (password !== confirmPassword) {
        errorMessages.push("Passwords do not match.");
        document.getElementById("confirm_password").style.border = "2px solid rgba(232, 18, 18, 1)";
        document.getElementById("error_confirm").innerHTML = "Passwords do not match.";
    }
    else {
        document.getElementById("confirm_password").style.border = "2px solid rgba(255, 255, 255, 0.2)";
        document.getElementById("error_confirm").innerHTML = "";
    }

    if (errorMessages.length > 0) {
        // alert(errorMessages.join("\n"));
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
