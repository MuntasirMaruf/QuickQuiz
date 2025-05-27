<?php
include "../controls/register_student.php"
?>
<!DOCTYPE html>
<html>
    <head>
        <title>Student Registration</title>
        <link rel="stylesheet" href="css/regstyle.css">
        <!-- <script src="../js/validation.js"></script> -->
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>

    <body>
        <div class="wrapper">
            <!-- <form name="signupform" action="/webtech/quickquiz/controls/action_page.php" onsubmit="return validateInput()" method="POST"> -->
            <form name="signupform" action=""  method="POST">
                <h1>Create a new account</h1>

                <table>
                    <tr>
                        <td>
                            <div class="input_box">
                                <input type="text" id="username" name="username" placeholder="Student Name" value="<?php echo $username; ?>">
                            </div>
                            <p class="error_msg" id="error_username"><?php echo $username_error; ?></p>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <div class="input_box">
                                <input type="text" id="email" name="email" placeholder="Email" value="<?php echo $email; ?>">
                            </div>
                            <p class="error_msg" id="error_email"><?php echo $email_error; ?></p>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <div class="input_box">
                                <input type="date" id="birthday" name="birthday" style="width:99%" value="<?php echo $birthday; ?>">
                            </div>
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
                            <div class="option_box">
                                <select name="course" id="course">
                                    <option value="" disabled selected>Select Course</option>
                                    <option value="1" <?php if ($course == "1") echo "selected"; ?>>SSC Preparation</option>
                                    <option value="2" <?php if ($course == "2") echo "selected"; ?>>HSC Preparation</option>
                                    <option value="3" <?php if ($course == "3") echo "selected"; ?>>Engnieering Preparation</option>
                                    <option value="4" <?php if ($course == "4") echo "selected"; ?>>Medical Preparation</option>
                                </select>
                            </div>
                            <p class="error_msg" id="error_course"><?php echo $course_error; ?></p>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <div class="input_box">
                                <input type="password" id="password" name="password" placeholder="Password" value="<?php echo $password; ?>">
                            </div>
                            <p class="error_msg" id="error_password"><?php echo $password_error; ?></p>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <div class="input_box">
                                <input type="password" id="confirm_password" name="confirm_password" placeholder="Confirm Password" value="<?php echo $confirm_password; ?>">
                            </div>
                            <p class="error_msg" id="error_confirm"><?php echo $confirm_password_error; ?></p>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <input type="submit" class="btn" name="submit_btn" value="Register">
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <div class="have_account">
                                <p>Already have an account?<a href="login.php">Sign in</a> </p>
                            </div>
                        </td>
                    </tr>
                </table>
            </form>
            <p class="have_account" id="server_msg"><?php echo $server_msg; ?></p>
        </div>
    </body>
</html>