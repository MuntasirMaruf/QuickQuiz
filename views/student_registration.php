<!DOCTYPE html>
<html>
    <head>
        <title>Student Registration</title>
        <link rel="stylesheet" href="../css/regstyle.css">
        <!-- <script src="../js/validation.js"></script> -->
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>

    <body>
        <div class="wrapper">
            <form name="signupform" action="/webtech/quickquiz/views/action_page.php" onsubmit="return validateInput()" method="POST">
                <h1>Create a new account</h1>

                <table>
                <tr>
                <td>
                <div class="input_box">
                    <input type="text" id="username" name="username" placeholder="Student Name">
                </div>
                <div class="error_msg" id="error_username">
                    <p></p>
                </div>
                </td>
                </tr>

                <tr>
                <td>
                <div class="input_box">
                    <input type="text" id="email" name="email" placeholder="Email">
                </div>
                <div class="error_msg" id="error_email">
                    <p></p>
                </div>
                </td>
                </tr>

                <tr>
                <td>
                <div class="input_box">
                    <input type="date" id="birthday" name="birthday" style="width:99%">
                </div>
                <div class="error_msg" id="error_birthday">
                    <p></p>
                </div>
                </td>
                </tr>

                <tr>
                <td>
                <div class="gender_option" id="gender_box">
                    <p>Gender:</p>
                    <div class="gender">
                        <input type="radio" id="gender_male" name="gender" value="Male"/>
                        <label for="gender_male">Male</label>
                    </div>
                    <div class="gender">
                        <input type="radio" id="gender_female" name="gender" value="Female"/>
                        <label for="gender_female">Female</label>
                    </div>
                    <div class="gender">
                        <input type="radio" id="gender_others" name="gender" value="Others"/>
                        <label for="gender_others">Others</label>
                    </div>
                </div>
                <div class="error_msg" id="error_gender">
                    <p></p>
                </div>
                </td>
                </tr>

                <tr>
                <td>
                <div class="option_box">
                    <select name="course" id="course">
                        <option value="" disabled selected>Select Course</option>
                        <option value="ssc">SSC Preparation</option>
                        <option value="hsc">HSC Preparation</option>
                        <option value="engnieering">Engnieering Preparation</option>
                        <option value="medical">Medical Preparation</option>
                    </select>
                </div>
                <div class="error_msg" id="error_course">
                    <p></p>
                </div>
                </td>
                </tr>

                <tr>
                <td>
                <div class="input_box">
                    <input type="password" id="password" name="password" placeholder="Password">
                </div>
                <div class="error_msg" id="error_password">
                    <p></p>
                </div>
                </td>
                </tr>

                <tr>
                <td>
                <div class="input_box">
                    <input type="password" id="confirm_password" name="confirm_password" placeholder="Confirm Password">
                </div>
                <div class="error_msg" id="error_confirm">
                    <p></p>
                </div>
                </td>
                </tr>

                <tr>
                <td>
                <button type="submit" class="btn">Register</button>
                </td>
                </tr>

                <tr>
                <td>
                <div class="have_account">
                    <p>Already have an <span class="i_block">account</span>? <a href="#">Sing in</a> </p>
                </div>
                </td>
                </tr>
                </table>
            </form>
        </div>
    </body>
</html>