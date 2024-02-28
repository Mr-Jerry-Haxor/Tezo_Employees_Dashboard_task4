// import * as XLSX from 'ts-xlsx';
// import { CustomAlert } from './index';

var emp_filter_sort_data: any[] = [];

function loadEmployeeData(): void {
    fetch("data.json")
        .then((response: Response) => response.json())
        .then((data: any) => {
            if (localStorage.getItem("data") === null) {
                localStorage.setItem("data", JSON.stringify(data));
            }

            let localdata: any = JSON.parse(localStorage.getItem("data") || "{}" );
            let employees: any[] = localdata.Employees;
            emp_filter_sort_data = employees;

            LoadEmployeeDataByArray(employees);
        })
        .catch((error: Error) => console.error('Error:', error));
}


function LoadEmployeeDataByArray(employeeArray: any[]): void {

    // get table by id and clear table body
    let table: HTMLTableElement = document.getElementById("employees-table") as HTMLTableElement;
    // only delete if table has rows
    if (table.rows.length > 0) {
        // only delete the tbody
        while (table.rows.length > 1) {
            table.deleteRow(-1);
        }
    }

    let employees: any[] = employeeArray;
    employees.forEach((employee: any) => {
        let row: HTMLTableRowElement = document.createElement('tr');
        row.className = "border-bottom";

        let cellCheckbox: HTMLTableCellElement = document.createElement('td');
        let checkbox: HTMLInputElement = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.id = employee.empid;
        cellCheckbox.appendChild(checkbox);
        row.appendChild(cellCheckbox);

        let cellProfile: HTMLTableCellElement = document.createElement('td');
        let divProfileContainer: HTMLDivElement = document.createElement('div');
        divProfileContainer.className = "profile-container";
        let imgProfile: HTMLImageElement = document.createElement('img');
        imgProfile.src = employee.profilepath;
        imgProfile.alt = "Profile Image";
        imgProfile.className = "profile-image";
        divProfileContainer.appendChild(imgProfile);
        let divProfileInfo: HTMLDivElement = document.createElement('div');
        divProfileInfo.className = "profile-info";
        let spanProfileName: HTMLSpanElement = document.createElement('span');
        spanProfileName.className = "profile-name";
        spanProfileName.textContent = employee.firstname + employee.lastname;
        divProfileInfo.appendChild(spanProfileName);
        let spanProfileEmail: HTMLSpanElement = document.createElement('span');
        spanProfileEmail.className = "profile-email";
        spanProfileEmail.textContent = employee.emailid;
        divProfileInfo.appendChild(spanProfileEmail);
        divProfileContainer.appendChild(divProfileInfo);
        cellProfile.appendChild(divProfileContainer);
        row.appendChild(cellProfile);

        let cellCity: HTMLTableCellElement = document.createElement('td');
        cellCity.textContent = employee.location;
        row.appendChild(cellCity);

        let cellDepartment: HTMLTableCellElement = document.createElement('td');
        cellDepartment.textContent = employee.Department;
        row.appendChild(cellDepartment);

        let cellRole: HTMLTableCellElement = document.createElement('td');
        cellRole.textContent = employee.jobtitle;
        row.appendChild(cellRole);

        let cellId: HTMLTableCellElement = document.createElement('td');
        cellId.textContent = employee.empid;
        row.appendChild(cellId);

        let cellStatus: HTMLTableCellElement = document.createElement('td');
        let spanStatus: HTMLSpanElement = document.createElement('span');
        spanStatus.className = employee.status === 'Active' ? 'table-status-active' : 'table-status-inactive';
        spanStatus.textContent = employee.status;
        cellStatus.appendChild(spanStatus);
        row.appendChild(cellStatus);

        let cellDate: HTMLTableCellElement = document.createElement('td');
        cellDate.textContent = employee.joining;
        row.appendChild(cellDate);

        let cellMore: HTMLTableCellElement = document.createElement('td');
        let buttonmore: HTMLButtonElement = document.createElement('button');
        buttonmore.className = "button-more";
        buttonmore.id = employee.empid + "_more";
        buttonmore.textContent = "...";
        let empid: string = employee.empid + "_more";
        buttonmore.setAttribute("onclick", "viewmore('" + empid + "')");
        cellMore.appendChild(buttonmore);
        let divMore: HTMLDivElement = document.createElement('div');
        divMore.className = "emp-table-more";
        divMore.id = employee.empid + "_more" + "_div";
        let aViewDetails: HTMLButtonElement = document.createElement('button');
        aViewDetails.className = "button-view-details";
        aViewDetails.textContent = "View Details";
        let aEdit: HTMLButtonElement = document.createElement('button');
        aEdit.className = "button-edit";
        aEdit.id = employee.empid;
        aEdit.setAttribute("onclick", "EditEmployeeDetails('" + employee.empid + "')");
        aEdit.textContent = "Edit";
        let aDelete: HTMLButtonElement = document.createElement('button');
        aDelete.className = "button-delete";
        aDelete.id = employee.empid;
        aDelete.setAttribute("onclick", "deleteEmployee('" + employee.empid + "')");
        aDelete.textContent = "Delete";
        divMore.appendChild(aViewDetails);
        divMore.appendChild(aEdit);
        divMore.appendChild(aDelete);
        // hide this divmore initially and when user click on cellmore.textcontent, show and toggle the cellmore
        divMore.style.display = "none";
        cellMore.appendChild(divMore);
        row.appendChild(cellMore);

        var t: HTMLTableElement = document.getElementById("employees-table") as HTMLTableElement;
        var r: HTMLTableRowElement = document.createElement("tr");
        r.innerHTML = row.innerHTML;
        t.tBodies[0].appendChild(r)
    });
}


