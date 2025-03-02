import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { ErrorService } from '../../error/error.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assign-role',
  templateUrl: './assign-role.component.html',
  styleUrls: ['./assign-role.component.css']
})
export class AssignRoleComponent implements OnInit {

  constructor(private authService: AuthService, private errorService: ErrorService, private router: Router) { }
  roles: string[] = [
    'Manager',
    'Team Lead',
    'Employee',
  ];
  users: any[] = [];

  selectedUser: string = '';
  selectedRole: string = '';


  ngOnInit(): void {
    this.authService.getAllUser().subscribe((res: any) => {
      this.users = res.data
    })
  }

  assignRole(){
    const payload = {_id: this.selectedUser, role: this.selectedRole}
    this.authService.assignUserRole(payload).subscribe((res: any) => {
      this.errorService.Toster(res.msg);
      this.router.navigate(['/']);
    })
  }
}
