<?php
include '../controls/details_student.php';
?>

<!DOCTYPE html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Student Dashboard</title>
        <link rel="stylesheet" href="css/mainstyle.css">
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
            <div class="exam_option_box">
                <div class="exam_option zoom">
                    <a href="regular_exams.php" id="exam_option_1" name="exam_option_1"><img src="../res/exam_regular.jpg" alt="exam_option_1"></a>
                    <p id="option_1" name="option_1">Regular</p>
                </div>
                <div class="exam_option zoom">
                    <a href="" id="exam_option_2" name="exam_option_2"><img src="../res/exam_challenging.jpg" alt="exam_option_2"></a>
                    <p id="option_2" name="option_2">Challenging</p>
                </div>
                <div class="exam_option zoom">
                    <a href="" id="exam_option_3" name="exam_option_3"><img src="../res/exam_hardcore.jpg" alt="exam_option_3"></a>
                    <p id="option_3" name="option_3">Hardcore</p>
                </div>
            </div>
        </div>
    </body>
</html>