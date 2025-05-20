<?php
include "../controls/details_student.php";
?>

<!DOCTYPE html>
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
            <h1>Student Profile</h1>
            <p>Welcome, <?php echo $username; ?>!</p>
            <p>Email: <?php echo $email; ?></p>
            <p>Phone: <?php echo $birthday; ?></p>
            <p>Address: <?php echo $gender; ?></p>
            <a href="edit_profile.php" name="edit_btn">Edit Profile</a>
            <a href="../controls/logout.php" name="logout_btn">Logout</a>
        </div>

    </body>
</html>
