import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { IEmployee } from '../models/Employee';
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
  })

export class EmployeeService{

    url2 = "https://jsonplaceholder.typicode.com/users"
    url = "http://localhost:3000/employee"
    public employeeList : IEmployee[];

    constructor(private http : HttpClient) { }

    getEmployeeList():Observable<IEmployee[]>{
        return this.http.get<IEmployee[]>(this.url);
    }

    addEmployeeToList(employeeData:IEmployee):Observable<IEmployee>{
        return this.http.post<IEmployee>(this.url, employeeData);
    }

    updateEmployeeList(id:number, data):Observable<IEmployee>{
        return this.http.put<IEmployee>(this.url+`/${id}`,data)
    }
}