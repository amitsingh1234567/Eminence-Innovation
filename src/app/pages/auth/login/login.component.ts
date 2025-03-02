import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { AuthService } from "../auth.service";
import { ErrorService } from '../../../error/error.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoading = false;
  constructor(private authService: AuthService, private errorService: ErrorService, private router: Router) { }

  ngOnInit(): void {
  }

  onLogin(form: NgForm){
    if(form.invalid)
    return
    this.isLoading = true;
    this.authService.Login(form.value.email, form.value.password).subscribe((res: any) => {
      localStorage.setItem('token', res.token);
      localStorage.setItem('user_id', res.userId);
      localStorage.setItem('role', res.role);
      this.errorService.Toster(res.msg);
      this.router.navigate(['/task-list']);
    })
}
}
