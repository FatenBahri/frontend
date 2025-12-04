import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { StudentsComponent as StudentDashboardComponent } from './students/students.component';
const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'log', component: LoginComponent },
  { path: 'students', component: StudentDashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
