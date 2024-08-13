import { Component, Inject,  OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators,} from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA} from '@angular/material/dialog';



@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})


export class DialogComponent implements OnInit {
  
  noteForm !: FormGroup;
  actionButton : string= "Save";
  actionTitle: string = "Add Note";
 
 
  //test
  constructor(private formBuilder : FormBuilder, private api: ApiService,
     @Inject(MAT_DIALOG_DATA) public editData:any, private dialogRef:MatDialogRef<DialogComponent>) {
       dialogRef.disableClose = true;
      }
  
     public value = new Date();


  
  ngOnInit(): void {
    this.noteForm = this.formBuilder.group({
    title: ['',Validators.required],
    created: [this.value,Validators.required],
    modified: ['',Validators.min],//test
    priority: ['',Validators.minLength],
    details: ['',Validators.minLength]
    });
         if(this.editData){

           this.actionTitle = "Update Note";
           this.actionButton = "Update";
           this.noteForm.controls['title'].setValue(this.editData.title);
           this.noteForm.controls['created'].setValue(this.editData.created);
           this.noteForm.controls['modified'].setValue(this.value);
           this.noteForm.controls['priority'].setValue(this.editData.priority);
           this.noteForm.controls['details'].setValue(this.editData.details);
         } //test
         

         

         
  }

  
  

  refresh(): void {
    window.location.reload();//test
}

  addNote() {
    if(!this.editData){
      if(this.noteForm.valid){
        this.api.postNote(this.noteForm.value)
        .subscribe({
          next:(res)=> {                  
                   
            this.noteForm.reset();
            this.dialogRef.close('save');
            this.refresh();//test
          },
          error:(err)=>{
            alert("Error while adding..")  // ////
          }
        
        })
      }
    }else{
      this.updateNote();
    }
  }
  updateNote(){
    this.api.putNote(this.noteForm.value, this.editData.id)
    .subscribe({
      next:(res)=>{
       
        this.noteForm.reset();
        this.dialogRef.close('update');
      },
      error:()=>{
        alert("Note Error updated");
      }
    })
  }
}
