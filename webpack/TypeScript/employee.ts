import { dataclass } from "./data.js";
import { addemployeeclass } from "./addemployee.js";
import { indexclass } from "./index.js";

export class employeeclass{
    indexobj: indexclass;
    addemployeeobj: addemployeeclass;
    dataobj: dataclass;

    selectedLetters: string[];
    cPrev: number;

    constructor() {
        this.indexobj = new indexclass();
        this.addemployeeobj = new addemployeeclass();
        this.dataobj = new dataclass();

        this.selectedLetters = []; // initialize it in the constructor
        this.cPrev = -1;
    }

    Filters(): void {
        (document.querySelectorAll('.table-filters-list button') as NodeListOf<HTMLButtonElement>).forEach((button: HTMLButtonElement) => {
            button.addEventListener('click', (event: Event) => {
                console.log("Filters event listeners adding");
                const letter: string = button.textContent!;
                const index: number = this.selectedLetters.indexOf(letter);
                if (index !== -1) {
                    this.selectedLetters.splice(index, 1);
                    button.classList.remove('filteractive');
                } else {
                    this.selectedLetters.push(letter);
                    button.classList.add('filteractive');
                }
                this.filterTableByFirstLetters(this.selectedLetters);
                console.log(this.selectedLetters);

                const filtericon: HTMLElement = document.getElementById('table-filters-icon')!;
                if (this.selectedLetters.length == 0) {
                    filtericon.style.filter = "";
                } else {
                    filtericon.style.filter = "invert(18%) sepia(98%) saturate(7171%) hue-rotate(359deg) brightness(101%) contrast(114%)";
                }
            });
        });
    }

    resetFilters(): void {
        const statusSelect: HTMLSelectElement = document.getElementById('filter-Status') as HTMLSelectElement;
        const locationSelect: HTMLSelectElement = document.getElementById('filter-Location') as HTMLSelectElement;
        const departmentSelect: HTMLSelectElement = document.getElementById('filter-Department') as HTMLSelectElement;
        statusSelect.selectedIndex = 0;
        locationSelect.selectedIndex = 0;
        departmentSelect.selectedIndex = 0;
        if (statusSelect.value == "" && locationSelect.value == "" && departmentSelect.value == "") {
            const filterinactive: HTMLElement = document.getElementById('filters-reset-apply-buttons')!;
            filterinactive.style.display = "none";
        }
    }

    filterTableByFirstLettersReset(): void {
        this.selectedLetters = [];
        this.filterTableByFirstLetters(this.selectedLetters);
        const buttons: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.table-filters-list button');
        buttons.forEach((button: HTMLButtonElement) => {
            button.classList.remove('filteractive');
        });
        const filtericon: HTMLElement = document.getElementById('table-filters-icon')!;
        filtericon.style.filter = "";
        this.resetFilters();
    }


    filterTableByFirstLetters(letters: string[]): void {
        const localdata: any = JSON.parse(localStorage.getItem("data") || "{}");
        const employees: any[] = localdata.Employees;
        let emp_filter_sort_data: any[]; // Declare the variable here

        if (letters.length > 0 && employees.length > 0) {
            emp_filter_sort_data = employees.filter((employee: any) => {
                const firstLetter: string = employee.firstname.trim().charAt(0).toUpperCase();
                return letters.indexOf(firstLetter) !== -1; // Fix: Use indexOf instead of includes
            });
        } else {
            emp_filter_sort_data = employees;
        }
        this.dataobj.LoadEmployeeDataByArray(emp_filter_sort_data);
        this.resetFilters();
    }

