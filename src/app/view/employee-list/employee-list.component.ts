import { Component, OnInit, Inject, ChangeDetectorRef  } from '@angular/core';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { EmployeeService } from '../../services/employee.service';
import { IEmployee } from '../../models/Employee'
import { EmployeeData } from '../../services/empdata.service';
import { Router } from '@angular/router';
import {SelectionModel} from '@angular/cdk/collections';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AddDialogComponent } from '../add-dialog/add-dialog.component';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit  {

  selectedEmployees = new SelectionModel<IEmployee>(true, []);
  displayedColumns: string[] = ['select', 'id', 'name', 'username', 'email', 'actions'];
  dataSource : MatTableDataSource<IEmployee>;
  searchKey: string;
  employeeList : IEmployee[];
  searcKeyFound = false;
  length: number;
  pageSize: number = 2;
  pageIndex = 0;
  pageEvent: PageEvent;
  pageSizeOptions = [1, 2, 5, 10, 20];
  currentIndex : number = 0;
  pageNumber : number = 0;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private employeeService: EmployeeService, private employeeDataService: EmployeeData, private route: Router,
              public dialog: MatDialog) { }

  
  //loading data with respected to pages changed
  loadData(pageIndex: number, pageSize: number, empData: IEmployee[]){
    this.dataSource = new MatTableDataSource(empData.slice(pageIndex, (pageIndex + pageSize)))
    this.length = empData.length;
  }

  
  //clearing search filter
  clearSearch(){
    this.searchKey = "";
    this.applySearch();
  }

  openDialog(): void {
    this.employeeDataService.showEmployeeDetail = false;
    this.dialog.open(AddDialogComponent, {
      width:"800px",
      
    });
    
  }

  ngOnInit(): void {
    this.pageNumber = this.pageIndex + 1;
    //fetching data from api
    if (this.employeeDataService.employeeData){
      this.loadData(0, this.pageSize, this.employeeDataService.employeeData);
      this.length = this.employeeDataService.employeeData.length;
    }
    else{
    this.employeeService.getEmployeeList().subscribe((employeeList: IEmployee[]) => {
      this.loadData(0, this.pageSize, employeeList);
      this.employeeDataService.employeeData = employeeList;
      // this.length = this.employeeDataService.employeeData.length;
    })
    
  }
  }


  isAllSelected() {
    const numSelected = this.selectedEmployees.selected.length;
    const numRows = this.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selectedEmployees.clear() :
        this.dataSource.data.forEach(row => this.selectedEmployees.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: IEmployee): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selectedEmployees.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  //applying search filter
  applySearch(){
    this.dataSource.filter = this.searchKey.trim().toLocaleLowerCase();
  }

  //deleting employee from the list
  deleteEmployee(row: IEmployee, index: number){
    this.dataSource.filteredData.splice((index), 1); 

    this.dataSource._updateChangeSubscription(); //refreshing dataSource

    //deleting from array
    this.employeeDataService.employeeData.splice(this.currentIndex + index, 1);
    
    //updating table 
    this.loadData(this.currentIndex, this.pageSize, this.employeeDataService.employeeData);
    this.employeeService.deleteEmployee(row.id).subscribe();
  }


  //updating employee data through route
  updateEmployee(row: IEmployee, index: number){

    //setting form status to update
    this.employeeDataService.toUpdate = true;
    this.route.navigate([`/employeeList/update/${row.id}`]);

    //setting id of employee to be updated
    this.employeeDataService.updateId = this.currentIndex + index;
    console.log(this.employeeDataService.updateId);
    this.loadData(this.currentIndex, this.pageSize, this.employeeDataService.employeeData);
  }

  //updating through mat Dialog
  updateEmployeeDialog(employee:IEmployee, i:number){
    this.employeeDataService.toUpdate = true;
    this.employeeDataService.showEmployeeDetail = false;
    this.employeeDataService.updateIndex = i;
    this.employeeDataService.updateId = employee.id;

    //opening dailog
    this.dialog.open(AddDialogComponent, {
      width:"800px",
      data:this.employeeDataService.employeeData.filter(emp=> emp.id===employee.id)
    });
  }


  //redirects to employee details dialog
  redirectToDetails(employee: IEmployee){
    // this.route.navigate([`employeeList/detail/${employee.id}`]);
    this.employeeDataService.showEmployeeDetail = true;
    this.dialog.open(AddDialogComponent, {
      width:"800px",
      data:this.employeeDataService.employeeData.filter(emp=> emp.id===employee.id)
    });
  }

  //making changes whenever page is changed
  onPageChange(e: PageEvent){
    this.pageIndex = e.pageIndex;
    this.pageNumber = e.pageIndex + 1;
    this.pageSize = e.pageSize;
    this.currentIndex = this.pageSize * this.pageIndex;
    this.loadData(this.currentIndex, this.pageSize, this.employeeDataService.employeeData);
  }

  deleteSelected(){
    console.log(this.selectedEmployees.selected);
  }
}