function export_options(): void {
    var exportOptions: HTMLElement = document.querySelector(".export-options") as HTMLElement;

    if (exportOptions.style.display === "none") {
        exportOptions.style.display = "flex";
    } else {
        exportOptions.style.display = "none";
    }
}

function download_table_as_csv(table_id: string, separator: string = ','): void {
    try {
        // Select rows from table_id
        var rows: NodeListOf<HTMLTableRowElement> = document.querySelectorAll('table#' + table_id + ' tr');
        // Construct csv
        var csv: string[] = [];
        for (var i = 0; i < rows.length; i++) {
            // Skip if the row's display is none
            if (rows[i].style.display === 'none') {
                continue;
            }

            var row: string[] = [], cols: NodeListOf<HTMLTableCellElement> = rows[i].querySelectorAll('td, th');
            for (var j = 0; j < cols.length; j++) {
                // Clean innertext to remove multiple spaces and jumpline (break csv)
                var data: string = cols[j].innerText.replace(/(\r\n|\n|\r)/gm, '').replace(/(\s\s)/gm, ' ')
                // Escape double-quote with double-double-quote
                data = data.replace(/"/g, '""');
                // Push escaped string
                row.push('"' + data + '"');
            }
            csv.push(row.join(separator));
        }
        var csv_string: string = csv.join('\n');
        // Download it
        var filename: string = 'export_' + table_id + '_' + new Date().toLocaleDateString() + '.csv';
        var link: HTMLAnchorElement = document.createElement('a');
        link.style.display = 'none';
        link.setAttribute('target', '_blank');
        link.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv_string));
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        CustomAlert('success', filename + '\n has begin downloading');
    } catch (error) {
        CustomAlert('error', (error as Error).message);
    }
}




function download_table_as_xlsx(table_id: string): void {
    try {
        // Select rows from table_id
        const rows: NodeListOf<HTMLTableRowElement> = document.querySelectorAll('table#' + table_id + ' tr');
        // Construct data
        let data: any[][] = [];
        for (let i = 0; i < rows.length; i++) {
            // Skip if the row's display is none
            if (rows[i].style.display === 'none') {
                continue;
            }

            let row: any[] = [], cols: NodeListOf<HTMLTableCellElement> = rows[i].querySelectorAll('td, th');
            for (let j = 0; j < cols.length; j++) {
                // Clean innertext to remove multiple spaces and jumpline
                let cellData: string = cols[j].innerText.replace(/(\r\n|\n|\r)/gm, '').replace(/(\s\s)/gm, ' ')
                row.push(cellData);
            }
            data.push(row);
        }

        // Create a new instance of a Workbook class
        let wb: XLSX.WorkBook = XLSX.utils.book_new();
        // Use XLSX.utils.aoa_to_sheet to convert our data to a worksheet object
        let ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(data);
        // Append the worksheet to the workbook
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

        // Generate XLSX file and send to client
        let wbout: string = XLSX.write(wb, {bookType:'xlsx', type: 'binary'});
        let buf: ArrayBuffer = new ArrayBuffer(wbout.length);
        let view: Uint8Array = new Uint8Array(buf);
        for (let i=0; i<wbout.length; i++) view[i] = wbout.charCodeAt(i) & 0xFF;
        let blob: Blob = new Blob([buf], {type:'application/octet-stream'});

        // Download it
        let filename: string = 'export_' + table_id + '_' + new Date().toLocaleDateString() + '.xlsx';
        let link: HTMLAnchorElement = document.createElement('a');
        link.style.display = 'none';
        link.setAttribute('target', '_blank');
        link.href = URL.createObjectURL(blob);
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        CustomAlert('success', filename +'\nhas begin downloading');
    } catch (error) {
        CustomAlert('error', (error as Error).message);
    }
}

// the below functions used for search the employee based on the search input in the add role page

function searchEmployees(query: string): void {
    let localdata: any = JSON.parse(localStorage.getItem("data") || "{}");
    let employees: any[] = localdata.Employees;
    var results: any[] = employees.filter(function (employee: any) {
        if (employee.firstname) {
            var emp: string = employee.firstname.toLowerCase() + employee.lastname.toLowerCase();
            return emp.includes(query.toLowerCase());
        }
        return false;
    });

    var resultsDiv: HTMLElement = document.getElementById('employee-results') as HTMLElement;
    resultsDiv.innerHTML = '';
    resultsDiv.style.display = results.length ? 'block' : 'none';

    results.forEach(function (employee: any) {
        var employeeDiv: HTMLDivElement = document.createElement('div');
        employeeDiv.className = 'employee';

        var checkbox: HTMLInputElement = document.createElement('input');
        //add classname 
        // checkbox.className = 'employee-checkbox';
        checkbox.type = 'checkbox';
        checkbox.value = employee.empid;
        checkbox.onchange = function () {
            updateSelectedEmployees();
        };

        var img: HTMLImageElement = document.createElement('img');
        img.src = employee.profilepath;

        var name: Text = document.createTextNode(employee.firstname + " " + employee.lastname);

        employeeDiv.appendChild(checkbox);
        employeeDiv.appendChild(img);
        employeeDiv.appendChild(name);

        resultsDiv.appendChild(employeeDiv);
    });
}

function updateSelectedEmployees(): void {
    var checkboxes: NodeListOf<HTMLInputElement> = document.querySelectorAll('#employee-results input[type="checkbox"]');
    var selectedEmployees: string[] = [];
    checkboxes.forEach(function (checkbox: HTMLInputElement) {
        if (checkbox.checked) {
            selectedEmployees.push(checkbox.value);
        }
    });

    (document.getElementById('selected-employees') as HTMLInputElement).value = selectedEmployees.join(',');
}