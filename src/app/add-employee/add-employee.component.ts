import { Component, OnDestroy, OnInit } from '@angular/core';
import {FormBuilder, Validators, FormArray,FormGroup, FormControl} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IEmployee } from '../models/Employee';
import { EmployeeData } from '../services/empdata.service';
import { EmployeeService } from '../services/employee.service';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit,OnDestroy {

  faSpinner = faSpinner;
  fas = fas;
  addEmployeeForm: FormGroup;
  loading: boolean = false;
  routerId : number;

  constructor(private fb:FormBuilder,
              private employeeDataService:EmployeeData, 
              private employeeService:EmployeeService, 
              private route:Router,
              private activatedRoute:ActivatedRoute) { }
  toUpdate = false;

  get name(){
    return this.addEmployeeForm.get('name');
  }

  get username(){
    return this.addEmployeeForm.get('username');
  }

  ngOnInit(): void {


    //initialising form
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

    this.toUpdate = this.employeeDataService.toUpdate;
    if(!this.employeeDataService.employeeData){
      this.employeeService.getEmployeeList().subscribe((employeeList: IEmployee[])=>{
        this.employeeDataService.employeeData = employeeList;
      })
    }

  //fetching details of employee values if form status is toUpdate
   if(this.toUpdate){
      this.activatedRoute.paramMap.subscribe((employee)=>{
        this.routerId = +employee.get('id');
        if(this.routerId){
          this.getEmployee(this.employeeDataService.updateId)
        }
        console.log(this.employeeDataService.updateId)
      })
    }

  }


  //patchin values of employee's data that is to be updated
  getEmployee(id:number){
    const employeeDataToEdit = this.employeeDataService.employeeData[id];
    console.log(employeeDataToEdit)
    this.addEmployeeForm.patchValue({
      name: employeeDataToEdit.name,
      username: employeeDataToEdit.username,
      email: employeeDataToEdit.email,
      phone:employeeDataToEdit.phone,
      website:employeeDataToEdit.website,
      address: {street:employeeDataToEdit.address.street,
                city:employeeDataToEdit.address.city,
                zipcode:employeeDataToEdit.address.zipcode},
      company:{name:employeeDataToEdit.company.name,
               bs:employeeDataToEdit.company.bs        
      }
    })
  }

  //adding employee
  addEmployee(){
    this.loading = true;
    this.employeeService.addEmployeeToList(this.addEmployeeForm.value).subscribe((result:IEmployee)=>{
      this.employeeDataService.employeeData.push(result);
      if(result){
        this.loading = false;
      }
      this.route.navigate(['/employeeList']);
    })
    
  }


  //updating employee to array and server
  updateStudent(){
    this.employeeDataService.toUpdate = false;
    this.loading = true;
    this.employeeDataService.employeeData[this.employeeDataService.updateId] = this.addEmployeeForm.value;
    this.employeeDataService.employeeData[this.employeeDataService.updateId].id = +this.routerId;
    console.log(this.employeeDataService.employeeData[this.employeeDataService.updateId]);
    this.employeeService.updateEmployeeList(this.employeeDataService.employeeData[this.employeeDataService.updateId].id, this.addEmployeeForm.value).subscribe((result:IEmployee)=>{
      if(result){
        this.loading = false;
      }
      
      this.route.navigate(['/employeeList']);
      
    })

  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.employeeDataService.toUpdate = false;
  }
}
