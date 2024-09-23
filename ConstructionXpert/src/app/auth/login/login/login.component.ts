import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Jwt } from 'src/app/models/Jwt';
import { AuthenticateService } from 'src/app/services/authenticate.service';

// 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  hidePassword = true;

  constructor(
    private service: AuthenticateService,
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  submitForm(): void {
    if (this.loginForm.valid) {
      this.service.login(this.loginForm.value).subscribe(
        response => {
          localStorage.setItem('jwt', response.token);
          localStorage.setItem('role', response.role);

          this.snackBar.open('Login successful', 'Close', { duration: 3000 });

          if (response.role === 'ADMIN') {
            this.router.navigateByUrl('/dashboard');
          } else if (response.role === 'USER') {
            this.router.navigateByUrl('/dashboard/user-dashboard');
          } else {
            this.router.navigateByUrl('/dashboard');
          }
        },
        error => {
          this.snackBar.open('Login failed. Please try again.', 'Close', { duration: 3000 });
        }
      );
    }
  }
}
