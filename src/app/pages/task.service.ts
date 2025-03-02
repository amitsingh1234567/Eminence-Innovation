import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient, private router: Router) { }

  createTask(payload: any): Observable<any> {
    return this.http.post("http://localhost:3000/api/task/create_task", payload);
  };

  taskList(): Observable<any>{
    return this.http.get("http://localhost:3000/api/task/task_list");
  }

  updateTask(payload: any): Observable<any>{
    return this.http.patch("http://localhost:3000/api/task/update_task", payload);
  }

  deleteTask(id: any): Observable<any>{
    return this.http.delete(`http://localhost:3000/api/task/delete_task/${id}`);
  }

}


