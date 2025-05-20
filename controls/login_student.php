<?php

include "../models/student_db.php";

$email = $password = "";

$email_error = $password_error = "";

$server_msg = "";

$count = 0;

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = trim($_POST["email"] ?? '');

    $password = $_POST["password"] ?? '';


    if(isset($_POST["login_btn"]))
    {
        if (empty($email)) {
            $email_error = "Please your email address.";
            $count++;
        }
    
        if (empty($password)) {
            $password_error = "Please enter your password.";
            $count++;
        }

        if($count == 0){
            $conn = openConnection();
            $server_msg = login($conn, $email, $password);
            closeConnection($conn);
            if($server_msg == "Login successful!"){
                header("Location: student_dashboard.php");
            }
        }
    }   
}
?>
