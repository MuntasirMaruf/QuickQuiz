<!DOCTYPE html>
<html>
    <head>
        <title>Student Registration</title>
        <link rel="stylesheet" href="../css/regstyle.css">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>

    <body>
        <div class="wrapper">
            <form action="/webtech/quickquiz/views/action_page.php" method="POST" >
                <h1>Create a new account</h1>

                <div class="input_box">
                    <input type="text" id="username" name="username" placeholder="Student Name" required>
                </div>

                <div class="input_box">
                    <input type="text" id="email" name="email" placeholder="Email" required>
                </div>

                <div class="input_box">
                    <input type="date" id="birthday" name="birthday" style="width:99%">
                </div>

                <div class="gender_option">
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

                <div class="option_box">
                    <select name="course" id="course" style="width:100%">
                        <option value="" disabled selected>Select Course</option>
                        <option value="ssc">SSC Preparation</option>
                        <option value="hsc">HSC Preparation</option>
                        <option value="engnieering">Engnieering Preparation</option>
                        <option value="medical">Medical Preparation</option>
                    </select>
                </div>

                <div class="input_box">
                    <input type="password" id="password" name="password" placeholder="Password" required>
                </div>

                <div class="input_box">
                    <input type="password" id="confirm_password" name="confirm_password" placeholder="Confirm Password" required>
                </div>

                <button type="submit" class="btn">Register</button>

                <div class="have_account">
                    <p>Already have an account? <a href="#">Sing in</a> </p>
                </div>
            </form>
        </div>
        <img src="img_girl.jpg" style="max-width:100%;height:auto;">
    </body>
</html>