    checkboxes(): void {
        document.getElementById('table-header-checkbox')?.addEventListener('change', () => {
            const checkboxes: NodeListOf<HTMLInputElement> = document.querySelectorAll('#employees-table tbody tr input[type="checkbox"]');
            checkboxes.forEach((checkbox: HTMLInputElement) => {
                checkbox.checked = (document.getElementById('table-header-checkbox') as HTMLInputElement)?.checked;
            });
            if ((document.getElementById('table-header-checkbox') as HTMLInputElement)?.checked) {
                const del: HTMLElement = document.getElementById('emp-table-delete')!;
                del.classList.remove('lightred-red-button');
                del.classList.add('red-white-button');
            } else {
                const del: HTMLElement = document.getElementById('emp-table-delete')!;
                del.classList.add('lightred-red-button');
                del.classList.remove('red-white-button');
            }
        });
    }

    checkboxIsChecked(): void {
        const checkboxes: NodeListOf<HTMLInputElement> = document.querySelectorAll('#employees-table tbody tr input[type="checkbox"]');
        checkboxes.forEach((checkbox: HTMLInputElement) => {
            checkbox.addEventListener('change', () => {
                const parentCheckbox: HTMLInputElement = document.getElementById('table-header-checkbox') as HTMLInputElement;
                const checkboxes: NodeListOf<HTMLInputElement> = document.querySelectorAll('#employees-table tbody tr input[type="checkbox"]');
                const allChecked: boolean = Array.from(checkboxes).every((checkbox: HTMLInputElement) => checkbox.checked);
                parentCheckbox.checked = allChecked;
                if (Array.from(checkboxes).some((checkbox: HTMLInputElement) => checkbox.checked)) {
                    const del: HTMLElement = document.getElementById('emp-table-delete')!;
                    del.classList.remove('lightred-red-button');
                    del.classList.add('red-white-button');
                } else {
                    const del: HTMLElement = document.getElementById('emp-table-delete')!;
                    del.classList.add('lightred-red-button');
                    del.classList.remove('red-white-button');
                }
            });
        });
    }

    filtersReset(): void {
        const statusSelect: HTMLSelectElement = document.getElementById('filter-Status') as HTMLSelectElement;
        const locationSelect: HTMLSelectElement = document.getElementById('filter-Location') as HTMLSelectElement;
        const departmentSelect: HTMLSelectElement = document.getElementById('filter-Department') as HTMLSelectElement;
        statusSelect.selectedIndex = 0;
        locationSelect.selectedIndex = 0;
        departmentSelect.selectedIndex = 0;
        this.filterEmployeesTable();
        this.filterTableByFirstLetters(this.selectedLetters);
        if (statusSelect.value == "" && locationSelect.value == "" && departmentSelect.value == "") {
            const filterinactive: HTMLElement = document.getElementById('filters-reset-apply-buttons')!;
            filterinactive.style.display = "none";
        }
    }

    filterEmployeesTable(): void {
        const statusSelect: string = (document.getElementById('filter-Status') as HTMLSelectElement).value;
        const locationSelect: string = (document.getElementById('filter-Location') as HTMLSelectElement).value;
        const departmentSelect: string = (document.getElementById('filter-Department') as HTMLSelectElement).value;
        if (statusSelect === "" && locationSelect === "" && departmentSelect === "") {
            const rows: NodeListOf<HTMLElement> = document.querySelectorAll('#employees-table tbody tr');
            rows.forEach((row: HTMLElement) => {
                row.style.display = '';
            });
        } else {
            const rows: NodeListOf<HTMLElement> = document.querySelectorAll('#employees-table tbody tr');
            rows.forEach((row: HTMLElement) => {
                const statusCell: HTMLElement = row.querySelector('td:nth-child(7)')!;
                const locationCell: HTMLElement = row.querySelector('td:nth-child(3)')!;
                const departmentCell: HTMLElement = row.querySelector('td:nth-child(4)')!;
                if ((statusSelect !== "" && statusCell.textContent !== statusSelect) || (locationSelect !== "" && locationCell.textContent !== locationSelect) || (departmentSelect !== "" && departmentCell.textContent !== departmentSelect)) {
                    row.style.display = 'none';
                } else {
                    row.style.display = '';
                }
            });
        }
    }

