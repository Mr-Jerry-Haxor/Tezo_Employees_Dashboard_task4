
function getFieldValue(fieldId) {
    return document.getElementById(fieldId).value;
}


function addEmployee() {
    const fields = ['empid', 'firstname', 'lastname', 'dob', 'email', 'mobile' , 'joiningdate', 'location', 'department'];
    let isValid = true;
    let employee = {};

    fields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        const errorSpan = document.getElementById(`${fieldId}-span`);

        if (field.value.trim() === '') {
            field.classList.add('err');
            errorSpan.innerHTML = `<img src='assets/exclamation-mark-diamond.svg' alt='error' style='height:15px' > This ${fieldId} field is required`;
            isValid = false;
        } else if (!field.checkValidity()) {
            field.classList.add('err');
            errorSpan.innerHTML = `<img src='assets/exclamation-mark-diamond.svg' alt='error' style='height:15px' > Please enter the valid data`;
            isValid = false;
        } else {
            field.classList.remove('err');
            errorSpan.innerText = '';
        }
    });

    var data = JSON.parse(localStorage.getItem("data"));
    var employees = data ? data.Employees : null;

    if (data && employees) {
        var exists = false;
        var empid = getFieldValue('empid');
        var AddOrEditFlag = getFieldValue('add-or-edit-employee-flag');
        employees.forEach(employee => {
            if (employee.empid === empid && AddOrEditFlag === "add") {
                CustomAlert('error', 'Employee ID already exists');
                exists = true;
                return false;
            }
        }); 

        if (AddOrEditFlag === "add" && isValid && !exists) {
            employee = {
                "empid": getFieldValue('empid'),
                "firstname": getFieldValue('firstname'),
                "lastname": getFieldValue('lastname'),
                "DOB": getFieldValue('dob'),
                "emailid": getFieldValue('email'),
                "mobile": getFieldValue('mobile'),
                "location": getFieldValue('location'),
                "Department": getFieldValue('department'),
                "jobtitle": getFieldValue('jobtitle'),
                "profilepath": document.getElementById('uploaded-img-preview').src,
                "joining": getFieldValue('joiningdate'),
                "AssignManager": getFieldValue('assignmanager'),
                "AssignProject": getFieldValue('assignproject'),
                "status": "Active"
            };

            let localdata = JSON.parse(localStorage.getItem("data"));
            localdata.Employees.push(employee);
            localStorage.setItem("data", JSON.stringify(localdata));

            EmployeeMenu();
            CustomAlert('success', 'Employee added successfully');
        } else if (AddOrEditFlag === "edit" && isValid) {
            let employee = employees.find(emp => emp.empid === empid);
            Object.assign(employee, {
                "empid": getFieldValue('empid'),
                "firstname": getFieldValue('firstname'),
                "lastname": getFieldValue('lastname'),
                "DOB": getFieldValue('dob'),
                "emailid": getFieldValue('email'),
                "mobile": getFieldValue('mobile'),
                "location": getFieldValue('location'),
                "Department": getFieldValue('department'),
                "jobtitle": getFieldValue('jobtitle'),
                "profilepath": document.getElementById('uploaded-img-preview').src,
                "joining": getFieldValue('joiningdate'),
                "AssignManager": getFieldValue('assignmanager'),
                "AssignProject": getFieldValue('assignproject'),
                "status": "Active"
            });

            localStorage.setItem("data", JSON.stringify(data));

            EmployeeMenu();
            CustomAlert('success', 'Employee updated successfully');
        }
    } else {
        console.error('Data or Employees is null');
    }
}



function addEmployeeEventListeners() {
    const fields = ['empid', 'firstname', 'lastname', 'dob', 'email', 'mobile' , 'joiningdate', 'location', 'department'];
    const fieldsinfo = {
        'empid': 'Invalid Format, Only TZ123456 allowed',
        'firstname': 'Invalid Format, Only alphabets allowed',
        'lastname': 'Invalid Format, Only alphabets allowed',
        'dob': 'Invalid Format, Only DD/MM/YYYY allowed',
        'email': 'Invalid Format, Only joe.a@technovert.com allowed',
        'mobile': 'Invalid Format, Only digits allowed',
        'joiningdate': 'Invalid Format, Only DD/MM/YYYY allowed',
        'location': 'Invalid Format, Only alphabets allowed',
        'department': 'Invalid Format, Only alphabets allowed'
    }

    fields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        const errorSpan = document.getElementById(`${fieldId}-span`);

        field.addEventListener('input', () => {
            if (field.value.trim() === '') {
                field.classList.add('err');
                errorSpan.innerHTML = `<img src='assets/exclamation-mark-diamond.svg' alt='error' style='height:15px' > This ${fieldId} field is required`;
            } else if (!field.checkValidity()) {
                field.classList.add('err');
                errorSpan.innerHTML = `<img src='assets/exclamation-mark-diamond.svg' alt='error' style='height:15px' > ${fieldsinfo[fieldId]}`;
            } else {
                field.classList.remove('err');
                errorSpan.innerText = '';
            }
        });
    });

    //add data of birth validation eventlistner
    document.getElementById('dob').addEventListener('input', function() {
        // check if the  date is valid and has 18+ years for the present date
        var dob = document.getElementById('dob').value;
        var today = new Date();
        var dob = new Date(dob.split('/').reverse().join('-'));
        var checkdate = dob.getDate();
        var age = today.getFullYear() - dob.getFullYear();
        var m = today.getMonth() - dob.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
            age--;
        }
        if (age < 18) {
            document.getElementById('dob').classList.add('err');
            document.getElementById('dob-span').innerHTML = "<img src='assets/exclamation-mark-diamond.svg' alt='error' style='height:15px' > " + "You must be 18 years or older to register";
        } else if (age >= 18){
            document.getElementById('dob').classList.remove('err');
            document.getElementById('dob-span').innerText = '';
        } else {
            document.getElementById('dob').classList.add('err');
            document.getElementById('dob-span').innerHTML = "<img src='assets/exclamation-mark-diamond.svg' alt='error' style='height:15px' > " + "Invalid Date , Only DD/MM/YYYY allowed";
        }
        
        document.getElementById('dob').value = document.getElementById('dob').value.replace(/^(\d\d)(\d)$/g,'$1/$2').replace(/^(\d\d\/\d\d)(\d+)$/g,'$1/$2').replace(/[^\d\/]/g,'');
    });
}


function addemployeeFormSubmitValidation(){
    const form = document.getElementById('add-employee-form');

    form.addEventListener('submit', event => {
        event.preventDefault();
        addEmployeeEventListeners();
    });

    form.addEventListener("keypress", event => {
        if (event.key === "Enter") {
            event.preventDefault();
        }
    });
}

