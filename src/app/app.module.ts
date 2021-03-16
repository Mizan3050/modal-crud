import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { AuthGaurd } from './services/auth-gaurd.service';
import { AuthService } from './services/auth.service';
import { EmployeeService } from './services/employee.service';
import { ViewModule } from './view/view.module';
import { AddEmployeeModule } from './add-employee/add-employee.module';
import { ServerSideModule } from './server-pagination/server.module';
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatTableModule } from "@angular/material/table";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { AppRoutingModule } from "./app-routing.module";
import {MatDialogModule} from '@angular/material/dialog';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,CommonModule,
    FormsModule, ReactiveFormsModule,MatDialogModule,
    AppRoutingModule, MatTableModule, MatPaginatorModule, 
    BrowserAnimationsModule,HttpClientModule, MatFormFieldModule, MatIconModule,FontAwesomeModule,MatInputModule,ViewModule,AddEmployeeModule,ServerSideModule
  ],
  entryComponents: [
    
  ],
  providers: [AuthGaurd, AuthService, EmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
