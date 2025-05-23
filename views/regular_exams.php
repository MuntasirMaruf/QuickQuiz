<?php
include '../controls/details_student.php';
?>

<!DOCTYPE html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Student Dashboard</title>
        <link rel="stylesheet" href="css/studentstyle.css">
        <link rel="stylesheet" href="css/examstyle.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
    </head>
    <body>
        <div class="left_panel">
            <a href="student_exams.php" name='home_icon'><i class="fas fa-house"></i></a>
            <a href="student_exams.php" class="exam_link selected" name='exams_btn'><i class="fas fa-pen-to-square"></i>Exams</a>
            <a href="student_results.php" class="exam_link" name='results_btn'><i class="fas fa-square-check"></i>Results</a>
            <a href="student_history.php" class="exam_link" name='history_btn'><i class="fas fa-history"></i>History</a>
        </div>
        <div class='topnav'>
            <a href="student_exams.php" id="back_btn" name="back_btn"><i class="fas fa-square-caret-left"></i></a>
            <div class="search_bar">
                <i class="fas fa-search"></i>
                <input type="text" id="search_exam" name="search_exam" placeholder="Search for exams...">
            </div>

            <div class="sort_bar">
                <select class="search_box" id="select_sort_by" name="select_sort_by">
                    <option value="date">Sort by Date</option>
                    <option value="name">Sort by Name</option>
                </select>
            </div>

            <div class="profile_bar">
                <i class="fas fa-user"></i>
                <a class="profile_name" href="student_profile.php">Account</a>
            </div>
        </div>
        <div class="right_panel">
            <h1>Regular Exams</h1>
            <div class="exam_container">
                <div class="exam_item">

                </div>
            </div>
            
        </div>
    </body>
</html>