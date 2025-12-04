import { Component, OnInit } from '@angular/core'; // ⬅️ Ajout de OnInit
import { StudentService } from '../services/student.service'; 
import { AuthLoginService } from '../services/auth-login.service'; // ⬅️ Import du service d'auth
import { Router } from '@angular/router'; // ⬅️ Import du Router

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit { // ⬅️ Implémentation de OnInit
  students: any[] = [];
  page = 1;
  searchTerm = "";
  filterLevel = "";
  levels = [
    "Primaire",
    "Secondaire",
    "Bac",
    "License",
    "Master"
  ];

  // 1. Injection des dépendances nécessaires
  constructor(private service: StudentService, private authService: AuthLoginService, private router: Router) {} 

  ngOnInit() {
    this.loadStudents();
  }

  loadStudents() {
    // L'appel de 'get' est le même, mais la logique a été corrigée dans le service.
    this.service.get(this.page, this.searchTerm, this.filterLevel)
      .subscribe((data:any) => this.students = data); 
  }
  
  nextPage() { this.page++; this.loadStudents(); }
  previousPage() { if (this.page>1) this.page--; this.loadStudents(); }

  // 2. Méthode de déconnexion
  logout() {
    this.authService.logout();
    this.router.navigate(['/log']); 
  }

  createStudent() {
    this.router.navigate(['/students/create']);
  }

  editStudent(s:any) {
    this.router.navigate(['/students/edit', s.id]); 
  }

  deleteStudent(id:number) {
    // Ajout d'une confirmation avant la suppression
    if (confirm(`Êtes-vous sûr de vouloir supprimer l'étudiant avec l'ID ${id} ?`)) {
      this.service.delete(id).subscribe(() => this.loadStudents());
    }
  }

  exportCsv() {
  }

  importCsv() {
     
  }
}