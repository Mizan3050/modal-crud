import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IEmployee } from '../../models/Employee';
import { EmployeeData } from '../../services/empdata.service';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {

  public employeeDetail : IEmployee[]; //if through route
  @Input() employeeDetailDialog: IEmployee[];
  constructor(private router: ActivatedRoute, private employeeDataService:EmployeeData, private fb:FormBuilder, private route : Router, private employeeService: EmployeeService) { }

  ngOnInit(): void {

    //filtering the employee details
    if(this.employeeDataService.employeeData){
      this.router.params.subscribe((param)=>{
        this.employeeDetail = this.employeeDataService.employeeData.filter(
          employee=>employee.id ===+param['id']
        )
      })
    }
    else{
    this.employeeService.getEmployeeList().subscribe((result:IEmployee[])=>{
      this.employeeDataService.employeeData = result;
      this.router.params.subscribe((param)=>{
        this.employeeDetail = this.employeeDataService.employeeData.filter(
          employee=>employee.id ===+param['id']
        )
      });
    })
  }
  }
}
