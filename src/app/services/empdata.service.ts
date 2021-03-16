import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { IEmployee } from '../models/Employee';
import { Observable, Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
  })

export class EmployeeData {
   toUpdate : boolean;
   updateId:number;
   updateIndex:number;
   showEmployeeDetail = false;
   public employeeData :IEmployee[];
}