<?php
$username = $email = $birthday = $gender = $course = $password = $confirm_password = "";

$username_error = $email_error = $birthday_error = $gender_error = $course_error = $password_error = $confirm_password_error = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = trim($_POST["username"] ?? '');
    $email = trim($_POST["email"] ?? '');
    $birthday = $_POST["birthday"] ?? '';
    $gender = $_POST["gender"] ?? '';
    $course = $_POST["course"] ?? '';
    $password = $_POST["password"] ?? '';
    $confirm_password = $_POST["confirm_password"] ?? '';

    $namePattern = "/^[a-zA-Z\s\.\-']+$/";
    $emailPattern = "/^[^\s@]+@[^\s@]+\.[^\s@]+$/";
    $passwordPattern = "/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/";

    if(isset($_POST["submit_btn"]))
    {
        if (empty($username) || !preg_match($namePattern, $username)) {
            $username_error = "Please enter a valid name.";
        }
    
        if (empty($email) || !preg_match($emailPattern, $email)) {
            $email_error = "Please enter a valid email address.";
        }
    
        if (empty($birthday)) {
            $birthday_error = "Please select your birthdate.";
        } else {
            $birthDate = new DateTime($birthday);
            $today = new DateTime();
            $age = $today->diff($birthDate)->y;
    
            if ($age < 13) {
                $birthday_error = "You must be at least 13 years old to register.";
            }
        }
    
        if (empty($gender)) {
            $gender_error = "<br>Please select your gender.";
        }
    
        if (empty($course)) {
            $course_error = "Please select a course.";
        }
    
        if (strlen($password) < 8 || !preg_match($passwordPattern, $password)) {
            $password_error = "Password must have at least one letter, one digit, one special character and at least 8 characters total.";
        }
    
        if ($password !== $confirm_password) {
            $confirm_password_error = "Passwords didn't match.";
        }
    }   
}
?>
