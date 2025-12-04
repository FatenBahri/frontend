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
  // Base URL de votre AdminController
  private apiUrl = 'http://localhost:8089/log'; 

  constructor(private http: HttpClient) { }

  /**
   * 1. Envoie les identifiants à /log/login et récupère le JWT
   */
  login(username: string, password: string): Observable<LoginResponse> {
    const credentials = { username, password };
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials);
  }

  /**
   * 2. Stocke le token dans le localStorage pour utilisation ultérieure (par l'intercepteur)
   */
  saveToken(token: string): void {
    localStorage.setItem('jwtToken', token);
  }

  /**
   * 3. Récupère le token stocké
   */
  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  /**
   * 4. Supprime le token (Déconnexion)
   */
  logout(): void {
    localStorage.removeItem('jwtToken');
  }
}