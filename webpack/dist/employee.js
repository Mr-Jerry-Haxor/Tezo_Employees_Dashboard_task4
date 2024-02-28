"use strict";
// import { LoadEmployeeDataByArray} from "./data";
// import { addemployeeFormSubmitValidation } from "./addemployee";
// import { CustomAlert, EmployeeMenu } from "./index";
let selectedLetters = [];
function Filters() {
    document.querySelectorAll('.table-filters-list button').forEach((button) => {
        button.addEventListener('click', function (event) {
            console.log("Filters event listeners adding");
            const letter = this.textContent;
            const index = selectedLetters.indexOf(letter);
            if (index !== -1) {
                selectedLetters.splice(index, 1);
                this.classList.remove('filteractive');
            }
            else {
                selectedLetters.push(letter);
                this.classList.add('filteractive');
            }
            filterTableByFirstLetters(selectedLetters);
            console.log(selectedLetters);
            const filtericon = document.getElementById('table-filters-icon');
            if (selectedLetters.length == 0) {
                filtericon.style.filter = "";
            }
            else {
                filtericon.style.filter = "invert(18%) sepia(98%) saturate(7171%) hue-rotate(359deg) brightness(101%) contrast(114%)";
            }
        });
    });
}
function resetFilters() {
    const statusSelect = document.getElementById('filter-Status');
    const locationSelect = document.getElementById('filter-Location');
    const departmentSelect = document.getElementById('filter-Department');
    statusSelect.selectedIndex = 0;
    locationSelect.selectedIndex = 0;
    departmentSelect.selectedIndex = 0;
    if (statusSelect.value == "" && locationSelect.value == "" && departmentSelect.value == "") {
        const filterinactive = document.getElementById('filters-reset-apply-buttons');
        filterinactive.style.display = "none";
    }
}
function filterTableByFirstLettersReset() {
    selectedLetters = [];
    filterTableByFirstLetters(selectedLetters);
    const buttons = document.querySelectorAll('.table-filters-list button');
    buttons.forEach((button) => {
        button.classList.remove('filteractive');
    });
    const filtericon = document.getElementById('table-filters-icon');
    filtericon.style.filter = "";
    resetFilters();
}
function filterTableByFirstLetters(letters) {
    const localdata = JSON.parse(localStorage.getItem("data") || "{}");
    const employees = localdata.Employees;
    let emp_filter_sort_data; // Declare the variable here
    if (letters.length > 0 && employees.length > 0) {
        emp_filter_sort_data = employees.filter((employee) => {
            const firstLetter = employee.firstname.trim().charAt(0).toUpperCase();
            return letters.indexOf(firstLetter) !== -1; // Fix: Use indexOf instead of includes
        });
    }
    else {
        emp_filter_sort_data = employees;
    }
    LoadEmployeeDataByArray(emp_filter_sort_data);
    resetFilters();
}
function checkboxes() {
    var _a;
    (_a = document.getElementById('table-header-checkbox')) === null || _a === void 0 ? void 0 : _a.addEventListener('change', function () {
        var _a;
        const checkboxes = document.querySelectorAll('#employees-table tbody tr input[type="checkbox"]');
        checkboxes.forEach((checkbox) => {
            checkbox.checked = this.checked;
        });
        if ((_a = document.getElementById('table-header-checkbox')) === null || _a === void 0 ? void 0 : _a.checked) {
            const del = document.getElementById('emp-table-delete');
            del.classList.remove('lightred-red-button');
            del.classList.add('red-white-button');
        }
        else {
            const del = document.getElementById('emp-table-delete');
            del.classList.add('lightred-red-button');
            del.classList.remove('red-white-button');
        }
    });
}
function checkboxIsChecked() {
    const checkboxes = document.querySelectorAll('#employees-table tbody tr input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener('change', function () {
            const parentCheckbox = document.getElementById('table-header-checkbox');
            const checkboxes = document.querySelectorAll('#employees-table tbody tr input[type="checkbox"]');
            const allChecked = Array.from(checkboxes).every((checkbox) => checkbox.checked);
            parentCheckbox.checked = allChecked;
            if (Array.from(checkboxes).some((checkbox) => checkbox.checked)) {
                const del = document.getElementById('emp-table-delete');
                del.classList.remove('lightred-red-button');
                del.classList.add('red-white-button');
            }
            else {
                const del = document.getElementById('emp-table-delete');
                del.classList.add('lightred-red-button');
                del.classList.remove('red-white-button');
            }
        });
    });
}
function filtersReset() {
    const statusSelect = document.getElementById('filter-Status');
    const locationSelect = document.getElementById('filter-Location');
    const departmentSelect = document.getElementById('filter-Department');
    statusSelect.selectedIndex = 0;
    locationSelect.selectedIndex = 0;
    departmentSelect.selectedIndex = 0;
    filterEmployeesTable();
    filterTableByFirstLetters(selectedLetters);
    if (statusSelect.value == "" && locationSelect.value == "" && departmentSelect.value == "") {
        const filterinactive = document.getElementById('filters-reset-apply-buttons');
        filterinactive.style.display = "none";
    }
}
function filterEmployeesTable() {
    const statusSelect = document.getElementById('filter-Status').value;
    const locationSelect = document.getElementById('filter-Location').value;
    const departmentSelect = document.getElementById('filter-Department').value;
    if (statusSelect === "" && locationSelect === "" && departmentSelect === "") {
        const rows = document.querySelectorAll('#employees-table tbody tr');
        rows.forEach((row) => {
            row.style.display = '';
        });
    }
    else {
        const rows = document.querySelectorAll('#employees-table tbody tr');
        rows.forEach((row) => {
            const statusCell = row.querySelector('td:nth-child(7)');
            const locationCell = row.querySelector('td:nth-child(3)');
            const departmentCell = row.querySelector('td:nth-child(4)');
            if ((statusSelect !== "" && statusCell.textContent !== statusSelect) || (locationSelect !== "" && locationCell.textContent !== locationSelect) || (departmentSelect !== "" && departmentCell.textContent !== departmentSelect)) {
                row.style.display = 'none';
            }
            else {
                row.style.display = '';
            }
        });
    }
}
function populateFilterOptions(selector, filterId) {
    const cells = document.querySelectorAll(selector);
    const options = document.getElementById(filterId);
    let values = Array.from(cells).map((cell) => cell.textContent);
    values = [...new Set(values)];
    values.forEach((value) => {
        const option = document.createElement('option');
        option.value = value;
        option.textContent = value;
        options.appendChild(option);
    });
}
function checkFilterStatus() {
    const statusSelect = document.getElementById('filter-Status');
    const locationSelect = document.getElementById('filter-Location');
    const departmentSelect = document.getElementById('filter-Department');
    const filterButtons = document.getElementById('filters-reset-apply-buttons');
    filterButtons.style.display = (statusSelect.value || locationSelect.value || departmentSelect.value) ? "" : "none";
}
function LoadFilterOptions() {
    populateFilterOptions('#employees-table tbody tr td:nth-child(3)', 'filter-Location');
    populateFilterOptions('#employees-table tbody tr td:nth-child(4)', 'filter-Department');
    populateFilterOptions('#employees-table tbody tr td:nth-child(7)', 'filter-Status');
    ['filter-Status', 'filter-Location', 'filter-Department'].forEach((filterId) => {
        const filterElement = document.getElementById(filterId);
        if (filterElement) {
            filterElement.addEventListener('change', checkFilterStatus);
        }
    });
    checkFilterStatus();
}
let cPrev = -1;
function sortBy(c) {
    var _a;
    const table = document.getElementById("employees-table");
    const rows = table.rows.length;
    const columns = table.rows[0].cells.length;
    const arrTable = [];
    for (let ro = 0; ro < rows; ro++) {
        const row = table.rows[ro];
        if (row.style.display !== 'none') {
            const arrRow = [];
            for (let co = 0; co < columns; co++) {
                arrRow[co] = row.cells[co].innerHTML;
            }
            arrTable.push(arrRow);
        }
    }
    const th = arrTable.shift();
    cPrev = c;
    arrTable.unshift(th);
    for (let ro = 0; ro < rows; ro++) {
        for (let co = 0; co < columns; co++) {
            const table = document.getElementById("employees-table");
            if (table) {
                const cell = (_a = table.rows[ro]) === null || _a === void 0 ? void 0 : _a.cells[co];
                if (cell) {
                    cell.innerHTML = arrTable[ro][co];
                }
            }
        }
    }
}
function deleteEmployees() {
    try {
        const checkboxes = document.querySelectorAll('#employees-table tbody tr input[type="checkbox"]');
        const data = JSON.parse(localStorage.getItem("data") || "{}");
        if (!data || !data.Employees) {
            console.error("No employee data found in local storage.");
            return;
        }
        let employees = data.Employees;
        const isEmployeeSelected = Array.from(checkboxes).some((checkbox) => checkbox.checked);
        if (!isEmployeeSelected) {
            console.error("No employee selected for deletion.");
            return;
        }
        const confirmation = confirm("Are you sure you want to delete the selected employees?");
        if (!confirmation) {
            return;
        }
        checkboxes.forEach((checkbox) => {
            if (checkbox.checked) {
                employees = employees.filter((employee) => employee.empid !== checkbox.id);
                console.log("employee: ", employees);
            }
        });
        data.Employees = employees;
        localStorage.setItem("data", JSON.stringify(data));
        EmployeeMenu();
        CustomAlert("success", "Selected employees deleted successfully.");
    }
    catch (error) {
        console.error("An error occurred while deleting employees: ", error);
    }
}
function deleteEmployee(empid) {
    try {
        const confirmation = confirm("Are you sure you want to delete this ( " + empid + " ) employee?");
        if (!confirmation) {
            return;
        }
        const data = JSON.parse(localStorage.getItem("data") || "{}");
        if (!data || !data.Employees) {
            CustomAlert("error", "No employee data found in local storage.");
            return;
        }
        let employees = data.Employees;
        employees = employees.filter((employee) => employee.empid !== empid);
        data.Employees = employees;
        localStorage.setItem("data", JSON.stringify(data));
        EmployeeMenu();
        CustomAlert("success", "Selected employee deleted successfully.");
    }
    catch (error) {
        CustomAlert("error", "An error occurred while deleting employees: " + error);
    }
}
function viewmore(empid) {
    const divs = document.querySelectorAll(".emp-table-more");
    empid = empid + "_div";
    divs.forEach((div) => {
        if (div.id !== empid) {
            div.style.display = "none";
        }
    });
    const divMore = document.querySelector("#" + empid);
    if (divMore.style.display == "none") {
        divMore.style.display = "flex";
    }
    else {
        divMore.style.display = "none";
    }
}
function EditEmployeeDetails(empid) {
    const data = JSON.parse(localStorage.getItem("data") || "{}");
    if (!data || !data.Employees) {
        CustomAlert("error", "No employee data found in local storage.");
        return;
    }
    const employee = data.Employees.find((emp) => emp.empid === empid);
    const mainContainer = document.querySelector(".main-content");
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
        const addEmployeeTitle = document.getElementById("add-employee-title");
        const formSubmit = document.getElementById('form-submit');
        const addOrEditEmployeeFlag = document.getElementById('add-or-edit-employee-flag');
        const empid = document.getElementById('empid');
        const firstname = document.getElementById('firstname');
        const lastname = document.getElementById('lastname');
        const dob = document.getElementById('dob');
        const email = document.getElementById('email');
        const mobile = document.getElementById('mobile');
        const joiningdate = document.getElementById('joiningdate');
        const location = document.getElementById('location');
        const assignmanager = document.getElementById('assignmanager');
        const assignproject = document.getElementById('assignproject');
        const department = document.getElementById('department');
        const jobtitle = document.getElementById('jobtitle');
        const uploadedImgPreview = document.getElementById('uploaded-img-preview');
        if (addEmployeeTitle) {
            addEmployeeTitle.innerText = "Edit Employee";
        }
        if (formSubmit) {
            formSubmit.innerText = "Update Employee";
        }
        if (addOrEditEmployeeFlag) {
            addOrEditEmployeeFlag.value = "edit";
        }
        if (empid) {
            empid.value = employee.empid;
            empid.setAttribute('readonly', 'readonly');
        }
        if (firstname) {
            firstname.value = employee.firstname;
        }
        if (lastname) {
            lastname.value = employee.lastname;
        }
        if (dob) {
            dob.value = employee.DOB;
        }
        if (email) {
            email.value = employee.emailid;
        }
        if (mobile) {
            mobile.value = employee.mobile;
        }
        if (joiningdate) {
            joiningdate.value = employee.joining;
        }
        if (location) {
            location.value = employee.location;
        }
        if (assignmanager) {
            assignmanager.value = employee.AssignManager;
        }
        if (assignproject) {
            assignproject.value = employee.AssignProject;
        }
        if (department) {
            department.value = employee.Department;
        }
        if (jobtitle) {
            jobtitle.value = employee.jobtitle;
        }
        if (uploadedImgPreview) {
            uploadedImgPreview.src = employee.profilepath;
        }
    })
        .catch((error) => console.error('Error:', error));
}
