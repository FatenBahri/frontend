import { Component } from '@angular/core';
import { AuthLoginService } from '../services/auth-login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']

})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private authService :AuthLoginService, private router: Router) {}

  login() {
    this.authService.login(this.username, this.password).subscribe({
      next: (res) => {
        this.authService.saveToken(res.token);
        this.router.navigate(['/students']); // redirection après login
      },
      error: (err) => {
        this.errorMessage = 'Nom d’utilisateur ou mot de passe incorrect';
        console.error(err);
      }
    });
  }
}
