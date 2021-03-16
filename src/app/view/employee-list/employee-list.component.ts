import { Component, OnInit, Inject  } from '@angular/core';
import { ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { EmployeeService } from '../../services/employee.service';
import { IEmployee } from '../../models/Employee'
import { EmployeeData } from '../../services/empdata.service';
import { Router } from '@angular/router';
import {SelectionModel} from '@angular/cdk/collections';
import {MatDialog } from '@angular/material/dialog';
import { EmployeeDetailComponent } from '../employee-detail/employee-detail.component';
import { DialogComponent } from '../dialog/dialog.component';

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
  error:string;
  pageNumber : number = 0;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private employeeService: EmployeeService, private employeeDataService: EmployeeData, private route: Router,
              public dialog: MatDialog) { }

  
  //loading data with respected to pages changed
  loadData(pageIndex: number, pageSize: number, empData: IEmployee[]){
    this.dataSource = new MatTableDataSource(empData.slice(pageIndex, (pageIndex + pageSize)))
    this.length = empData.length;
  }

  
  // clearing search filter
  clearSearch(){
    this.searchKey = '';
    this.applySearch('');
  }

  openDialog(): void {
    
    this.dialog.open(DialogComponent, {
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
      
      error =>{
        this.error = error;
      }
      
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
  applySearch(event:string){

    this.dataSource.filter = event.trim().toLocaleLowerCase();
  }

  //deleting employee from the list
  deleteEmployee(employee: IEmployee, index: number){
    this.dataSource.filteredData.splice((index), 1); 

    this.dataSource._updateChangeSubscription(); //refreshing dataSource

    //deleting from array
    this.employeeDataService.employeeData.splice(this.currentIndex + index, 1);
    
    //updating table 
    this.loadData(this.currentIndex, this.pageSize, this.employeeDataService.employeeData);
    this.employeeService.deleteEmployee(employee.id).subscribe();
  }



  //updating through mat Dialog
  updateEmployeeDialog(employee:IEmployee, i:number){
   
    //opening dailog
    this.dialog.open(DialogComponent, {
      width:"800px",
      data:{employee,i}
    });
  }


  //redirects to employee details dialog
  redirectToDetails(employee: IEmployee){
    // this.route.navigate([`employeeList/detail/${employee.id}`]);
    
    this.dialog.open(EmployeeDetailComponent, {
      width:"800px",
      data:this.employeeDataService.employeeData.filter(emp=> emp.id===employee.id)
    });
  }

  //making changes whenever page is changed
  onPageChange({pageIndex, pageSize}){
    this.pageIndex = pageIndex;
    this.pageNumber = pageIndex + 1;
    this.pageSize = pageSize;
    this.currentIndex = this.pageSize * this.pageIndex;
    this.loadData(this.currentIndex, this.pageSize, this.employeeDataService.employeeData);
  }

  
  deleteSelected(){
    console.log(this.selectedEmployees.selected);
  }
}




