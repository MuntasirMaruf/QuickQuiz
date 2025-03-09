<!DOCTYPE html>
<head>
    <title>Student Registration</title>
    <link rel="stylesheet" href="style.css"/>
</head>
<body>
    <section class="container">
        <header>Student Registration</header>
        <form action="/webtech/quickquiz/views/action_page.php" class="form">
            <div class="input-box">
                <label for="fname">First Name:</label>
                <input type="text" id="fname" name="fname" placeholder="Enter first name">
            </div>

            <div class="input-box">
                <label for="lname">Last Name:</label>
                <input type="text" id="lname" name="lname" placeholder="Enter last name">
            </div>

            <div class="input-box">
                <label for="email">Email:</label>
                <input type="text" id="email" name="email" placeholder="Enter email">
            </div>

            <div class="column">
                <div class="input-box">
                    <label for="phone">Phone Number:</label>
                    <input type="text" id="phone" name="phone" placeholder="Enter phone number">
                </div>

                <div class="input-box">
                    <label for="dob">Date of Birth:</label>
                    <input type="text" id="dob" name="dob" placeholder="Enter date of birth">
                </div>
            </div>

            <div class="gender-box">
                <h3>Gender</h3>
                <div class="gender-option">
                    <div class="gender">
                        <input type="radio" id="gender_male" name="gender"/>
                        <label for="gender_male">Male</label>
                    </div>
                    <div class="gender">
                        <input type="radio" id="gender_female" name="gender"/>
                        <label for="gender_female">Female</label>
                    </div>
                    <div class="gender">
                        <input type="radio" id="gender_others" name="gender"/>
                        <label for="gender_others">Prefer not to say</label>
                    </div>
                </div>
            </div>
        </form>
    </section>
</body>
</html>