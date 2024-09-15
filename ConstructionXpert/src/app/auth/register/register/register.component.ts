import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticateService } from 'src/app/services/authenticate.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;

  constructor(
    private service: AuthenticateService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],  // Full name
      email: ['', [Validators.required, Validators.email]],  // Email
      password: ['', [Validators.required]],  // Password
      confirmPassword: ['', [Validators.required]]  // Confirm Password
    }, { validator: this.passwordMatchValidator });
  }

  // Validator to check if the password and confirm password fields match
  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      formGroup.get('confirmPassword')?.setErrors({ passwordMismatch: true });
    } else {
      formGroup.get('confirmPassword')?.setErrors(null);
    }
  }

  // Method to handle form submission
  submitForm() {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      this.service.register(this.registerForm.value).subscribe(
        (response: any) => {  // Use 'any' for now, but ideally define a specific type
          console.log('Registration successful:', response);
          this.router.navigate(['/dashboard']);
        },
        (error: any) => {  // Also type the error parameter
          console.error('Registration failed:', error);
        }
      );
    }
  
  }
}
