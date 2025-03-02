import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskComponent } from '../create-task/create-task.component'
import { TaskService } from '../task.service';
import { ErrorService } from 'src/app/error/error.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  displayedColumns: string[] = ['title', 'description', 'assignTo', 'role', 'status', 'actions'];

  showTable = false
  showCreateTaskBtn = false;
  tasks: any[] = [];
  roleName:any;
  constructor(private dialog: MatDialog, private taskService: TaskService, private tostSrvice: ErrorService, private router: Router) { }

  ngOnInit(): void {
    this.roleName = localStorage.getItem('role');
    this.taskService.taskList().subscribe((res: any) => {
      this.tasks = res.data
      if(localStorage.getItem('role') == 'Employee'){
        let arr = this.tasks.filter((item) => {
          if(item.assignTo._id == localStorage.getItem('user_id')){
            return item;
          }
        });
        this.tasks = arr;
      }
     
      if(this.tasks.length != 0)
        this.showTable = true;
    })
  }

  openTaskDialog(taskData?: any) {
    const dialogRef = this.dialog.open(CreateTaskComponent, {
      width: '400px',
      data: taskData
    });

    dialogRef.afterClosed().subscribe(result => {
      this.roleName = localStorage.getItem('role');
      if (result) {
        this.taskService.taskList().subscribe((res: any) => {
          this.tasks = res.data
          if(localStorage.getItem('role') == 'Employee'){
            let arr = this.tasks.filter((item) => {
              if(item.assignTo._id == localStorage.getItem('user_id')){
                return item;
              }
            });
            this.tasks = arr;
          }
          if(this.tasks.length != 0)
            this.showTable = true;
        })
      }
    });
  }

  editTask(task: any) {
    this.openTaskDialog(task);
  }

  deleteTask(taskId: string) {
    this.roleName = localStorage.getItem('role');
    this.taskService.deleteTask(taskId).subscribe((res: any) => {
      this.tostSrvice.Toster(res.msg);
      this.taskService.taskList().subscribe((res: any) => {
        this.tasks = res.data;
        if(localStorage.getItem('role') == 'Employee'){
          let arr = this.tasks.filter((item) => {
            if(item.assignTo._id == localStorage.getItem('user_id')){
              return item;
            }
          });
          this.tasks = arr;
        }
      });
    })
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/'])
  }
}
