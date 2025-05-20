<?php
include '../models/student_db.php';

if (isset($_SESSION['s_id'])) {
    $username = $email = $birthday = $gender = $course = $password = "";

    $conn = openConnection();
    $studentDetails = getStudentDetails($conn);
    closeConnection($conn);

    $username = $studentDetails['Username'];
    $email = $studentDetails['Email'];
    $birthday = $birthday_formatted = date('Y-m-d', strtotime($studentDetails['Dob']));
    $gender = $studentDetails['Gender'];
    $course = $studentDetails['Course'];
    $password = $studentDetails['Password'];
}
else{
    header("Location: ../views/login.php");
    exit();
}


?>