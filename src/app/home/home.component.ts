import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private router: Router) {}

  // Logout method to clear the email from localStorage and navigate to the login page
  logout(): void {
    localStorage.removeItem('email');
    this.router.navigate(['/login']);
  }
}
