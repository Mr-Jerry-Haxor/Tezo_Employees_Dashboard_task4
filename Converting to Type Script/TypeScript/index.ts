// import { loadEmployeeData } from "./data";
// import { Filters, LoadFilterOptions, checkboxes, checkboxIsChecked } from "./employee";
// import { addEmployeeEventListeners, addemployeeFormSubmitValidation } from "./addemployee";

// sidebar toggle function
function toggleSidebar(): void {
    const sidebar: HTMLElement | null = document.querySelector(".sidebar");
    const mainContainer: HTMLElement | null = document.querySelector(".main-container");
    const closedSidebarElements: NodeListOf<HTMLElement> = document.querySelectorAll(".closed-sidebar");
    const min_logo: HTMLElement | null = document.querySelector(".sidebar-closed-logo");

    sidebar?.classList.toggle("toggleopen");
    mainContainer?.classList.toggle("sidebar-open");

    // If the sidebar is open
    if (sidebar?.classList.contains("toggleopen")) {
        // Remove the 'closed-sidebar-active' class from each 'closed-sidebar' element
        closedSidebarElements.forEach(element => {
            element.classList.remove("closed-sidebar-active");
        });
        if (min_logo) {
            min_logo.style.display = "none";
        }
    } else {
        // If the sidebar is closed, add the 'closed-sidebar-active' class to each 'closed-sidebar' element
        closedSidebarElements.forEach(element => {
            element.classList.add("closed-sidebar-active");
        });
        if (min_logo) {
            min_logo.style.display = "block";
        }
    }
}


// including sidebar html code
function NavbarLoad(): void {
    const sidebarcontainer: HTMLElement | null = document.querySelector(".sidebar-container");
    fetch(
        "HTML/sidebar.html"
    )
        .then((res: Response) => res.text())
        .then((data: string) => {
            if (sidebarcontainer) {
                sidebarcontainer.innerHTML = data;
            }
        })
        .catch((error: Error) => console.error('Error:', error));

    // including searchbar html code

    const searchbar: HTMLElement | null = document.querySelector(".searchbar-container");
    fetch(
        "HTML/searchbar.html"
    )
        .then((res: Response) => res.text())
        .then((data: string) => {
            if (searchbar) {
                searchbar.innerHTML = data;
            }
        })
        .catch((error: Error) => console.error('Error:', error));
}


// employee table page
function EmployeeMenu(): void {
    const mainContainer: HTMLElement | null = document.querySelector(".main-content");
    fetch(
        "HTML/employee.html"
    )
        .then((res: Response) => res.text())
        .then((data: string) => {
            if (mainContainer) {
                mainContainer.innerHTML = data;
            }
        })
        .then(() => {
            loadEmployeeData();
            Filters();
            checkboxes();
        })
        .then(() => {
            setTimeout(() => {
                checkboxIsChecked();
                LoadFilterOptions();
            }, 1000);
        })
        .then(() => {
            const employeeMenu: HTMLElement | null = document.querySelector("#employee-menu");
            employeeMenu?.classList.add("menuactive");
            // remove active class from other menu
            const rolesMenu: HTMLElement | null = document.querySelector("#roles-menu");
            rolesMenu?.classList.remove("menuactive");
        })
        .catch((error: Error) => console.error('Error:', error));
}


//roles menu page
function RolesMenu(): void {
    const mainContainer: HTMLElement | null = document.querySelector(".main-content");
    fetch(
        "HTML/roles.html"
    )
        .then((res: Response) => res.text())
        .then((data: string) => {
            if (mainContainer) {
                mainContainer.innerHTML = data;
            }
        })
        .then(() => {
            const rolesMenu: HTMLElement | null = document.querySelector("#roles-menu");
            rolesMenu?.classList.add("menuactive");
            // remove active class from other menu
            const employeeMenu: HTMLElement | null = document.querySelector("#employee-menu");
            employeeMenu?.classList.remove("menuactive");
        })
        .catch((error: Error) => console.error('Error:', error));

}



// role details page
function RoleDetails(): void {
    const mainContainer: HTMLElement | null = document.querySelector(".main-content");
    fetch("HTML/roledetails.html")
        .then((res: Response) => res.text())
        .then((data: string) => {
            if (mainContainer) {
                mainContainer.innerHTML = data;
            }
        })
        .then(() => {
            const employeeMenu: HTMLElement | null = document.querySelector("#employee-menu");
            employeeMenu?.classList.remove("menuactive");
            // remove active class from other menu
            const rolesMenu: HTMLElement | null = document.querySelector("#roles-menu");
            rolesMenu?.classList.add("menuactive");
        })
        .catch((error: Error) => console.error('Error:', error));
}


// Add employee page
function addemployeepage(): void {
    const mainContainer: HTMLElement | null = document.querySelector(".main-content");
    fetch("HTML/AddEmployee.html")
        .then((res: Response) => res.text())
        .then((data: string) => {
            if (mainContainer) {
                mainContainer.innerHTML = data;
            }
        })
        .then(() => {
            const employeeMenu: HTMLElement | null = document.querySelector("#employee-menu");
            employeeMenu?.classList.add("menuactive");
            const rolesMenu: HTMLElement | null = document.querySelector("#roles-menu");
            rolesMenu?.classList.remove("menuactive");
        })
        .then(() => {
            addEmployeeEventListeners();
            addemployeeFormSubmitValidation();
        })
        .catch((error: Error) => console.error('Error:', error));
}


// add role page
function addrolepage(): void {
    const mainContainer: HTMLElement | null = document.querySelector(".main-content");
    fetch("HTML/AddRole.html")
        .then((res: Response) => res.text())
        .then((data: string) => {
            if (mainContainer) {
                mainContainer.innerHTML = data;
            }
        })
        .then(() => {
            const employeeMenu: HTMLElement | null = document.querySelector("#employee-menu");
            employeeMenu?.classList.remove("menuactive");
            const rolesMenu: HTMLElement | null = document.querySelector("#roles-menu");
            rolesMenu?.classList.add("menuactive");
        })
        .catch((error: Error) => console.error('Error:', error));
}



// default  employee page load
function defaultpage(): void {
    NavbarLoad();
    EmployeeMenu();
}



// toaster messages for success , warning , info and error types
function CustomAlert(status: string, message: string): void {
    var alertContainer: HTMLElement | null = document.querySelector('.alert-messages');
    var alertDiv: HTMLDivElement = document.createElement('div');
    var countdown: number = 5; // Set the initial countdown value

    alertDiv.className = 'alert alert-' + status;
    alertDiv.innerText = message + ' \n ' + countdown + ' seconds.';

    document.querySelector('.alert-messages')?.classList.add('show');
    alertContainer?.appendChild(alertDiv);

    // Update the countdown every second
    var countdownInterval = setInterval(function () {
        countdown--;
        if (countdown >= 0) {
            alertDiv.innerText = message + '.\n' + countdown + ' seconds.';
        }
    }, 1000);

    setTimeout(function () {
        clearInterval(countdownInterval); // Stop the countdown
        alertDiv.remove();
        document.querySelector('.alert-messages')?.classList.remove('show');
    }, 5000);
}


