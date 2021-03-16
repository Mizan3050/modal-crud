import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'employeeList', loadChildren: ()=> import('./view/view.module').then(module=> module.ViewModule)},
  {path: 'addEmployee', loadChildren: ()=> import('./add-employee/add-employee.module').then(module=>module.AddEmployeeModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
