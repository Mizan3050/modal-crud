import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { EmployeeDetailComponent } from "./employee-detail/employee-detail.component";
import { EmployeeListComponent } from "./employee-list/employee-list.component";
import { ViewRoutingModule } from "./view-routing.module";

import {AddDialogComponent} from './add-dialog/add-dialog.component';
import { DialogComponent } from "./dialog/dialog.component";
import { IsUndefinedPipe } from "./checknull.pipe";
@NgModule({

    declarations: [
        EmployeeListComponent,
        EmployeeDetailComponent,AddDialogComponent,DialogComponent,IsUndefinedPipe
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