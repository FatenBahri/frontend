import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService, Student } from '../services/student.service'; 
import { HttpErrorResponse } from '@angular/common/http'; // Used for better error typing


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
    const newStudent: Student = {
      username: this.username,
      level: this.level
    };

    this.studentService.create(newStudent).subscribe({
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