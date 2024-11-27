import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  customers: any[] = [];
  operations: any[] = [];
  customersApiUrl = 'https://pharmacy1api20241126012046.azurewebsites.net/api/Customers';
  operationsApiUrl = 'https://pharmacy1api20241126012046.azurewebsites.net/api/Operations';
  loadingCustomers = false;
  loadingOperations = false;
  errorMessage: string | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    const loggedInEmail = localStorage.getItem('email');
    if (loggedInEmail !== 'admin@example.com') {
      this.router.navigate(['/home']); // Redirect to home if not admin
      return;
    }

    this.getCustomers();
    this.getOperations();
  }

  getCustomers(): void {
    this.loadingCustomers = true;
    this.http.get<any>(this.customersApiUrl).subscribe({
      next: (response) => {
        if (response.success) {
          this.customers = response.data;
        } else {
          console.error('Failed to fetch customers:', response.message);
          this.errorMessage = response.message;
        }
        this.loadingCustomers = false;
      },
      error: (err) => {
        console.error('An error occurred while fetching customers:', err);
        this.loadingCustomers = false;
        this.errorMessage = 'An error occurred while fetching customer data.';
      }
    });
  }

  getOperations(): void {
    this.loadingOperations = true;
    this.http.get<any>(this.operationsApiUrl).subscribe({
      next: (response) => {
        if (response.success) {
          this.operations = response.data;
        } else {
          console.error('Failed to fetch operations:', response.message);
          this.errorMessage = response.message;
        }
        this.loadingOperations = false;
      },
      error: (err) => {
        console.error('An error occurred while fetching operations:', err);
        this.loadingOperations = false;
        this.errorMessage = 'An error occurred while fetching operation data.';
      }
    });
  }

  // Save updated customer
  saveCustomer(customer: any): void {
    const url = `${this.customersApiUrl}/${customer.id}`;
    const updateData = { 
      name: customer.name,
      phone: customer.phone,
      customerId: customer.customerId,
      companyName: customer.companyName,
      address: customer.address
    };

    this.http.put<any>(url, updateData).subscribe({
      next: (response) => {
        if (response.success) {
          alert('Customer updated successfully!');
        } else {
          console.error('Failed to update customer:', response.message);
        }
      },
      error: (err) => {
        console.error('An error occurred while updating customer:', err);
      }
    });
  }

  // Save updated operation
  saveOperation(operation: any): void {
    const url = `${this.operationsApiUrl}/${operation.id}`;
    const updateData = {
      operationType: operation.operationType,
      username: operation.username,
      branchName: operation.branchName,
      price: operation.price,
      description: operation.description
    };

    this.http.put<any>(url, updateData).subscribe({
      next: (response) => {
        if (response.success) {
          alert('Operation updated successfully!');
        } else {
          console.error('Failed to update operation:', response.message);
        }
      },
      error: (err) => {
        console.error('An error occurred while updating operation:', err);
      }
    });
  }

  // Delete customer
  deleteCustomer(customerId: number): void {
    const url = `${this.customersApiUrl}/${customerId}`;
    this.http.delete<any>(url).subscribe({
      next: (response) => {
        if (response.success) {
          this.customers = this.customers.filter(customer => customer.id !== customerId);
          alert('Customer deleted successfully!');
        } else {
          console.error('Failed to delete customer:', response.message);
        }
      },
      error: (err) => {
        console.error('An error occurred while deleting customer:', err);
      }
    });
  }

  // Delete operation
  deleteOperation(operationId: number): void {
    const url = `${this.operationsApiUrl}/${operationId}`;
    this.http.delete<any>(url).subscribe({
      next: (response) => {
        if (response.success) {
          this.operations = this.operations.filter(operation => operation.id !== operationId);
          alert('Operation deleted successfully!');
        } else {
          console.error('Failed to delete operation:', response.message);
        }
      },
      error: (err) => {
        console.error('An error occurred while deleting operation:', err);
      }
    });
  }
}
