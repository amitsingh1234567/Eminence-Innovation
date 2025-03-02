import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { SignupComponent } from './pages/auth/signup/signup.component';
import { AssignRoleComponent } from './pages/assign-role/assign-role.component';
import { TaskListComponent } from './pages/task-list/task-list.component';
import { AuthGuard } from './pages/auth/auth.guard';

const routes: Routes = [
  {
    path:'',
    component: LoginComponent
  },
  {
    path:'signup',
    component: SignupComponent
  },
  {
    path: 'assign-role',
    component: AssignRoleComponent,
  },
  {
    path: 'task-list',
    component: TaskListComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