    populateFilterOptions(selector: string, filterId: string): void {
        const cells: NodeListOf<HTMLElement> = document.querySelectorAll(selector);
        const options: HTMLSelectElement = document.getElementById(filterId) as HTMLSelectElement;
        let values: (string | null)[] = Array.from(cells).map((cell: HTMLElement) => cell.textContent);
        values = [...new Set(values)];
        values.forEach((value: string | null) => {
            const option: HTMLOptionElement = document.createElement('option');
            option.value = value!;
            option.textContent = value;
            options.appendChild(option);
        });
    }

    checkFilterStatus(): void {
        const statusSelect: HTMLSelectElement = document.getElementById('filter-Status') as HTMLSelectElement;
        const locationSelect: HTMLSelectElement = document.getElementById('filter-Location') as HTMLSelectElement;
        const departmentSelect: HTMLSelectElement = document.getElementById('filter-Department') as HTMLSelectElement;
        const filterButtons: HTMLElement = document.getElementById('filters-reset-apply-buttons')!;
        filterButtons.style.display = (statusSelect.value || locationSelect.value || departmentSelect.value) ? "" : "none";
    }

    LoadFilterOptions(): void {
        this.populateFilterOptions('#employees-table tbody tr td:nth-child(3)', 'filter-Location');
        this.populateFilterOptions('#employees-table tbody tr td:nth-child(4)', 'filter-Department');
        this.populateFilterOptions('#employees-table tbody tr td:nth-child(7)', 'filter-Status');
        ['filter-Status', 'filter-Location', 'filter-Department'].forEach((filterId: string) => {
            const filterElement = document.getElementById(filterId);
            if (filterElement) {
                filterElement.addEventListener('change', this.checkFilterStatus);
            }
        });
        this.checkFilterStatus();
    }


    sortBy(c: number): void {
        const table: HTMLTableElement = document.getElementById("employees-table") as HTMLTableElement;
        const rows: number = table.rows.length;
        const columns: number = table.rows[0].cells.length;
        const arrTable: string[][] = [];

        for (let ro = 0; ro < rows; ro++) {
            const row: HTMLTableRowElement = table.rows[ro];
            if (row.style.display !== 'none') {
                const arrRow: string[] = [];
                for (let co = 0; co < columns; co++) {
                    arrRow[co] = row.cells[co].innerHTML;
                }
                arrTable.push(arrRow);
            }
        }

        const th: string[] = arrTable.shift() as string[];

        this.cPrev = c;

        arrTable.unshift(th);

        for (let ro = 0; ro < rows; ro++) {
            for (let co = 0; co < columns; co++) {
                const table = document.getElementById("employees-table") as HTMLTableElement;
                if (table) {
                    const cell = table.rows[ro]?.cells[co];
                    if (cell) {
                        cell.innerHTML = arrTable[ro][co];
                    }
                }
            }
        }
    }

    deleteEmployees(): void {
        try {
            const checkboxes: NodeListOf<HTMLInputElement> = document.querySelectorAll('#employees-table tbody tr input[type="checkbox"]');
            const data: any = JSON.parse(localStorage.getItem("data") || "{}");

            if (!data || !data.Employees) {
                console.error("No employee data found in local storage.");
                return;
            }

            let employees: any[] = data.Employees;
            const isEmployeeSelected: boolean = Array.from(checkboxes).some((checkbox: HTMLInputElement) => checkbox.checked);

            if (!isEmployeeSelected) {
                console.error("No employee selected for deletion.");
                return;
            }

            const confirmation: boolean = confirm("Are you sure you want to delete the selected employees?");
            if (!confirmation) {
                return;
            }

            checkboxes.forEach((checkbox: HTMLInputElement) => {
                if (checkbox.checked) {
                    employees = employees.filter((employee: any) => employee.empid !== checkbox.id);
                    console.log("employee: ", employees);
                }
            });

            data.Employees = employees;

            localStorage.setItem("data", JSON.stringify(data));
            this.indexobj.EmployeeMenu();
            this.indexobj.CustomAlert("success", "Selected employees deleted successfully.");
        } catch (error) {
            console.error("An error occurred while deleting employees: ", error);
        }
    }

