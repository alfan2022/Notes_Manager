import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';//test
import { DialogComponent } from '../dialog/dialog.component';//test
import { NoteDetailsComponent } from '../note-details/note-details.component';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {


  displayedColumns: string[] = ['title', 'created', 'modified', 'priority', 'details', 'actions'];
  dataSource!: MatTableDataSource<any>;
  


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
 

  

  

  constructor(private api: ApiService, private dialog: MatDialog) { } //test

  //test
  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '60%'
    }).afterClosed().subscribe(val=>{
      if(val==='save'){
        this.getAllNotes();
        
      }
    })
  }

  ngOnInit(): void {
    this.getAllNotes();

  }

  getAllNotes(){
    this.api.getNote()
    .subscribe({
      next:(res)=>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort=this.sort;
      },
      error:(_err)=>{
        alert("Error")
      }
    })
  }
// Test
openNoteDetailsDialog(row:any) {                
  this.dialog.open(NoteDetailsComponent,{
    width:'60%',
    data: row
  
  })

}




  editNote(row:any){                 
    this.dialog.open(DialogComponent,{
      width:'60%',
      data:row,
    
    }).afterClosed().subscribe(val=>{
      if(val==='update'){
        this.getAllNotes();
      }
    })
  }

  deleteNote(id:number){
    
    if (confirm("Press Ok button to continue..!")) {
      
    this.api.deleteNote(id)
    .subscribe({
      next:(res)=>{
     
        this.getAllNotes();
      },
      error:()=>{
        alert('Deleted Error..');  
      }
    })
  }
  }

 


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}


