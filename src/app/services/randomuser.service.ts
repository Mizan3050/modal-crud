import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
  })

  
  export class RandomUserService{
    url = "https://randomuser.me/api/?results=50";

    constructor(private http : HttpClient) { }

    getUserList():Observable<any>{
        return this.http.get(this.url);
    }

  }

