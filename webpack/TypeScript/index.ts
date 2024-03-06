import {  Loaddataclass } from "./data";
import { employeeclass } from "./employee";
import { addEmployeeEventListenersClass } from "./addemployee";


export class indexclass{
    employeeclassobj: employeeclass;
    addemployeeclassobj: addEmployeeEventListenersClass;
    dataobj: Loaddataclass;


    constructor() {
        this.addemployeeclassobj = new addEmployeeEventListenersClass();
        this.employeeclassobj = new employeeclass();
        this.dataobj = new Loaddataclass();
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
            "Components/sidebar.html"
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
            "Components/searchbar.html"
        )
            .then((res: Response) => res.text())
            .then((data: string) => {
                if (searchbar) {
                    searchbar.innerHTML = data;
                }
            })
            .catch((error: Error) => console.error('Error:', error));
    }


    


    //roles menu page
     RolesMenu(): void {
        const mainContainer: HTMLElement | null = document.querySelector(".main-content");
        fetch(
            "Components/roles.html"
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
        fetch("Components/roledetails.html")
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
        fetch("Components/AddEmployee.html")
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
        fetch("Components/AddRole.html")
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


}


export class defualtpageclass {

    employeeclassobj: employeeclass;
    indexobj: indexclass;

    constructor() {
        this.employeeclassobj = new employeeclass();
        this.indexobj = new indexclass();

        // Call the defaultpage function on load
        this.defaultpage();
    }

    // default  employee page load
    defaultpage(): void {
        this.indexobj.NavbarLoad();
        this.employeeclassobj.EmployeeMenu();
    }
}






export class CustomAlertclass{
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
const page = new defualtpageclass();
