import { Injectable } from '@angular/core';
import { Signup, Login } from './auth-data.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  getToken(){
   return localStorage.getItem('token');
  };

  Signup(username: string, email: string, password: string): Observable<any> {
    const authData: Signup = {name: username, email: email, password: password };
    return this.http.post("http://localhost:3000/api/user/signup", authData);
  };

  Login(email: string, password: string): Observable<any> { 
    const authData: Login = {email: email, password: password};
    return this.http.post("http://localhost:3000/api/user/login", authData);
  };

  getUsers(): Observable<any> {
    return this.http.get("http://localhost:3000/api/user/role_base_user");
  };

  getAllUser(): Observable<any> {
    return this.http.get("http://localhost:3000/api/user/get_all_user");
  };

  assignUserRole(payload: any): Observable<any> {
    return this.http.post("http://localhost:3000/api/user/assign_user_role", payload);
  };


}


