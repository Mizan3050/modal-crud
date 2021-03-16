import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGaurd } from "src/app/services/auth-gaurd.service";
import { UserComponent } from "./user/user.component";


const routes:Routes = [
    {path: 'user', canActivate:[AuthGaurd], component: UserComponent},
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ServerSideRoutingModule { }