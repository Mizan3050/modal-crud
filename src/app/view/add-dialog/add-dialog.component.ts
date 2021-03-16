import { Component, OnInit,  OnDestroy, Input, Output, EventEmitter} from '@angular/core';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import { IEmployee } from '../../models/employee';
import { EmployeeData } from '../../services/empdata.service';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';


export interface City {
  value: number;
  viewValue: string;
}
export interface Company {
  value: number;
  viewValue: string;
}

enum RadioOption{
  dealer = "Dealer",
  brand = "Brand",
}
@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css']
})
export class AddDialogComponent implements OnInit {


  
  faSpinner = faSpinner;
  fas = fas;
  updateId:number;
  toUpdate :boolean;
  addEmployeeForm: FormGroup;
  loading: boolean = false;
  routerId : number;
  radioOptions = RadioOption;
  error:string;
  formState:string;
  cities:City[] = [{value:1, viewValue: "Pune"},{value:2, viewValue: "Delhi"},{value:3, viewValue: "Mumbai"}];
  companies:Company[] = [{value:1, viewValue: "Any1"},{value:2, viewValue: "Any2"},{value:3, viewValue: "Google"}]
  @Input() employeeDetail:IEmployee;
  

  @Output() addNewData: EventEmitter<object> = new EventEmitter<object>();
  @Output() updateEmployeeData: EventEmitter<object> = new EventEmitter<object>();

  constructor(private fb:FormBuilder,
    private employeeDataService:EmployeeData) { }


  get name(){
    return this.addEmployeeForm.get('name');
  }

  get username(){
    return this.addEmployeeForm.get('username');
  }


  ngOnInit(): void {

    

    //initializing formgroup
    this.addEmployeeForm = this.fb.group({
      name:['',[Validators.required, Validators.minLength(3)]],
      username:['',[Validators.required,  Validators.minLength(3), Validators.pattern('[a-zA-Z0-9 _-]*')]],
      email: [''],
      storeType:[this.radioOptions.dealer],
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
    if(this.employeeDetail?.id){
      
      this.formState = 'Update'
      const {name,username,storeType,email,phone,website,company,address} = this.employeeDetail;
      this.addEmployeeForm.patchValue({
        
        name: name,
        username: username,
        storeType: storeType,
        email: email,
        phone:phone,
        website:website,
        company: {bs:company.bs}
      })
      this.addEmployeeForm.get('address.city').setValue(address.city);
      this.addEmployeeForm.get('company.name').setValue(company.name); //change implementation
      
    }
    else{
      this.formState = 'Add'
    }
  }

  //add employee to the list
  submitEmployeeData()
  { 
 
    if(this.employeeDetail?.id){
      const empData:IEmployee = this.addEmployeeForm.value;
      const empId:number = this.employeeDetail.id;
      this.updateEmployeeData.emit({empData, empId});
      
    }
    else{
      this.updateEmployeeData.emit(this.addEmployeeForm.value);
    }
  }

  
  //updating employee 

 


}
