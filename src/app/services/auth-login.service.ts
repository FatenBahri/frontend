// src/app/services/auth-login.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interface pour correspondre au JSON de réponse du backend : { "token": "..." }
interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthLoginService {
  private apiUrl = 'http://localhost:8089/log'; 

  constructor(private http: HttpClient) { }
  login(username: string, password: string): Observable<LoginResponse> {
    const credentials = { username, password };
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials);
  }
  saveToken(token: string): void {
    localStorage.setItem('jwtToken', token);
  }
  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  logout(): void {
    localStorage.removeItem('jwtToken');
  }
}