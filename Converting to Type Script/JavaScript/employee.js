
var selectedLetters = [];
function Filters() {
    document.querySelectorAll('.table-filters-list button').forEach(button => {
        button.addEventListener('click', function(event) {
            console.log("Filters eventlisterners adding")
            // event.preventDefault();
            var letter = this.textContent;
            // make that button active
            this.classList.add('filteractive');
            
            // If the letter is already selected, remove it from the array, otherwise add it
            var index = selectedLetters.indexOf(letter);
            if (index !== -1) {
                selectedLetters.splice(index, 1);
                this.classList.remove('filteractive');
            } else {
                selectedLetters.push(letter);
                this.classList.add('filteractive');
            }
            filterTableByFirstLetters(selectedLetters);
            console.log(selectedLetters);
            if (selectedLetters.length == 0) {
                var filtericon = document.getElementById('table-filters-icon');
                filtericon.style.filter = "";
            } else {
                var filtericon = document.getElementById('table-filters-icon');
                filtericon.style.filter = "invert(18%) sepia(98%) saturate(7171%) hue-rotate(359deg) brightness(101%) contrast(114%)";
            }
        });
    });
}


function resetFilters() {
    var statusSelect = document.getElementById('filter-Status');
    var locationSelect = document.getElementById('filter-Location');
    var departmentSelect = document.getElementById('filter-Department');
    statusSelect.selectedIndex = 0;
    locationSelect.selectedIndex = 0;
    departmentSelect.selectedIndex = 0;
    if (statusSelect.value == "" && locationSelect.value == "" && departmentSelect.value == "") {
        var filterinactive = document.getElementById('filters-reset-apply-buttons');
        filterinactive.style.display = "none";
    }
}


function filterTableByFirstLettersReset(){
    selectedLetters = [];
    filterTableByFirstLetters(selectedLetters);
    // remove filteractive from all the letters
    var buttons = document.querySelectorAll('.table-filters-list button');
    buttons.forEach(button => {
        button.classList.remove('filteractive');
    });
    var filtericon = document.getElementById('table-filters-icon');
    filtericon.style.filter = "";
    resetFilters();
}


function filterTableByFirstLetters(letters) {
    // Filter the emp_filter_sort_data array
    localdata = JSON.parse(localStorage.getItem("data"));
    let employees = localdata.Employees;
    if (letters.length > 0 && employees.length > 0) {
        emp_filter_sort_data = employees.filter(employee => {
            // Get the first letter of the employee's name
            var firstLetter = employee.firstname.trim().charAt(0).toUpperCase();

            // If the first letter is in the letters array, include the employee in the filtered data
            return letters.includes(firstLetter);
        });
    } else {
        emp_filter_sort_data = employees;
    }

    // Load the filtered data into the table
    LoadEmployeeDataByArray(emp_filter_sort_data);
    resetFilters();
}


function checkboxes() {
    document.getElementById('table-header-checkbox').addEventListener('change', function() {
        // Get all employee checkboxes
        var checkboxes = document.querySelectorAll('#employees-table tbody tr input[type="checkbox"]');
    
        checkboxes.forEach(checkbox => {
            checkbox.checked = this.checked;
        });
        if (document.getElementById('table-header-checkbox').checked) {
            var del = document.getElementById('emp-table-delete')
            del.classList.remove('lightred-red-button');
            del.classList.add('red-white-button');
        } else {
            var del = document.getElementById('emp-table-delete')
            del.classList.add('lightred-red-button');
            del.classList.remove('red-white-button');
        }
    });
}


function checkboxIsChecked(){
    // Get all employee checkboxes
    var checkboxes = document.querySelectorAll('#employees-table tbody tr input[type="checkbox"]');
    
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            // Get the parent checkbox
            var parentCheckbox = document.getElementById('table-header-checkbox');
    
            // Check if all child checkboxes are checked
            var allChecked = Array.from(checkboxes).every(checkbox => checkbox.checked);
    
            // Set the checked state of the parent checkbox
            parentCheckbox.checked = allChecked;

            // check if any checkbox is checked, then change the delete button color
            if (Array.from(checkboxes).some(checkbox => checkbox.checked)) {
                var del = document.getElementById('emp-table-delete')
                del.classList.remove('lightred-red-button');
                del.classList.add('red-white-button');
            } else {
                var del = document.getElementById('emp-table-delete')
                del.classList.add('lightred-red-button');
                del.classList.remove('red-white-button');
            }
        });
    });
}



