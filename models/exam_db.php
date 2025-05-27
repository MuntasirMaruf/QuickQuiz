<?php
$servername = "localhost";
$db_username = "root";
$db_password = "";
$database = "QuickQuizDB";

$conn = new mysqli($servername, $db_username, $db_password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$get_exams = "SELECT * FROM Exams";

$result = $conn->query($get_exams); 
if ($result->num_rows > 0) {
    $data = array();
        
    while($row = $result->fetch_assoc()){
        $data[] = $row;
    }
    $json_data = json_encode($data);
    echo $json_data;
} else {
    return null;
}

$conn->close();
?>