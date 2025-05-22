<?php
include "../controls/update_student.php";
?>

<!DOCTYPE html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>My Profile</title>
        <link rel="stylesheet" href="css/studentstyle.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
        <script src="js/profile.js"></script>
    </head>
    <body>
        <div class="left_panel">
            <a href="student_exams.php" name='home_icon'><i class="fas fa-house"></i></a>
            <a href="student_exams.php" class="exam_link" name='exams_btn'><i class="fas fa-pen-to-square"></i>Exams</a>
            <a href="student_results.php" class="exam_link" name='results_btn'><i class="fas fa-square-check"></i>Results</a>
            <a href="student_history.php" class="exam_link" name='history_btn'><i class="fas fa-history"></i>History</a>
        </div>
        <div class='topnav'>
            <h1>My Profile</h1>

            <div class="profile_bar">
                <i class="fas fa-user"></i>
                <a class="profile_name" href="student_profile.php">Account</a>
            </div>
        </div>
        
        <div class="right_panel">
        <form name="update_form" method="POST" aciton="">
            <div class="input_box">
                <lable for="name">Username</lable>
                <input type="text" id="username" name="username" placeholder="Student Name" disabled value="<?php echo $username; ?>">
            </div>
            <p class="error_msg" id="error_username"><?php echo $username_error; ?></p>
            <div class="input_box">
                <lable for="email">Email</lable>
                <input type="text" id="email" name="email" placeholder="Student Email" disabled value="<?php echo $email; ?>">
                <p class="error_msg" id="error_email"><?php echo $email_error; ?></p>
            </div>
            <div class="input_box">
                <lable for="birthday">Birthday</lable>
                <input type="date" id="birthday" name="birthday" disabled value="<?php echo $birthday; ?>">
            </div>
            <p class="error_msg" id="error_birthday"><?php echo $birthday_error; ?></p>
            <div class="gender_box">
                    <p>Gender:</p>
                <div class="gender_option">
                    <input type="radio" id="gender_male" name="gender" disabled value="1" <?php if ($gender == "1") echo "checked"; ?>/>
                    <label for="gender_male">Male</label>
                </div>
                <div class="gender_option">
                    <input type="radio" id="gender_female" name="gender" disabled value="2" <?php if ($gender == "2") echo "checked"; ?>/>
                    <label for="gender_female">Female</label>
                </div>
                <div class="gender_option">
                    <input type="radio" id="gender_others" name="gender" disabled value="3" <?php if ($gender == "3") echo "checked"; ?>/>
                    <label for="gender_others">Others</label>
                </div>
            </div>
            <p class="error_msg " id="error_gender"><?php echo $gender_error; ?></p>
            <div class="input_box">
                <lable for="password">Password</lable>
                <input type="password" id="password" name="password" placeholder="Student Password" disabled value="<?php echo $password; ?>">
            </div>
            <p class="error_msg" id="error_password"><?php echo $password_error; ?></p>
            <div class="input_box">
                <lable for="confirm_password">Confirm Password</lable>
                <input type="password" id="confirm_password" name="confirm_password" disabled placeholder="Confirm Password">
            </div>
            <p class="error_msg" id="error_confirm_password"><?php echo $confirm_password_error; ?></p>
            <p class="error_msg" id="server_msg"><?php echo $server_msg; ?></p>

            <div class="button_box">
                <button class="custom_button primary" id='edit_btn' name='edit_btn' onclick="enableEdit()">Edit</button>
                <button class="custom_button success" id='update_btn' name='update_btn' disabled>Update</button>
                <button class="custom_button danger" id='delete_btn' name='delete_btn' disabled>Delete</button>
                <a href="../controls/logout.php" class="custom_button danger" id='logout_btn' name='logout_btn'>Logout</a>
            </div>
        </form>
        </div> 
    </body>
</html>
