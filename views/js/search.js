let exams = [];

const xmlhttp = new XMLHttpRequest();
xmlhttp.onload = function() {
    if (this.readyState === 4 && this.status === 200) {
        exams = JSON.parse(this.responseText);
        displayExams(exams);
    } else {
        console.error("Error fetching exam data: " + this.statusText);
    }
};
xmlhttp.open("GET", "../models/exam_db.php");
xmlhttp.send();

function displayExams(examList) {
    const examContainer = document.querySelector(".exam_container");
    examContainer.innerHTML = "";

    for (let i = 0; i < examList.length; i++) {
        const exam = examList[i];
        const examDiv = document.createElement("div");
        examDiv.className = "exam_item";
        examDiv.innerHTML = `
            <div class="exam_details">
                <div class="details_col">
                    <h2>${exam.Title}</h2>
                    <h3>${exam.Subject}</h3>
                    <p>Chapters: ${exam.Chapters}</p>
                </div>
                <div class="details_col">
                    <p>Date: ${exam.Date}</p>
                    <p>Duretion: ${exam.Duration} Hours</p>
                    <p>Questions: ${exam.Questions}</p>
                    <p>Marks: ${exam.Marks}</p>
                </div>
            </div>
            <div class="exam_actions">
                <button class="exam_button">Take</button>
            </div>
        `;
        examContainer.appendChild(examDiv);
    }
}

function searchExam(inputVal) {
    const searchBy = document.getElementById("select_search_by").value; 
    console.log("Searching by:", searchBy, "with value:", inputVal);
    
    const searchedExams = [];

    if(inputVal.length > 0) {
        for (let i = 0; i < exams.length; i++) {
            const exam = exams[i];
            const fieldValue = exam[searchBy];
            console.log(`Exam ${i}:`, fieldValue);
            if (fieldValue && fieldValue.toString().toLowerCase().includes(inputVal.toLowerCase())) {
                searchedExams.push(exam);
            }
        }
        console.log("Filtered exams:", searchedExams);
        displayExams(searchedExams);
    } else {
        console.log("Input empty, displaying all exams");
        displayExams(exams);
    }
}