function filtersReset() {
    // Get the select elements
    var statusSelect = document.getElementById('filter-Status');
    var locationSelect = document.getElementById('filter-Location');
    var departmentSelect = document.getElementById('filter-Department');
    statusSelect.selectedIndex = 0;
    locationSelect.selectedIndex = 0;
    departmentSelect.selectedIndex = 0;
    filterEmployeesTable();
    filterTableByFirstLetters(selectedLetters);
    if (statusSelect.value == "" && locationSelect.value == "" && departmentSelect.value == "") {
        var filterinactive = document.getElementById('filters-reset-apply-buttons');
        filterinactive.style.display = "none";
    }
}


function filterEmployeesTable() {
    // Get the select elements
    var statusSelect = document.getElementById('filter-Status').value;
    var locationSelect = document.getElementById('filter-Location').value;
    var departmentSelect = document.getElementById('filter-Department').value;
    

    // if statusSelect or locationSelect or departmentSelect is empty , then displya all employees table rows
    if (statusSelect === "" && locationSelect === "" && departmentSelect === "") {
        var rows = document.querySelectorAll('#employees-table tbody tr');
        rows.forEach(row => {
            row.style.display = '';
        });
    } else {
        // Get all the rows in the table
        var rows = document.querySelectorAll('#employees-table tbody tr');
        // Loop through each row
        rows.forEach(row => {
            // Get the cells in the row
            var statusCell = row.querySelector('td:nth-child(7)');
            var locationCell = row.querySelector('td:nth-child(3)');
            var departmentCell = row.querySelector('td:nth-child(4)');

            // If the statusCell or locationCell or departmentCell is not equal to the selected value, hide the row, otherwise show it
            if ((statusSelect !== "" && statusCell.textContent !== statusSelect) || (locationSelect !== "" && locationCell.textContent !== locationSelect) || (departmentSelect !== "" && departmentCell.textContent !== departmentSelect)) {
                row.style.display = 'none';
            } else {
                row.style.display = '';
            }
        });
    }
}



// below three functions ( populateFilterOptions , checkFilterStatus and LoadFilterOptions ) is used to display the filter fields in the table dynamically.

function populateFilterOptions(selector, filterId) {
    var cells = document.querySelectorAll(selector);
    var options = document.getElementById(filterId);
    var values = Array.from(cells).map(cell => cell.textContent);
    values = [...new Set(values)]; // remove duplicates
    values.forEach(value => {
        var option = document.createElement('option');
        option.value = value;
        option.textContent = value;
        options.appendChild(option);
    });
}

function checkFilterStatus() {
    var statusSelect = document.getElementById('filter-Status');
    var locationSelect = document.getElementById('filter-Location');
    var departmentSelect = document.getElementById('filter-Department');
    var filterButtons = document.getElementById('filters-reset-apply-buttons');
    filterButtons.style.display = (statusSelect.value || locationSelect.value || departmentSelect.value) ? "" : "none";
}

function LoadFilterOptions() {
    populateFilterOptions('#employees-table tbody tr td:nth-child(3)', 'filter-Location');
    populateFilterOptions('#employees-table tbody tr td:nth-child(4)', 'filter-Department');
    populateFilterOptions('#employees-table tbody tr td:nth-child(7)', 'filter-Status');

    // add eventlisteners to make the reset button and apply button work only when the status or location or  department is has value , if not disable the buttons
    ['filter-Status', 'filter-Location', 'filter-Department'].forEach(filterId => {
        document.getElementById(filterId).addEventListener('change', checkFilterStatus);
    });

    checkFilterStatus();
}





cPrev = -1; // global var saves the previous c, used to
        // determine if the same column is clicked again

function sortBy(c) {
    var table = document.getElementById("employees-table");
    var rows = table.rows.length; // num of rows
    var columns = table.rows[0].cells.length; // num of columns
    var arrTable = []; // create an empty 2d array

    for (var ro = 0; ro < rows; ro++) { // cycle through rows
        var row = table.rows[ro];
        if (row.style.display !== 'none') {
            var arrRow = [];
            for (var co = 0; co < columns; co++) { // cycle through columns
                // assign the value in each row-column to a 2d array by row-column
                arrRow[co] = row.cells[co].innerHTML;
            }
            arrTable.push(arrRow);
        }
    }

    th = arrTable.shift(); // remove the header row from the array, and save it
    
    if (c !== cPrev) { // different column is clicked, so sort by the new column
        arrTable.sort(
            function (a, b) {
                if (a[c] === b[c]) {
                    return 0;
                } else {
                    return (a[c] < b[c]) ? -1 : 1;
                }
            }
        );
    } else { // if the same column is clicked then reverse the array
        arrTable.reverse();
    }
    
    cPrev = c; // save in previous c

    arrTable.unshift(th); // put the header back in to the array

    // cycle through rows-columns placing values from the array back into the html table
    for (ro=0; ro<rows; ro++) {
        for (co=0; co<columns; co++) {
            document.getElementById("employees-table").rows[ro].cells[co].innerHTML = arrTable[ro][co];
        }
    }
}



