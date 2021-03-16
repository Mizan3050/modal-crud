import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGaurd } from "src/app/services/auth-gaurd.service";
import { AddEmployeeComponent } from "./add-employee.component";


const routes:Routes = [
    {path: '', canActivate:[AuthGaurd], component: AddEmployeeComponent},
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class AddEmployeeRoutingModule { }