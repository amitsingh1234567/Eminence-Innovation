import { Component, OnInit, Inject  } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA  } from '@angular/material/dialog';
import { AuthService } from '../auth/auth.service';
import { TaskService } from '../task.service';
import { ErrorService } from 'src/app/error/error.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {

  taskTitle: string = '';
  taskDescription: string = '';
  assignedTo: string = '';
  status: string = 'pending'; // Default status

  users: any[] = [];

  constructor(public dialogRef: MatDialogRef<CreateTaskComponent>, private authService: AuthService, private taskService: TaskService, private tostService: ErrorService, @Inject(MAT_DIALOG_DATA) public data: any) {
    if (data) {
      this.taskTitle = data.title;
      this.taskDescription = data.description;
      this.assignedTo = data.assignTo._id;
      this.status = data.status;
    }
  }

  ngOnInit(): void {
    this.authService.getUsers().subscribe((res: any) => {
      this.users = res.data;
      if(localStorage.getItem('role') == 'Employee'){
        let data = this.users.find(item => item._id == localStorage.getItem('user_id'));
        this.users = [data];
      }
    })
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (!this.taskTitle || !this.assignedTo || !this.taskDescription) return;
    const payload = {
      _id: this.data?._id,
      title: this.taskTitle,
      description: this.taskDescription,
      assignTo: this.assignedTo,
      status: this.status,
      createdBy: localStorage.getItem('user_id')
    };

    // Update Task
    if(this.data){
      console.log(this.data)
      this.taskService.updateTask(payload).subscribe((res: any) => {
        this.tostService.Toster(res.msg);
        this.dialogRef.close(payload);
      })
    }else{
      // Create Task
      const { _id, ...updatedPayload } = payload;
      this.taskService.createTask(updatedPayload).subscribe((res: any) => {
      this.tostService.Toster(res.msg)
      this.dialogRef.close(payload);
    });
    }
  }

}
