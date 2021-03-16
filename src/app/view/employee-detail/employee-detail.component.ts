import { Component, Input, OnInit, Inject, OnDestroy } from '@angular/core';
import { IEmployee } from '../../models/Employee';
import { EmployeeData } from '../../services/empdata.service';
import { MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit, OnDestroy {

   //if through route
  @Input() employeeDetailDialog: IEmployee[];
  error:string;
  constructor(@Inject(MAT_DIALOG_DATA) public employeeDetail : IEmployee[],
               private employeeDataService:EmployeeData) { }

    ngOnInit(): void {
    
  }
  ngOnDestroy(){
    this.employeeDataService.showEmployeeDetail = false;
  }
}
