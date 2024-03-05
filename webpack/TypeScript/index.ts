import { dataclass } from "./data.js";
import { employeeclass } from "./employee.js";
import { addemployeeclass } from "./addemployee.js";


export class indexclass{
    employeeclassobj: employeeclass;
    addemployeeclassobj: addemployeeclass;
    dataobj: dataclass;

    constructor() {
        this.addemployeeclassobj = new addemployeeclass();
        this.employeeclassobj = new employeeclass();
        this.dataobj = new dataclass();
    }


    // sidebar toggle 
     toggleSidebar(): void {
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
     NavbarLoad(): void {
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
     EmployeeMenu(): void {
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
                this.dataobj.loadEmployeeData();
                this.employeeclassobj.Filters();
                this.employeeclassobj.checkboxes();
            })
            .then(() => {
                setTimeout(() => {
                    this.employeeclassobj.checkboxIsChecked();
                    this.employeeclassobj.LoadFilterOptions();
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
     RolesMenu(): void {
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
     RoleDetails(): void {
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
     addemployeepage(): void {
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
                this.addemployeeclassobj.addEmployeeEventListeners();
                this.addemployeeclassobj.addemployeeFormSubmitValidation();
            })
            .catch((error: Error) => console.error('Error:', error));
    }


    // add role page
     addrolepage(): void {
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
     defaultpage(): void {
        this.NavbarLoad();
        this.EmployeeMenu();
    }



    // toaster messages for success, warning, info, and error types
    CustomAlert(status: string, message: string): void {
        const alertContainer: HTMLElement | null = document.querySelector('.alert-messages');
        const alertDiv: HTMLDivElement = document.createElement('div');
        let countdown: number = 5; // Set the initial countdown value

        alertDiv.className = 'alert alert-' + status;
        alertDiv.innerText = message + ' \n ' + countdown + ' seconds.';

        document.querySelector('.alert-messages')?.classList.add('show');
        alertContainer?.appendChild(alertDiv);

        // Update the countdown every second
        const countdownInterval = setInterval(() => {
            countdown--;
            if (countdown >= 0) {
                alertDiv.innerText = message + '.\n' + countdown + ' seconds.';
            }
        }, 1000);

        setTimeout(() => {
            clearInterval(countdownInterval); // Stop the countdown
            alertDiv.remove();
            document.querySelector('.alert-messages')?.classList.remove('show');
        }, 5000);
    }



}


// creating object for index class
const indexobj1 = new indexclass();
