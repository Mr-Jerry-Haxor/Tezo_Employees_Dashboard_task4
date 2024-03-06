import {  CustomAlertclass} from "./index";
import { employeeclass } from "./employee";

export class addemployeeclass{
    employeeclassobj: employeeclass;
    alertobj: CustomAlertclass;

    constructor() {
        this.employeeclassobj = new employeeclass();
        this.alertobj = new CustomAlertclass();

    }

    getFieldValue(fieldId: string): string {
        return (document.getElementById(fieldId) as HTMLInputElement).value;
    }

    addEmployee(): void {
        const fields: string[] = ['empid', 'firstname', 'lastname', 'dob', 'email', 'mobile', 'joiningdate', 'location', 'department'];
        let isValid: boolean = true;
        let employee: any = {};

        fields.forEach((fieldId: string) => {
            const field: HTMLInputElement = document.getElementById(fieldId) as HTMLInputElement;
            const errorSpan: HTMLElement = document.getElementById(`${fieldId}-span`)!;

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

        var data: any = JSON.parse(localStorage.getItem("data") || '{}');
        var employees: any[] = data ? data.Employees : null;

        if (data && employees) {
            var exists: boolean = false;
            var empid: string = this.getFieldValue('empid');
            var AddOrEditFlag: string = this.getFieldValue('add-or-edit-employee-flag');
            employees.forEach((employee: any) => {
                if (employee.empid === empid && AddOrEditFlag === "add") {

                    this.alertobj.CustomAlert('error', 'Employee ID already exists');
                    exists = true;
                    return false;
                }
            });

            if (AddOrEditFlag === "add" && isValid && !exists) {
                employee = {
                    "empid": this.getFieldValue('empid'),
                    "firstname": this.getFieldValue('firstname'),
                    "lastname": this.getFieldValue('lastname'),
                    "DOB": this.getFieldValue('dob'),
                    "emailid": this.getFieldValue('email'),
                    "mobile": this.getFieldValue('mobile'),
                    "location": this.getFieldValue('location'),
                    "Department": this.getFieldValue('department'),
                    "jobtitle": this.getFieldValue('jobtitle'),
                    "profilepath": (document.getElementById('uploaded-img-preview') as HTMLImageElement).src,
                    "joining": this.getFieldValue('joiningdate'),
                    "AssignManager": this.getFieldValue('assignmanager'),
                    "AssignProject": this.getFieldValue('assignproject'),
                    "status": "Active"
                };

                let localdata: any = JSON.parse(localStorage.getItem("data") || '{}');
                localdata.Employees.push(employee);
                localStorage.setItem("data", JSON.stringify(localdata));

                this.employeeclassobj.EmployeeMenu();
                this.alertobj.CustomAlert('success', 'Employee added successfully');
            } else if (AddOrEditFlag === "edit" && isValid) {
                let employee: any = employees.find((emp: any) => emp.empid === empid);
                Object.assign(employee, {
                    "empid": this.getFieldValue('empid'),
                    "firstname": this.getFieldValue('firstname'),
                    "lastname": this.getFieldValue('lastname'),
                    "DOB": this.getFieldValue('dob'),
                    "emailid": this.getFieldValue('email'),
                    "mobile": this.getFieldValue('mobile'),
                    "location": this.getFieldValue('location'),
                    "Department": this.getFieldValue('department'),
                    "jobtitle": this.getFieldValue('jobtitle'),
                    "profilepath": (document.getElementById('uploaded-img-preview') as HTMLImageElement).src,
                    "joining": this.getFieldValue('joiningdate'),
                    "AssignManager": this.getFieldValue('assignmanager'),
                    "AssignProject": this.getFieldValue('assignproject'),
                    "status": "Active"
                });

                localStorage.setItem("data", JSON.stringify(data));

                this.employeeclassobj.EmployeeMenu();
                this.alertobj.CustomAlert('success', 'Employee updated successfully');
            }
        } else {
            console.error('Data or Employees is null');
        }
    }

}



export class addEmployeeEventListenersClass {
    addEmployeeEventListeners(): void {
        const fields: string[] = ['empid', 'firstname', 'lastname', 'dob', 'email', 'mobile', 'joiningdate', 'location', 'department'];
        const fieldsinfo: { [key: string]: string } = {
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

        fields.forEach((fieldId: string) => {
            const field: HTMLInputElement = document.getElementById(fieldId) as HTMLInputElement;
            const errorSpan: HTMLElement = document.getElementById(`${fieldId}-span`)!;

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
        const dobElement = document.getElementById('dob') as HTMLInputElement;
        if (dobElement) {
            dobElement.addEventListener('input', () => {
                // check if the  date is valid and has 18+ years for the present date
                var dobInput: string = dobElement.value;
                var dob: string = dobInput.split('/').reverse().join('-');
                var dobDate: Date = new Date(dob);
                var today: Date = new Date();
                var age: number = today.getFullYear() - dobDate.getFullYear();
                var m: number = today.getMonth() - dobDate.getMonth();
                if (m < 0 || (m === 0 && today.getDate() < dobDate.getDate())) {
                    age--;
                }
                if (isNaN(age)) {
                    dobElement.classList.add('err');
                    (document.getElementById('dob-span') as HTMLElement).innerHTML = "<img src='assets/exclamation-mark-diamond.svg' alt='error' style='height:15px' > " + "Invalid Date , Only DD/MM/YYYY allowed";
                } else if (age < 18) {
                    dobElement.classList.add('err');
                    (document.getElementById('dob-span') as HTMLElement).innerHTML = "<img src='assets/exclamation-mark-diamond.svg' alt='error' style='height:15px' > " + "You must be 18 years or older to register";
                } else {
                    dobElement.classList.remove('err');
                    (document.getElementById('dob-span') as HTMLElement).innerText = '';
                }

                dobElement.value = dobInput.replace(/^(\d\d)(\d)$/g, '$1/$2').replace(/^(\d\d\/\d\d)(\d+)$/g, '$1/$2').replace(/[^\d\/]/g, '');
            });
        }
    }



    addemployeeFormSubmitValidation(): void {
        const form: HTMLFormElement = document.getElementById('add-employee-form') as HTMLFormElement;

        form.addEventListener('submit', event => {
            event.preventDefault();
            this.addEmployeeEventListeners();
        });

        form.addEventListener("keypress", event => {
            if (event.key === "Enter") {
                event.preventDefault();
            }
        });
    }
}