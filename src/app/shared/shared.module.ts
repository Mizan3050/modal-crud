import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatTableModule } from "@angular/material/table";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';

@NgModule({
    imports:[
        CommonModule,
        FormsModule,MatRadioModule,MatCheckboxModule,MatDialogModule, ReactiveFormsModule, MatTableModule, MatPaginatorModule,
        HttpClientModule,MatSelectModule, MatFormFieldModule, MatIconModule,FontAwesomeModule,MatInputModule, MatButtonModule
    ],
    declarations: [
      ],
    exports:[
        CommonModule,MatCheckboxModule,MatRadioModule,
        FormsModule, ReactiveFormsModule, MatSelectModule, MatDialogModule,MatTableModule, MatPaginatorModule,
        HttpClientModule, MatFormFieldModule, MatIconModule,FontAwesomeModule,MatInputModule, MatButtonModule
    ]
})

export class SharedModule{}