// function to delete the selected employees
function deleteEmployees() {
    try {
        var checkboxes = document.querySelectorAll('#employees-table tbody tr input[type="checkbox"]');
        var data = JSON.parse(localStorage.getItem("data"));

        if (!data || !data.Employees) {
            console.error("No employee data found in local storage.");
            return;
        }

        var employees = data.Employees;
        var isEmployeeSelected = Array.from(checkboxes).some(checkbox => checkbox.checked);

        if (!isEmployeeSelected) {
            console.error("No employee selected for deletion.");
            return;
        }

        var confirmation = confirm("Are you sure you want to delete the selected employees?");
        if (!confirmation) {
            return;
        }

        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                employees = employees.filter(employee => employee.empid !== checkbox.id);
                console.log("employee: ", employees);
            }
        });

        data.Employees = employees;
        
        localStorage.setItem("data", JSON.stringify(data));
        EmployeeMenu();
        CustomAlert("success", "Selected employees deleted successfully.");
    } catch (error) {
        console.error("An error occurred while deleting employees: ", error);
    }
}

// function to delete the selected single employee.
function deleteEmployee(empid) {
    try {
        var confirmation = confirm("Are you sure you want to delete this ( "+ empid + " ) employee?");
        if (!confirmation) {
            return;
        }

        var data = JSON.parse(localStorage.getItem("data"));

        if (!data || !data.Employees) {
            CustomAlert("error" , "No employee data found in local storage.");
            return;
        }

        var employees = data.Employees;
        employees = employees.filter(employee => employee.empid !== empid);
        data.Employees = employees;
        
        localStorage.setItem("data", JSON.stringify(data));
        EmployeeMenu();
        CustomAlert("success", "Selected employee deleted successfully.");
    } catch (error) {
        CustomAlert("error" ,"An error occurred while deleting employees: " + error);
    }
}


function viewmore(empid){
    const divs = document.querySelectorAll(".emp-table-more");
    empid = empid + "_div";
    divs.forEach(div => {
        // div.style.display = "none";
        if (div.id !== empid) {
            div.style.display = "none";
        }
    });
    const divMore = document.querySelector("#"+empid);
    if (divMore.style.display == "none") {
        divMore.style.display = "flex";
    } else {
        divMore.style.display = "none";
    }
}


function EditEmployeeDetails(empid){
    const data = JSON.parse(localStorage.getItem("data"));
    if (!data || !data.Employees) {
        CustomAlert("error", "No employee data found in local storage.");
        return;
    }

    const employee = data.Employees.find(emp => emp.empid === empid);


    //load the addemployee.html file and fill the fileds with data.
    var mainContainer = document.querySelector(".main-content");
    fetch("HTML/AddEmployee.html")
        .then((res) => res.text())
        .then((data) => {
                mainContainer.innerHTML = data;
            })
        .then(() => {
                const employeeMenu = document.querySelector("#employee-menu");
                employeeMenu.classList.add("menuactive");
                const rolesMenu = document.querySelector("#roles-menu");
                rolesMenu.classList.remove("menuactive");
            })
        .then(() => {
            addemployeeFormSubmitValidation();
            })
        .then(() => {
            // get element by ID and set the value
            document.getElementById("add-employee-title").innerText = "Edit Employee";
            document.getElementById('form-submit').innerText = "Update Employee";
            document.getElementById('add-or-edit-employee-flag').value = "edit";
            document.getElementById('empid').value = employee.empid;
            document.getElementById('empid').setAttribute('readonly', 'readonly');
            document.getElementById('firstname').value = employee.firstname;
            document.getElementById('lastname').value = employee.lastname;
            document.getElementById('dob').value = employee.DOB;
            document.getElementById('email').value = employee.emailid;
            document.getElementById('mobile').value = employee.mobile;
            document.getElementById('joiningdate').value = employee.joining;
            document.getElementById('location').value = employee.location;
            document.getElementById('assignmanager').value = employee.AssignManager;
            document.getElementById('assignproject').value = employee.AssignProject;
            document.getElementById('department').value = employee.Department;
            document.getElementById('jobtitle').value = employee.jobtitle;
            document.getElementById('uploaded-img-preview').src = employee.profilepath;
            
        })
        .catch((error) => console.error('Error:', error));
}



