<?php
if ($_SERVER["REQUEST_METHOD"] == "GET") {

    $fname = isset($_GET['fname']) ? htmlspecialchars($_GET['fname']) : 'Not Provided';
    $lname = isset($_GET['lname']) ? htmlspecialchars($_GET['lname']) : 'Not Provided';
    $email = isset($_GET['email']) ? htmlspecialchars($_GET['email']) : 'Not Provided';
    $birthday = isset($_GET['birthday']) ? htmlspecialchars($_GET['birthday']) : 'Not Provided';
    $gender = isset($_GET['gender']) ? htmlspecialchars($_GET['gender']) : 'Not Provided';
    $school = isset($_GET['school']) ? htmlspecialchars($_GET['school']) : 'Not Provided';
    $course = isset($_GET['course']) ? htmlspecialchars($_GET['course']) : 'Not Provided';
    $password = isset($_GET['password']) ? htmlspecialchars($_GET['password']) : 'Not Provided';
    $re_password = isset($_GET['re_password']) ? htmlspecialchars($_GET['re_password']) : 'Not Provided';
    $terms = isset($_GET['conditon']) ? "Accepted" : "Not Accepted";

    if ($password !== $re_password) {
        echo "<h3 style='color: red;'>Error: Passwords do not match!</h3>";
    } else {
        echo "<h2>Registration Successful!</h2>";
    }

    echo "<h3>Form Data Received:</h3>";
    echo "<strong>First Name:</strong> " . $fname . "<br>";
    echo "<strong>Last Name:</strong> " . $lname . "<br>";
    echo "<strong>Email:</strong> " . $email . "<br>";
    echo "<strong>Birthday:</strong> " . $birthday . "<br>";
    echo "<strong>Gender:</strong> " . $gender . "<br>";
    echo "<strong>School:</strong> " . $school . "<br>";
    echo "<strong>Selected Course:</strong> " . $course . "<br>";
    echo "<strong>Terms and Conditions:</strong> " . $terms . "<br>";
    
} else {
    echo "<h3 style='color: red;'>Invalid request method!</h3>";
}
?>
