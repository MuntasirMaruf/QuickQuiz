<!DOCTYPE html>
<html>
    <head>Register to QuickQuiz</head>
<body>

<h1>Student Registration Form</h1>

<form action="/webtech/quickquiz/action_page.php" method="GET">
 <fieldset>
  <legend>Personal Information</legend><br>

  <label for="fname">First name:</label>
  <input type="text" id="fname" name="fname" value="John"><br><br>

  <label for="lname">Last name:</label>
  <input type="text" id="lname" name="lname" value="Doe"><br><br>

  <label for="email">Email:</label>
  <input type="email" id="email" name="email" value="john@email.com"><br><br>

  <label for="birthday">Birthday:</label>
  <input type="date" id="birthday" name="birthday" value="3-6-2025"><br><br>

  <label for="gender">Gender:</label>
  
  <input type="radio" id="gender_male" name="gender" value="Male">
  <label for="gender">Male</label>

  <input type="radio" id="gender_female" name="gender" value="Female">
  <label for="gender">Female</label>

  <input type="radio" id="gender_others" name="gender" value="Others">
  <label for="gender">Others</label>
  
 </fieldset>

 <br>

 <fieldset>
  <legend>Academic Information</legend><br>

  <label for="school">School:</label>
  <input type="text" id="school" name="school" value="Null"><br><br>

  <label for="course">Select a course:</label>
  <select name="course" id="course">
    <option value="ssc">SSC Preparation</option>
    <option value="hsc">HSC Preparation</option>
    <option value="engnieering">Engnieering Preparation</option>
    <option value="medical">Medical Preparation</option>
  </select>

 </fieldset>
 
 <br>

 <fieldset>
    <legend>Account Information</legend><br>

    <label for="password">Create password:</lable>
    <input type="password" id="password" name="password" value=1234><br><br>

    <label for="re_password">Confirm password:</lable>
    <input type="password" id="re_password" name="re_password" value=1234><br><br>

    <input type="checkbox" id="terms" name="conditon" value="yes">
    <label for="conditon">Accept terms and conditons</label>

</fieldset>
<br>
 <input type="submit" value="Submit">
</form>

</body>
</html>