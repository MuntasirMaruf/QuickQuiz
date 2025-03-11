<!DOCTYPE html>
<html>
  <head>
    <title>Register to QuickQuiz</title>
  </head>

  <body>
    <section class="container">
      <h1>Student Registration Form</h1>

      <form action="/webtech/quickquiz/views/action_page.php" method="POST">
        <fieldset>
          <legend>Personal Information</legend><br>
          
          <div class="input_box">
            <label for="fname">First name:</label>
            <input type="text" id="fname" name="fname" placeholder="Enter first name"><br><br>
          </div>

          <div class="input_box">
            <label for="lname">Last name:</label>
            <input type="text" id="lname" name="lname" placeholder="Enter last name"><br><br>
          </div>
          
          <div class="input_box">
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" placeholder="Enter email"><br><br>
          </div>
          
          <div class="input_box">
            <label for="birthday">Birthday:</label>
            <input type="date" id="birthday" name="birthday" ><br><br>
          </div>

          <div class="gender_box">
            <label>Gender:</label>
            <div class="gender_option">
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
        </fieldset>

        <br>

        <fieldset>
          <legend>Academic Information</legend><br>

          <div class="input_box">
            <label for="school">School/College:</label>
            <input type="text" id="school" name="school" placeholder="ABC High School"><br><br>
          </div>

          <div class="option_box">
            <label for="course">Select a course:</label>
            <select name="course" id="course">
              <option value="ssc">SSC Preparation</option>
              <option value="hsc">HSC Preparation</option>
              <option value="engnieering">Engnieering Preparation</option>
              <option value="medical">Medical Preparation</option>
            </select>
          </div>

        </fieldset>
        
        <br>

        <fieldset>
            <legend>Account Information</legend><br>

            <div class="input_box">
              <label for="password">Create password:</lable>
              <input type="password" id="password" name="password" placeholder="Create a new password"><br><br>
            </div>
            
            <div class="input_box">
              <label for="re_password">Confirm password:</lable>
              <input type="password" id="re_password" name="re_password" placeholder="Re-type the password"><br><br>
            </div>
            
            <div class="input_box">
              <input type="checkbox" id="terms" name="terms" value="yes">
              <label for="terms">Accept terms and conditons</label>
            </div>

        </fieldset>
        <br>

        <div class="button">
          <input type="submit" value="Submit">
        </div>
      </form>
    </section>
  </body>
</html>