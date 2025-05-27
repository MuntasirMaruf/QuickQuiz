<?php

$error_msg = "";
$newFileName = "";

if (isset($_POST['submit']))
{
    $file = $_FILES['file'];

    $fileName = $file['name'];
    $fileTmpName = $file['tmp_name'];
    $fileSize = $file['size'];
    $fileError = $file['error'];
    $fileType = $file['type'];

   if ($fileError === 0){
        if ($fileSize < 5000000) {
            $newFileName = $fileName;
            $fileDestination = 'uploads/'.$newFileName;
            move_uploaded_file($fileTmpName, $fileDestination);
                
            $conn = openConnection();
            updateDp($conn, $newFileName);
            closeConnection($conn);
            header("Location: student_profile.php");
        } 
        else
        {
            $error_msg = "File to large";
            //header("Location: student_profile.php");
        }
    }
    else
    {
        $error_msg = "Unsuppordet format";
        //header("Location: student_profile.php");
    }
}

?>