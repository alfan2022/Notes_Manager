import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

 

  postNote(data:any){
    return this.http.post<any>("http://localhost:4000/api/notes/",data);
  }

  getNote(){
    return this.http.get<any>("http://localhost:4000/api/notes/");
  }

  putNote(data:any, id:number){    
    return this.http.put<any>("http://localhost:4000/api/notes/" + id, data);
  }

  deleteNote(id:number){
    return this.http.delete<any>("http://localhost:4000/api/notes/" + id);
  }
}
