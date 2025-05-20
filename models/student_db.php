<?php
session_start();

function openConnection() {
    $servername = "localhost";
    $db_username = "root";
    $db_password = "";
    $database = "QuickQuizDB";

    $conn = new mysqli($servername, $db_username, $db_password, $database);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    return $conn;
}


function registerStudent($conn, $username, $email, $dob, $gender, $course, $password) {
    // $password_hash = password_hash($password, PASSWORD_BCRYPT);
    $student_status = 1;
    $created = date('Y-m-d H:i:s');
    $updated = $created;

    $existing = "SELECT * FROM Students WHERE Email='$email'";
    $result = $conn->query($existing);

    if ($result->num_rows > 0) {
        return "User already exists.";
    }
    else{
        $query = "INSERT INTO Students (Username, Email, Dob, Gender, Course, Password, Status, Created, Updated)
                                VALUES ('$username', '$email', '$dob', '$gender', '$course', '$password', '$student_status', '$created', '$updated')";

        if ($conn->query($query) === TRUE) {
            return "Registration successful!";
        } else {
            return "Error: " . $query . "<br>" . $conn->error;
        }
    }
}

function updateStudent($conn, $username, $email, $dob, $gender, $course, $password) {
    $s_id = $_SESSION['s_id'];
    // $password_hash = password_hash($password, PASSWORD_BCRYPT);
    $updated = date('Y-m-d H:i:s');
    $existing = "SELECT * FROM Students WHERE Id !='$s_id' AND Email='$email'";
    $result = $conn->query($existing);

    if ($result->num_rows > 0) {
        return "Email not available.";
    } else {
        $query = "UPDATE Students 
                  SET Username='$username', Email='$email', Dob='$dob', Gender='$gender', Course='$course', Password='$password', Updated='$updated' 
                  WHERE Id ='$s_id'";

        if ($conn->query($query) === TRUE) {
            return "Update successful!";
        } else {
            return "Error: " . $query . "<br>" . $conn->error;
        }
    }
}

function getStudentDetails($conn) {
    $s_id = $_SESSION['s_id'];
    $query = "SELECT * FROM Students WHERE ID = '$s_id'";
    $result = $conn->query($query);

    if ($result->num_rows > 0) {
        return $result->fetch_assoc();
    } else {
        return null;
    }
}

function deleteStudent($conn){
    $s_id = $_SESSION['s_id']; 
    $query = "DELETE FROM Students WHERE ID = '$s_id'";
    $result = $conn->query($query);
}

function login($conn, $email, $password) {
    // $password_hash = password_hash($password, PASSWORD_BCRYPT);
    $query = "SELECT * FROM Students WHERE Email='$email' AND Password='$password'";
    $result = $conn->query($query);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        if ($password === $row['Password']) {
            $_SESSION['s_id'] = $row['Id'];
            return "Login successful!";
        } else {
            return "Invalid password.";
        }
    } else {
        return "No user found with this email.";
    }
}



function closeConnection($conn) {
    $conn->close();
}
?>