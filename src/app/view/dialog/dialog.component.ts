import { Component , Inject, OnInit} from "@angular/core";
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { IEmployee } from "src/app/models/Employee";
import { EmployeeData } from "src/app/services/empdata.service";
import { EmployeeService } from "src/app/services/employee.service";

@Component({
    selector: 'app-dialog',
    templateUrl:'./dialog.component.html'
})


export class DialogComponent implements OnInit{
    
    error:string;
    editIndex:number;
    public employeeDetail: IEmployee
    constructor(@Inject(MAT_DIALOG_DATA) public employeeDetailEdit: any,public employeeDataService: EmployeeData, public dialogRef: MatDialogRef<DialogComponent>, public employeeService: EmployeeService){}

    ngOnInit():void{
      if(this.employeeDetailEdit?.i){
        this.employeeDetail = this.employeeDetailEdit.employee;
        this.editIndex = this.employeeDetailEdit.i;
      }
      
    }
    submitEmployeeData(employeeData):void{
        
      
        if(employeeData.empId){
          employeeData.empData.id = employeeData.empId;
            this.employeeService.updateEmployeeList(employeeData.empId,employeeData.empData).subscribe((employee:IEmployee)=>{
                
                //updating static array
                this.employeeDataService.employeeData[this.editIndex] = employee;
                this.dialogRef.close();
                        error =>{
                  this.error = error;
                }
              })
        }
        else{
            
            this.employeeService.addEmployeeToList(employeeData).subscribe((employee:IEmployee)=>{
                //pushing response object to static array
                
                this.employeeDataService.employeeData.push(employee);
                
                 this.dialogRef.close();
                
                //error handling
                error =>{
                  this.error = error;
                }
              })
        }
        

    }
  
}