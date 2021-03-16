import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { ServerSideRoutingModule } from "./server-routing.module";
import { UserComponent } from './user/user.component';

@NgModule({
    declarations:[UserComponent],
    imports:[SharedModule,ServerSideRoutingModule ],
    exports:[SharedModule, SharedModule,UserComponent,ServerSideRoutingModule],
})

export class ServerSideModule{}