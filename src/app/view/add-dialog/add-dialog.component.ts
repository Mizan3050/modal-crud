import { Component, OnInit, Inject} from '@angular/core';
import {FormBuilder, Validators, FormArray,FormGroup, FormControl} from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { IEmployee } from '../../models/employee';
import { EmployeeData } from '../../services/empdata.service';
import { EmployeeService } from '../../services/employee.service';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface City {
  value: number;
  viewValue: string;
}
export interface Company {
  value: number;
  viewValue: string;
}
@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css']
})
export class AddDialogComponent implements OnInit {


  showEmployeeDetail = this.employeeDataService.showEmployeeDetail;
  faSpinner = faSpinner;
  fas = fas;
  addEmployeeForm: FormGroup;
  loading: boolean = false;
  routerId : number;
  toUpdate = false;

  cities:City[] = [{value:1, viewValue: "Pune"},{value:2, viewValue: "Delhi"},{value:3, viewValue: "Mumbai"}];
  companies:Company[] = [{value:1, viewValue: "Any1"},{value:2, viewValue: "Any2"},{value:3, viewValue: "Google"}]
  constructor(private fb:FormBuilder,
    private employeeDataService:EmployeeData, 
    private employeeService:EmployeeService,
    private route: Router,
    @Inject(MAT_DIALOG_DATA) public employeeDetail: IEmployee) { }

  get name(){
    return this.addEmployeeForm.get('name');
  }

  get username(){
    return this.addEmployeeForm.get('username');
  }
  ngOnInit(): void {
    this.addEmployeeForm = this.fb.group({
      name:['',[Validators.required, Validators.minLength(3)]],
      username:['',[Validators.required,  Validators.minLength(3), Validators.pattern('[a-zA-Z0-9 _-]*')]],
      email: [''],
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
  }

  addEmployee()
  {
    this.loading = true;
    this.employeeService.addEmployeeToList(this.addEmployeeForm.value).subscribe((result:IEmployee)=>{
      this.employeeDataService.employeeData.push(result);
      if(result){
        this.loading = false;
      }
    })
    
  }
  onNoClick(){
    
  }
}
