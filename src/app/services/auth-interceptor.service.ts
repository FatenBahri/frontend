// src/app/services/auth-interceptor.service.ts

import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthLoginService } from './auth-login.service'; 

@Injectable() 
export class AuthInterceptor implements HttpInterceptor {

  // Injecter le service d'authentification pour obtenir le token
  constructor(private authService: AuthLoginService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();

    // 1. Vérifiez si un token est présent
    if (token) {
      // 2. Cloner la requête pour ajouter le nouvel en-tête
      // Les requêtes sont IMMUABLES en Angular, il faut les cloner pour les modifier.
      const clonedRequest = request.clone({
        setHeaders: {
          // Format requis par Spring Security
          Authorization: `Bearer ${token}` 
        }
      });

      // 3. Envoyer la requête modifiée
      return next.handle(clonedRequest);
    }

    // Si pas de token (ex: première requête vers /log/login), on laisse passer la requête originale
    return next.handle(request);
  }
}