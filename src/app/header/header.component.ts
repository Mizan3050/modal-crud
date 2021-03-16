import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService, private route:Router) { }

  isLoggedIn : boolean;
  currentEmployee:string;
  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(data=> this.isLoggedIn = data);   
  }
  onLogOut(){
    this.authService.logOut();
    this.route.navigate(['/login'])
  }
}
