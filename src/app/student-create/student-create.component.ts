import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// 1. ✅ IMPORT the Student interface from the service file
import { StudentService, Student } from '../services/student.service'; 
import { HttpErrorResponse } from '@angular/common/http'; // Used for better error typing

// 2. ⚠️ Keep the Level enum if it's not globally available or imported elsewhere.
// If Level is also used by your backend, it's better to move it to a shared model file.
enum Level {
  Primaire = 'Primaire',
  Secondaire = 'Secondaire',
  Bac = 'Bac',
  License = 'License',
  Master = 'Master'
}

@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.component.html',
  styleUrls: ['./student-create.component.css']
})
export class StudentCreateComponent implements OnInit {

  username: string = '';
  level: string = '';

  levels = Object.values(Level);
  
  constructor(
    private studentService: StudentService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.level = this.levels[0]; 
  }

  createStudent(): void {
    // 1. Use the imported Student interface
    const newStudent: Student = {
      username: this.username,
      level: this.level
    };

    // 2. ✅ Update the method call to `create()` (as defined in StudentService)
    this.studentService.create(newStudent).subscribe({
      // 3. ✅ Add explicit typing to `response` and `err`
      next: (response: Student) => { 
        console.log('Student created successfully', response);
        this.router.navigate(['/students']);
      },
      error: (err: HttpErrorResponse) => { 
        console.error('Error creating student:', err);
        alert('Failed to create student. Please check the server or network.');
      }
    });
  }
}