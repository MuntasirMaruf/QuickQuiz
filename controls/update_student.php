<?php

include "../models/student_db.php";

if (!isset($_SESSION['s_id'])) {
    header("Location: ../views/login.php");
    exit();
}

$conn = openConnection();
$studentDetails = getStudentDetails($conn);
closeConnection($conn);

$username = $studentDetails['Username'];
$email = $studentDetails['Email'];
$birthday = $birthday_formatted = date('Y-m-d', strtotime($studentDetails['Dob']));
$gender = $studentDetails['Gender'];
$course = $studentDetails['Course'];
$password = $studentDetails['Password'];

$username_error = $email_error = $birthday_error = $gender_error = $course_error = $password_error = $confirm_password_error = "";

$server_msg = "";

$count = 0;

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = trim($_POST["username"] ?? ''); // null coalescing operator (if $_POST["username"] is null then '' )
    $email = trim($_POST["email"] ?? '');
    $birthday = $_POST["birthday"] ?? '';
    $gender = $_POST["gender"] ?? '';
    $course = $_POST["course"] ?? '';
    $password = $_POST["password"] ?? '';
    $confirm_password = $_POST["confirm_password"] ?? '';

    $namePattern = "/^[a-zA-Z\s\.\-']+$/";
    $emailPattern = "/^[^\s@]+@[^\s@]+\.[^\s@]+$/";
    $passwordPattern = "/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/";

    if(isset($_POST["update_btn"]))
    {
        if (empty($username) || !preg_match($namePattern, $username)) {
            $username_error = "Please enter a valid name.";
            $count++;
        }
    
        if (empty($email) || !preg_match($emailPattern, $email)) {
            $email_error = "Please enter a valid email address.";
            $count++;
        }
    
        if (empty($birthday)) {
            $birthday_error = "Please select your birthdate.";
            $count++;
        } else {
            $birthDate = new DateTime($birthday);
            $today = new DateTime();
            $age = $today->diff($birthDate)->y;
    
            if ($age < 13) {
                $birthday_error = "You must be at least 13 years old to register.";
                $count++;
            }
        }
    
        if (empty($gender)) {
            $gender_error = "<br>Please select your gender.";
            $count++;
        }
    
        if (empty($course)) {
            $course_error = "Please select a course.";
            $count++;
        }
    
        if (strlen($password) < 8 || !preg_match($passwordPattern, $password)) {
            $password_error = "Password must have at least one letter, one digit, one special character and at least 8 characters total.";
            $count++;
        }
    
        if ($password !== $confirm_password) {
            $confirm_password_error = "Passwords didn't match.";
            $count++;
        }

        if($count == 0){
            $conn = openConnection();
            $server_msg = updateStudent($conn, $username, $email, $birthday, $gender, $course, $password);
            closeConnection($conn);
        }
    }  
    if (isset($_POST["delete_btn"])) {
        $conn = openConnection();
        deleteStudent($conn);
        closeConnection($conn);
        session_unset();
        session_destroy();
        header("Location: ../views/login.php");
        exit();
    } 
}
?>
