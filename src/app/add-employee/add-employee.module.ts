import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { AddEmployeeRoutingModule } from "./add-employee-routing.module";
import { AddEmployeeComponent } from "./add-employee.component";


@NgModule({
    declarations:[AddEmployeeComponent],
    imports:[SharedModule, AddEmployeeRoutingModule],
    exports:[],
})

export class AddEmployeeModule{}