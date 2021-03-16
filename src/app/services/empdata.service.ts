import { Injectable } from "@angular/core";

import { IEmployee } from '../models/Employee';
import { BehaviorSubject, Observable, Subject } from "rxjs";

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