<?php
include "../controls/update_student.php"
?>
<!DOCTYPE html>
<html>
    <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>My Profile</title>
            <link rel="stylesheet" href="../css/studentstyle.css">
    </head>

    <body>
        <div class='topnav'>
            <a href='student_dashboard.php' name='dashboard_btn'>Dashboard</a>
            <a href='student_quizes.php' name='quizes_btn'>Quizes</a>
            <a href='student_results.php' name='results_btn'>Results</a>
            <a href='student_leaderboard.php' name='leaderboard_btn'>Leaderboard</a>
            <a href='student_profile.php' class='active' name="profile_btn">Profile</a>
        </div>
        <div class="container">
            <form name="signupform" action=""  method="POST">
                <h1>Edit Details</h1>
                <table>
                    <tr>
                        <td>
                            <input type="text" class='input_box' id="username" name="username" placeholder="Student Name" value="<?php echo $username; ?>">
                            <p class="error_msg" id="error_username"><?php echo $username_error; ?></p>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <input type="text" class='input_box' id="email" name="email" placeholder="Email" value="<?php echo $email; ?>">
                            <p class="error_msg" id="error_email"><?php echo $email_error; ?></p>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <input type="date" class='input_box' id="birthday" name="birthday" value="<?php echo $birthday; ?>">
                            <p class="error_msg" id="error_birthday"><?php echo $birthday_error; ?></p>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <div class="gender" id="gender_box">
                                <p>Gender:</p>
                                <div class="gender_option">
                                    <input type="radio" id="gender_male" name="gender" value="1" <?php if ($gender == "1") echo "checked"; ?>/>
                                    <label for="gender_male">Male</label>
                                </div>
                                <div class="gender_option">
                                    <input type="radio" id="gender_female" name="gender" value="2" <?php if ($gender == "2") echo "checked"; ?>/>
                                    <label for="gender_female">Female</label>
                                </div>
                                <div class="gender_option">
                                    <input type="radio" id="gender_others" name="gender" value="3" <?php if ($gender == "3") echo "checked"; ?>/>
                                    <label for="gender_others">Others</label>
                                </div>
                            </div>
                            <p class="error_msg" id="error_gender"><?php echo $gender_error; ?></p>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <select name="course" class='input_box' id="course" class="option_box">
                                    <option value="" disabled selected>Select Course</option>
                                    <option value="1" <?php if ($course == "1") echo "selected"; ?>>SSC Preparation</option>
                                    <option value="2" <?php if ($course == "2") echo "selected"; ?>>HSC Preparation</option>
                                    <option value="3" <?php if ($course == "3") echo "selected"; ?>>Engnieering Preparation</option>
                                    <option value="4" <?php if ($course == "4") echo "selected"; ?>>Medical Preparation</option>
                            </select>
                            <p class="error_msg" id="error_course"><?php echo $course_error; ?></p>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <input type="password" class='input_box' id="password" name="password" placeholder="Password" value="<?php echo $password; ?>">
                            <p class="error_msg" id="error_password"><?php echo $password_error; ?></p>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <input type="password" class='input_box' id="confirm_password" name="confirm_password" placeholder="Confirm Password">
                            <p class="error_msg" id="error_confirm"><?php echo $confirm_password_error; ?></p>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <input type="submit" class="custom_button success" name="update_btn" value="Update">
                            <input type="submit" class="custom_button danger" name="delete_btn" value="Delete">
                        </td>
                    </tr>

                </table>
            </form>
            <p class="have_account" id="server_msg"><?php echo $server_msg; ?></p>
        </div>
    </body>
</html>