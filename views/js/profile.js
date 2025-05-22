function enableEdit() {

    const nameField = document.getElementsByName("username")[0];
    const emailField = document.getElementsByName("email")[0];
    const birthday = document.getElementsByName("birthday")[0];
    const gender = document.getElementsByName("gender")[0];
    const passwordField = document.getElementsByName("password")[0];
    const passwordConfirmField = document.getElementsByName("confirm_password")[0];


    const updateButton = document.getElementsByName("update_btn")[0]; 
    if (updateButton) {
        updateButton.disabled = false;
    }

    const deleteButton = document.getElementsByName("delete_btn")[0];
    if (deleteButton) {
        deleteButton.disabled = false;
    }


    const editButton = document.getElementsByName("edit_btn")[0];
    if (editButton) {
        editButton.disabled = true;
        nameField.disabled = false;
        emailField.disabled = false;    
        birthday.disabled = false;
        const genderRadios = document.getElementsByName("gender");
        for (let i = 0; i < genderRadios.length; i++) {
            genderRadios[i].disabled = false;
        }
        passwordField.disabled = false;
        passwordConfirmField.disabled = false;
        
    }
}

