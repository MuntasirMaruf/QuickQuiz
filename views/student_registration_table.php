<!DOCTYPE html>
<html>
  <head>
    <title>Register to QuickQuiz</title>
    <link rel="stylesheet" href="../css/regstyle.css">
  </head>

  <body>
    <section class="container">
      <h1 Align="Center">Student Registration Form</h1>

      <form action="/webtech/quickquiz/views/action_page.php" method="POST">
        <fieldset>
        <table Border="0" style="width:25%">
          <tr>
            <th colspan="2">Personal Information</th>
          </tr>
            
          <tr>
            <td>
              <label for="fname">First name:</label>
            </td>
            <td>
              <div class="input_box">
                <input type="text" id="fname" name="fname" placeholder="Enter first name" style="width:98%">
              </div>
            </td>
          </tr>

          <tr>
            <td>
              <label for="lname">Last name:</label>
            </td>
            <td>
              <div class="input_box">
                <input type="text" id="lname" name="lname" placeholder="Enter last name" style="width:98%">
              </div>
            </td>
          </tr>

          <tr>
            <td>
              <label for="email">Email:</label>
            </td>
            <td>
              <div class="input_box">
                <input type="email" id="email" name="email" placeholder="Enter email" style="width:98%">
              </div>
            </td>
          </tr>

          <tr>
            <td>
              <label for="birthday">Birthday:</label>
            </td>
            <td>
              <div class="input_box">
                <input type="date" id="birthday" name="birthday" style="width:99%">
              </div>
            </td>
          </tr>

          <tr>
            <td>
              <label>Gender:</label>
            </td>
            <td>
              <div class="gender_option">
                <div class="gender">
                  <input type="radio" id="gender_male" name="gender" value="Male"/>
                  <label for="gender_male">Male</label>
                </div>
                <div class="gender">
                  <input type="radio" id="gender_female" name="gender" value="Female"/>
                  <label for="gender_female">Female</label>
                </div>
                <div class="gender">
                  <input type="radio" id="gender_others" name="gender" value="Female"/>
                  <label for="gender_others">Prefer not to say</label>
                </div>
              </div>
            </td>
          </tr>   
        </table>
        </fieldset><br>

        <fieldset>
        <table Border="0"  Align="Center" style="width:25%">
          <tr>
            <th colspan="2">Academic Information</th>
          </tr>
            
          <tr>
            <td>
              <label for="fname">School/College:</label>
            </td>
            <td>
              <div class="input_box">
                <input type="text" id="fname" name="fname" placeholder="Enter first name" style="width:98%">
              </div>
            </td>
          </tr>

          <tr>
            <td>
              <label for="course">Select a course:</label>
            </td>
            <td>
              <div class="option_box">
                <select name="course" id="course" style="width:100%">
                  <option value="ssc">SSC Preparation</option>
                  <option value="hsc">HSC Preparation</option>
                  <option value="engnieering">Engnieering Preparation</option>
                  <option value="medical">Medical Preparation</option>
                </select>
              </div>
            </td>
          </tr>
        </table>
        </fieldset><br>

        <fieldset>
        <table Border="0"  Align="Center" style="width:25%">
          <tr>
            <th colspan="2">Account Information</th>
          </tr>
            
          <tr>
            <td>
              <label for="password">Create password:</lable>
            </td>
            <td>
              <div class="input_box">
                <input type="password" id="password" name="password" placeholder="Create a new password" style="width:98%">
              </div>
            </td>
          </tr>

          <tr>
            <td>
              <label for="re_password">Confirm password:</lable>
            </td>
            <td>
              <div class="input_box">
                <input type="password" id="re_password" name="re_password" placeholder="Re-type the password" style="width:98%">
              </div>
            </td>
          </tr>

          <tr>
            <td colspan = "2">
              <div class="input_box">
                <input type="checkbox" id="terms" name="terms" value="yes"> 
                <label for="terms">Accept terms and conditons</label>
              </div>
            </td>
          </tr>

          <tr>
            <td colspan = "2" Align = "Center">
              <div class="button">
                <br>
                <input type="submit" value="Submit">
              </div>
            </td>
          </tr>
        </table>
        </fieldset>
      </form>
    </section>
  </body>
</html>