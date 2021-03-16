import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RandomUserService } from 'src/app/services/randomuser.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {


  userData = [];
  constructor(private userService: RandomUserService) { }


  ngOnInit(): void {
    this.userService.getUserList().subscribe((user)=>{
      this.userData = user;
      console.log(user);
    })
  }

}
