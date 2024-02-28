
// sidebar toggle function
function toggleSidebar() {
  const sidebar = document.querySelector(".sidebar");
  const mainContainer = document.querySelector(".main-container");
  const closedSidebarElements = document.querySelectorAll(".closed-sidebar");
  const min_logo = document.querySelector(".sidebar-closed-logo");

  sidebar.classList.toggle("toggleopen");
  mainContainer.classList.toggle("sidebar-open");

  // If the sidebar is open
  if (sidebar.classList.contains("toggleopen")) {
    // Remove the 'closed-sidebar-active' class from each 'closed-sidebar' element
    closedSidebarElements.forEach(element => {
      element.classList.remove("closed-sidebar-active");
    });
    min_logo.style.display = "none";
  } else {
    // If the sidebar is closed, add the 'closed-sidebar-active' class to each 'closed-sidebar' element
    closedSidebarElements.forEach(element => {
      element.classList.add("closed-sidebar-active");
    });
    min_logo.style.display = "block";
  }
}


// including sidebar html code
function NavbarLoad() {
  const sidebarcontainer = document.querySelector(".sidebar-container");
  fetch(
    "HTML/sidebar.html"
  )
    .then((res) => res.text())
    .then((data) => {
      sidebarcontainer.innerHTML = data;
    })
    .catch((error) => console.error('Error:', error));
  
  // including searchbar html code
  
  const searchbar = document.querySelector(".searchbar-container");
  fetch(
    "HTML/searchbar.html"
  )
    .then((res) => res.text())
    .then((data) => {
      searchbar.innerHTML = data;
    })
    .catch((error) => console.error('Error:', error));
}


// employee table page
function EmployeeMenu() {
  const mainContainer = document.querySelector(".main-content");
  fetch(
    "HTML/employee.html"
  )
    .then((res) => res.text())
    .then((data) => {
      mainContainer.innerHTML = data;
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
      const employeeMenu = document.querySelector("#employee-menu");
      employeeMenu.classList.add("menuactive");
      // remove active class from other menu
      const rolesMenu = document.querySelector("#roles-menu");
      rolesMenu.classList.remove("menuactive");
    })
    .catch((error) => console.error('Error:', error));
}


//roles menu page
function RolesMenu() {
  const mainContainer = document.querySelector(".main-content");
  fetch(
    "HTML/roles.html"
  )
    .then((res) => res.text())
    .then((data) => {
      mainContainer.innerHTML = data;
    })
    .then(() => {
      const rolesMenu = document.querySelector("#roles-menu");
      rolesMenu.classList.add("menuactive");
      // remove active class from other menu
      const employeeMenu = document.querySelector("#employee-menu");
      employeeMenu.classList.remove("menuactive");
    })
    .catch((error) => console.error('Error:', error));
    
}



// role details page
function RoleDetails() {
  const mainContainer = document.querySelector(".main-content");
  fetch("HTML/roledetails.html")
    .then((res) => res.text())
    .then((data) => {
      mainContainer.innerHTML = data;
    })
    .then(() => {
      const employeeMenu = document.querySelector("#employee-menu");
      employeeMenu.classList.remove("menuactive");
      // remove active class from other menu
      const rolesMenu = document.querySelector("#roles-menu");
      rolesMenu.classList.add("menuactive");
    })
    .catch((error) => console.error('Error:', error));
}


// Add employee page
function addemployeepage() {
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
      addEmployeeEventListeners();
      addemployeeFormSubmitValidation();
    })
    .catch((error) => console.error('Error:', error));
}


// add role page
function addrolepage() {
  const mainContainer = document.querySelector(".main-content");
  fetch("HTML/AddRole.html")
  .then((res) => res.text())
  .then((data) => {
      mainContainer.innerHTML = data;
    })
  .then(() => {
      const employeeMenu = document.querySelector("#employee-menu");
      employeeMenu.classList.remove("menuactive");
      const rolesMenu = document.querySelector("#roles-menu");
      rolesMenu.classList.add("menuactive");
    })
  .catch((error) => console.error('Error:', error));
}



// default  employee page load
function defaultpage() {
  NavbarLoad();
  EmployeeMenu();
}



// toaster messages for success , warning , info and error types
function CustomAlert(status, message){
  var alertContainer = document.querySelector('.alert-messages');
  var alertDiv = document.createElement('div');
  var countdown = 5; // Set the initial countdown value

  alertDiv.className = 'alert alert-' + status;
  alertDiv.innerText = message + ' \n ' + countdown + ' seconds.';

  document.querySelector('.alert-messages').classList.add('show');
  alertContainer.appendChild(alertDiv);

  // Update the countdown every second
  var countdownInterval = setInterval(function() {
    countdown--;
    if (countdown >= 0) {
      alertDiv.innerText = message + '.\n' + countdown + ' seconds.';
    }
  }, 1000);

  setTimeout(function() {
    clearInterval(countdownInterval); // Stop the countdown
    alertDiv.remove();
    document.querySelector('.alert-messages').classList.remove('show');
  }, 5000);
}







