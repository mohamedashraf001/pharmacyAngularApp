import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  
  private apiUrl = 'https://pharmacy1api20241126012046.azurewebsites.net/api/Auth/login';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    // Check if the user is already logged in
    const loggedInEmail = localStorage.getItem('email');
    if (loggedInEmail) {
      // If the user is already logged in, route accordingly
      if (loggedInEmail === 'admin@example.com') {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/home']);
      }
    }
  }

  onSubmit(): void {
    const loginData = {
      email: this.email,
      password: this.password
    };

    // Make the HTTP POST request to the login API
    this.http.post<any>(this.apiUrl, loginData).subscribe({
      next: (response) => {
        if (response.success) {
          // Store the user's email and logged-in status in localStorage
          localStorage.setItem('email', this.email);

          // Redirect based on the user's email
          if (this.email === 'admin@example.com') {
            this.router.navigate(['/page']);  // Admin page
          } else {
            this.router.navigate(['/home']);   // User home page
          }
        } else {
          // If login fails, show the error message
          this.errorMessage = response.message || 'Login failed. Please try again.';
        }
      },
      error: (err) => {
        // Handle error case (e.g., network issues)
        this.errorMessage = 'An error occurred. Please try again later.';
      }
    });
  }

  // Method to handle logout and clear localStorage
  logout(): void {
    localStorage.removeItem('email');
    this.router.navigate(['/login']);
  }
}