    deleteEmployee(empid: string): void {
        try {
            const confirmation: boolean = confirm("Are you sure you want to delete this ( " + empid + " ) employee?");
            if (!confirmation) {
                return;
            }

            const data: any = JSON.parse(localStorage.getItem("data") || "{}");

            if (!data || !data.Employees) {
                this.indexobj.CustomAlert("error", "No employee data found in local storage.");
                return;
            }

            let employees: any[] = data.Employees;
            employees = employees.filter((employee: any) => employee.empid !== empid);
            data.Employees = employees;

            localStorage.setItem("data", JSON.stringify(data));
            this.indexobj.EmployeeMenu();
            this.indexobj.CustomAlert("success", "Selected employee deleted successfully.");
        } catch (error) {
            this.indexobj.CustomAlert("error", "An error occurred while deleting employees: " + error);
        }
    }

    viewmore(empid: string): void {
        const divs: NodeListOf<HTMLElement> = document.querySelectorAll(".emp-table-more");
        empid = empid + "_div";
        divs.forEach((div: HTMLElement) => {
            if (div.id !== empid) {
                div.style.display = "none";
            }
        });
        const divMore: HTMLElement = document.querySelector("#" + empid)!;
        if (divMore.style.display == "none") {
            divMore.style.display = "flex";
        } else {
            divMore.style.display = "none";
        }
    }

    EditEmployeeDetails(empid: string): void {
        const data: any = JSON.parse(localStorage.getItem("data") || "{}");
        if (!data || !data.Employees) {
            this.indexobj.CustomAlert("error", "No employee data found in local storage.");
            return;
        }

        const employee: any = data.Employees.find((emp: any) => emp.empid === empid);

        const mainContainer: HTMLElement = document.querySelector(".main-content")!;
        fetch("HTML/AddEmployee.html")
            .then((res: Response) => res.text())
            .then((data: string) => {
                mainContainer.innerHTML = data;
            })
            .then(() => {
                const employeeMenu: HTMLElement = document.querySelector("#employee-menu")!;
                employeeMenu.classList.add("menuactive");
                const rolesMenu: HTMLElement = document.querySelector("#roles-menu")!;
                rolesMenu.classList.remove("menuactive");
            })
            .then(() => {
                this.addemployeeobj.addemployeeFormSubmitValidation();
            })
            .then(() => {
                const addEmployeeTitle = document.getElementById("add-employee-title");
                const formSubmit = document.getElementById('form-submit');
                const addOrEditEmployeeFlag = document.getElementById('add-or-edit-employee-flag') as HTMLInputElement;
                const empid = document.getElementById('empid') as HTMLInputElement;
                const firstname = document.getElementById('firstname') as HTMLInputElement;
                const lastname = document.getElementById('lastname') as HTMLInputElement;
                const dob = document.getElementById('dob') as HTMLInputElement;
                const email = document.getElementById('email') as HTMLInputElement;
                const mobile = document.getElementById('mobile') as HTMLInputElement;
                const joiningdate = document.getElementById('joiningdate') as HTMLInputElement;
                const location = document.getElementById('location') as HTMLInputElement;
                const assignmanager = document.getElementById('assignmanager') as HTMLInputElement;
                const assignproject = document.getElementById('assignproject') as HTMLInputElement;
                const department = document.getElementById('department') as HTMLInputElement;
                const jobtitle = document.getElementById('jobtitle') as HTMLInputElement;
                const uploadedImgPreview = document.getElementById('uploaded-img-preview') as HTMLImageElement;

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
            .catch((error: Error) => console.error('Error:', error));
    }

}