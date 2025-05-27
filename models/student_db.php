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
            loginTable($conn, $email, $password);
            return "Registration successful!";
        } else {
            return "Error: " . $query . "<br>" . $conn->error;
        }
    }
}

function loginTable($conn, $email, $password) {
    $select_query = "SELECT Id FROM Students WHERE Email='$email' AND Password='$password'";
    $result = $conn->query($select_query);
    $row = $result->fetch_assoc();
    $user_id = $row['Id'];
    $status = 1; // Status 1 for student
    $last_login = date('Y-m-d H:i:s');
    $login_query = "INSERT INTO Logins (Email, Password, Status, UserId, LastLogin)
                    VALUES ('$email', '$password', '$status', '$user_id', '$last_login')";
    $conn->query($login_query);
}

function updateStudent($conn, $username, $email, $dob, $gender, $password) {
    $s_id = $_SESSION['s_id'];
    // $password_hash = password_hash($password, PASSWORD_BCRYPT);
    $updated = date('Y-m-d H:i:s');
    $existing = "SELECT * FROM Students WHERE Id !='$s_id' AND Email='$email'";
    $result = $conn->query($existing);

    if ($result->num_rows > 0) {
        return "Email not available.";
    } else {
        $query = "UPDATE Students 
                  SET Username='$username', Email='$email', Dob='$dob', Gender='$gender', Password='$password', Updated='$updated' 
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
    $result = $conn->query($query);     // Return all the rows

    if ($result->num_rows > 0) {
        return $result->fetch_assoc();  // returns one row at a time
    } else {
        return null;
    }
}

function deleteStudent($conn){
    $s_id = $_SESSION['s_id']; 
    $query = "DELETE FROM Students WHERE ID = '$s_id'";
    $result = $conn->query($query);

    $query2 = "DELETE FROM Logins WHERE UserId = '$s_id'";
    $result2 = $conn->query($query2);
}

function login($conn, $email, $password) {
    // $password_hash = password_hash($password, PASSWORD_BCRYPT);
    $query = "SELECT * FROM Logins WHERE Email='$email'";
    $result = $conn->query($query);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        if ($password === $row['Password']) {
            $_SESSION['s_id'] = $row['UserId'];
            return $row["Status"];
        } else {
            return "Invalid password.";
        }
    } else {
        return "No user found with this email.";
    }
}

function updateDp($conn, $name) {
    $s_id = $_SESSION["s_id"];
    $query = "UPDATE Students SET Picture = '$name' WHERE ID = $s_id";

    if ($conn->query($query) === TRUE) {
        return "Update successful!";
    } else {
        return "Error: " . $query . "<br>" . $conn->error;
    }
}


function closeConnection($conn) {
    $conn->close();
}
?>