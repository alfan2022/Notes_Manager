import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {


  constructor(private dialog: MatDialog) { } 

  
  openDialog() {
    this.dialog.open(DialogComponent, { 
      width: '60%' 
     
    });
   
  }

  ngOnInit(): void {
  }
  

}
