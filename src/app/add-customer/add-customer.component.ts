import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent {
  customer = {
    name: '',
    phone: '',
    customerId: '',
    companyName: '',
    address: ''
  };

  errorMessage = '';
  successMessage = '';

  private apiUrl = 'https://pharmacy1api20241126012046.azurewebsites.net/api/Customers';

  constructor(private http: HttpClient) {}

  onSubmit(): void {
    if (this.isFormValid()) {
      this.http.post<any>(this.apiUrl, this.customer).subscribe({
        next: (response) => {
          if (response.success) {
            this.successMessage = 'Customer added successfully!';
            this.errorMessage = '';
            // Optionally reset the form after successful submission
            this.resetForm();
          } else {
            this.errorMessage = response.message || 'Failed to add customer.';
            this.successMessage = '';
          }
        },
        error: (err) => {
          this.errorMessage = 'An error occurred while adding the customer.';
          this.successMessage = '';
        }
      });
    } else {
      this.errorMessage = 'All fields are required.';
      this.successMessage = '';
    }
  }

  isFormValid(): boolean {
    return (
      this.customer.name !== '' &&
      this.customer.phone !== '' &&
      this.customer.customerId !== '' &&
      this.customer.companyName !== '' &&
      this.customer.address !== ''
    );
  }

  // Reset the form after successful submission
  resetForm(): void {
    this.customer = {
      name: '',
      phone: '',
      customerId: '',
      companyName: '',
      address: ''
    };
  }
}
