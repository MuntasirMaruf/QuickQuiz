<!DOCTYPE html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Student Dashboard</title>
        <link rel="stylesheet" href="css/mainstyle.css">
        <link rel="stylesheet" href="css/examstyle.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
        <script src="js/search.js"></script>
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
                <input type="text" id="search_exam" name="search_exam" placeholder="Search for exams..." onkeyup="searchExam(this.value)">
            </div>

            <div class="sort_bar">
                <select class="search_box" id="select_search_by" name="select_search_by">
                    <option value="Title">Search by Title</option>
                    <option value="Subject">Search by Subject</option>
                    <option value="Date">Search by Date</option>
                    <option value="Marks">Search by Marks</option>
                    <option value="Questions">Search by Question</option>
                </select>
            </div>

            <div class="profile_bar">
                <i class="fas fa-user"></i>
                <a class="profile_name" href="student_profile.php">Account</a>
            </div>
        </div>
        <div class="exam_right_panel">
            <h1>Regular Exams</h1>
            <div class="exam_container">
                <div class="exam_item">
                    <div class="exam_details">
                        <div class="details_col">
                            <h2 id="exam_title" name="exam_title">Title</h2>
                            <h3 id="exam_subject" name="exam_subject">Mathematics</h3>
                            <p id="exam_chapters" name="exam_chapters">Chapters</p>
                        </div>
                        <div class="details_col">
                            <p id="exam_date" name="exam_date">Date: 2023-10-15</p>
                            <p id="exam_time" name="exam_time">Duration: 10:00 AM - 12:00 PM</p>
                            <p id="exam_questions" name="exam_questions">Marks: 150</p>
                            <p id="exam_marks" name="exam_marks">Marks: 150</p>
                        </div>
                    </div>
                    <div class="exam_actions">
                        <button class="exam_button">Take</button>
                    </div>
                </div>
            </div>   
        </div>
    </body>
</html>