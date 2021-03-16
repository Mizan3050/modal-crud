import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { EmployeeDetailComponent } from "./employee-detail/employee-detail.component";
import { EmployeeListComponent } from "./employee-list/employee-list.component";
import { ViewRoutingModule } from "./view-routing.module";
import { MatFormFieldModule } from "@angular/material/form-field";
import {AddDialogComponent} from './add-dialog/add-dialog.component';
@NgModule({

    declarations: [
        EmployeeListComponent,
        EmployeeDetailComponent,AddDialogComponent
      ],
      imports:[
        SharedModule,
        ViewRoutingModule
    ],
    exports:[
    ],
    entryComponents:[AddDialogComponent]

})

export class ViewModule{}