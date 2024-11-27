import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-search-customer',
  templateUrl: './search-customer.component.html',
  styleUrls: ['./search-customer.component.css']
})
export class SearchCustomerComponent {
  customerId: number | null = null;
  customer: any = null; // This will hold the customer data after search
  errorMessage = '';
  successMessage = '';

  private apiUrl = 'https://pharmacy1api20241126012046.azurewebsites.net/api/Customers/search?customerId=';

  constructor(private http: HttpClient) {}

  onSearch(): void {
    if (this.customerId) {
      this.http.get<any>(`${this.apiUrl}${this.customerId}`).subscribe({
        next: (response) => {
          if (response.success) {
            this.customer = response.data; // Set the customer data
            this.successMessage = 'Customer fetched successfully!';
            this.errorMessage = '';
          } else {
            this.errorMessage = response.message || 'Customer not found.';
            this.successMessage = '';
            this.customer = null; // Clear previous customer data
          }
        },
        error: (err) => {
          this.errorMessage = 'An error occurred while fetching the customer.';
          this.successMessage = '';
          this.customer = null;
        }
      });
    } else {
      this.errorMessage = 'Please enter a valid Customer ID.';
      this.successMessage = '';
      this.customer = null;
    }
  }
}
