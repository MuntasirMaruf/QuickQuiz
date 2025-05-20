<?php
include '../controls/details_student.php';
?>
<!DOCTYPE html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Student Dashboard</title>
    <link rel="stylesheet" href="../css/studentstyle.css">
</head>
<body>
    <div class='topnav'>
        <a href='student_dashboard.php' class='active' name='dashboard_btn'>Dashboard</a>
            <a href='student_quizes.php' name='quizes_btn'>Quizes</a>
            <a href='student_results.php' name='results_btn'>Results</a>
            <a href='student_leaderboard.php' name='leaderboard_btn'>Leaderboard</a>
            <a href='student_profile.php' name="profile_btn">Profile</a>
    </div>

    <div class='container'>
        <h2>Hi <?php echo $username; ?>, welcome to your dashboard!</h2>

    </div>
    
</body>
</html>
