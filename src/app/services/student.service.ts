import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Student {
  id?: number;
  username: string;
  level: string;
}

@Injectable({ providedIn: 'root' })
export class StudentService {
  private apiUrl = 'http://localhost:8089/students';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.apiUrl}/all`);
  }
 get(page: number, searchTerm: string, filterLevel: string): Observable<Student[]> {
    // 1. Démarrez l'URL avec la pagination
    let url = `${this.apiUrl}?page=${page}`; 
    
    // 2. Ajoutez le terme de recherche SI il est présent
    if (searchTerm) {
      // ⚠️ ASSUREZ-VOUS QUE LE NOM DU PARAMÈTRE EST CORRECT: 'search'
      url += `&search=${searchTerm}`; 
    }
    
    // 3. Ajoutez le filtre de niveau SI il est présent
    if (filterLevel) {
      // ⚠️ ASSUREZ-VOUS QUE LE NOM DU PARAMÈTRE EST CORRECT: 'level'
      url += `&level=${filterLevel}`; 
    }
    console.log("Fetching URL: ", url); // ⬅️ AJOUTEZ CE LOG POUR VÉRIFIER L'URL DANS LA CONSOLE
    
    return this.http.get<Student[]>(url);
  }

  search(query: string): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.apiUrl}?search=${query}`);
  }

  create(student: Student): Observable<Student> {
    return this.http.post<Student>(`${this.apiUrl}/add`, student);
  }

  update(student: Student): Observable<Student> {
    return this.http.put<Student>(`${this.apiUrl}/update/${student.id}`, student);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

  uploadCSV(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/upload`, formData);
  }

  exportCSV(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/export`, { responseType: 'blob' });
  }
}
