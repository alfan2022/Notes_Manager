import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TableComponent } from '../table/table.component';

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.css']
})
export class NoteDetailsComponent implements OnInit {
  recieveRow;
 


  constructor(public dialogRef:MatDialogRef<TableComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any) { 
      this.recieveRow = data;
      dialogRef.disableClose = true;
    }

  ngOnInit(): void {
    

    if(!this.recieveRow.details) {
     this.recieveRow.details  = "YOU DID NOT WRITE ANY DETAIL...!!"
      
     }

     
    }

  }


