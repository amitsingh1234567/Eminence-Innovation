import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { AuthService } from "../auth.service";
import { Router } from '@angular/router';
import { ErrorService } from '../../../error/error.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  isLoading = false;
  constructor(private authService: AuthService, private router: Router, private errorService: ErrorService) { }

  ngOnInit(): void {
  }
    onSignup(form: NgForm){
      if(form.invalid)
      return
      console.log(form.value)
      this.isLoading = true;

      this.authService.Signup(form.value.username, form.value.email, form.value.password).subscribe((res: any) => {
        this.errorService.Toster(res.msg)
        this.router.navigate(['/assign-role']);
      })
  }
}
