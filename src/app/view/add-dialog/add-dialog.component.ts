import { Component, OnInit, Inject, OnDestroy} from '@angular/core';
import {FormBuilder, Validators, FormArray,FormGroup, FormControl} from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { IEmployee } from '../../models/employee';
import { EmployeeData } from '../../services/empdata.service';
import { EmployeeService } from '../../services/employee.service';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ChangeDetectorRef } from '@angular/core';

export interface City {
  value: number;
  viewValue: string;
}
export interface Company {
  value: number;
  viewValue: string;
}

enum RadioOption{
  dealer = "dealer",
  brand = "brand",
}
@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css']
})
export class AddDialogComponent implements OnInit, OnDestroy {


  showEmployeeDetail = this.employeeDataService.showEmployeeDetail;
  faSpinner = faSpinner;
  fas = fas;
  toUpdate = this.employeeDataService.toUpdate;
  addEmployeeForm: FormGroup;
  loading: boolean = false;
  routerId : number;
  radioOptions = RadioOption;
  cities:City[] = [{value:1, viewValue: "Pune"},{value:2, viewValue: "Delhi"},{value:3, viewValue: "Mumbai"}];
  companies:Company[] = [{value:1, viewValue: "Any1"},{value:2, viewValue: "Any2"},{value:3, viewValue: "Google"}]
  
  
  constructor(private fb:FormBuilder,
    private employeeDataService:EmployeeData, 
    private employeeService:EmployeeService,
    private route: Router,
    @Inject(MAT_DIALOG_DATA) public employeeDetail: IEmployee,
    public dialogRef: MatDialogRef<AddDialogComponent>, public changeDetector:ChangeDetectorRef) { }


  get name(){
    return this.addEmployeeForm.get('name');
  }

  get username(){
    return this.addEmployeeForm.get('username');
  }


  ngOnInit(): void {

    this.toUpdate = this.employeeDataService.toUpdate;

    //initializing formgroup
    this.addEmployeeForm = this.fb.group({
      name:['',[Validators.required, Validators.minLength(3)]],
      username:['',[Validators.required,  Validators.minLength(3), Validators.pattern('[a-zA-Z0-9 _-]*')]],
      email: [''],
      storeType: [''],
      address: this.fb.group({
        street:[''],
        city:[''],
        zipcode:['']
      }),
      phone:[''],
      website:[''],
      company: this.fb.group({
        name:[''],
        bs:['']
      })
    })

    //populating form to update
    if(this.toUpdate){
      const employeeDataToEdit = this.employeeDetail[0];
      this.addEmployeeForm.patchValue({
        name: employeeDataToEdit.name,
        username: employeeDataToEdit.username,
        email: employeeDataToEdit.email,
        storeType: [this.radioOptions.dealer] ,
        phone:employeeDataToEdit.phone,
        website:employeeDataToEdit.website,
        company: {bs:employeeDataToEdit.company.bs}
      })
      this.addEmployeeForm.get('address.city').setValue(employeeDataToEdit.address.city);
      this.addEmployeeForm.get('company.name').setValue(employeeDataToEdit.company.name);
    }
  }

  //add employee to the list
  addEmployee()
  {
    this.loading = true;
    this.employeeService.addEmployeeToList(this.addEmployeeForm.value).subscribe((result:IEmployee)=>{
      //pushing response object to static array
      this.employeeDataService.employeeData.push(result);
      if(result){
        this.loading = false;
        this.addEmployeeForm.reset();
        this.dialogRef.close();
      }
    })
    
  }

  
  //updating employee 
  updateStudent(){
    this.loading = true;
    this.employeeDataService.toUpdate = false;
    this.employeeService.updateEmployeeList(this.employeeDataService.updateId, this.addEmployeeForm.value).subscribe((employee:IEmployee)=>{
      
      //updating static array
      this.employeeDataService.employeeData[this.employeeDataService.updateIndex] = employee;
      if(employee){
        this.loading = false;
        this.addEmployeeForm.reset();
        this.dialogRef.close();
      }
    })
  }
  close(){
    this.employeeDataService.toUpdate = false;
  }
  onNoClick(){
    
  }
  ngOnDestroy():void{
    this.employeeDataService.toUpdate = false;
  }
}
