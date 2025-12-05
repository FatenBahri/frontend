import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { StudentCreateComponent } from './student-create/student-create.component';
import { StudentsComponent as StudentDashboardComponent } from './students/students.component';
const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'log', component: LoginComponent },{ 
    path: 'students/create', 
    component: StudentCreateComponent 
  },{ 
    path: 'students/edit/:id', 
    component: StudentCreateComponent },
  { path: 'students', component: StudentDashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
