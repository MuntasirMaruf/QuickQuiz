<h1>Hello! This is the action_page</h> <br>

<?php
$error = 0;
$username = $email = $birthday = $gender = $course = $password = $confirm_password = "";

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

    if (empty($username) || !preg_match($namePattern, $username)) {
        echo "Please enter a valid name. <br> <br>";
        $error++;
    }

    if (empty($email) || !preg_match($emailPattern, $email)) {
        echo "Please enter a valid email address. <br> <br>";
        $error++;
    }

    if (empty($birthday)) {
        echo "Please select your birthdate. <br> <br>";
        $error++;
    } else {
        $birthDate = new DateTime($birthday);
        $today = new DateTime();
        $age = $today->diff($birthDate)->y;

        if ($age < 13) {
            echo "You must be at least 13 years old to register. <br> <br>";
            $error++;
        }
    }

    if (empty($gender)) {
        echo "Please select your gender. <br> <br>";
        $error++;
    }

    if (empty($course)) {
        echo "Please select a course. <br> <br>";
        $error++;
    }

    if (strlen($password) < 8 || !preg_match($passwordPattern, $password)) {
        echo "Password must have at least one letter, one digit, one special character and at least 8 characters total. <br>";
        $error++;
    }

    if ($password !== $confirm_password) {
        echo "Passwords do not match. <br> <br>";
        $error++;
    }

    if ($error == 0) {
        echo "<h2>Registration Successful!</h2>";
        echo "<p>Welcome, " . htmlspecialchars($username) . "!</p>";
    }
}
?>
