<?php
include "../controls/login_student.php"
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
                                <input type="text" id="email" name="email" placeholder="Email" value="<?php echo $email; ?>">
                            </div>
                            <p class="error_msg" id="error_email"><?php echo $email_error; ?></p>
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
                            <input type="submit" class="btn" name="login_btn" value="Login">
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <div class="have_account">
                                <p>Don't have an account?<a href="student_registration.php">Sing up</a> </p>
                            </div>
                        </td>
                    </tr>
                </table>
            </form>
            <p class="have_account" id="server_msg"><?php echo $server_msg; ?></p>
        </div>
    </body>
</html>