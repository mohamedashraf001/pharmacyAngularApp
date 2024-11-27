import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-operation',
  templateUrl: './add-operation.component.html',
  styleUrls: ['./add-operation.component.css']
})
export class AddOperationComponent {
  operation = {
    operationType: 'add', // Default value (could be "add" or "deduct")
    username: '',
    branchName: '',
    price: null,  // Changed from 'amount' to 'price'
    description: ''
  };

  errorMessage = '';
  successMessage = '';

  private apiUrl = 'https://pharmacy1api20241126012046.azurewebsites.net/api/Operations';

  constructor(private http: HttpClient) {}

  onSubmit(): void {
    if (this.isFormValid()) {
      this.http.post<any>(this.apiUrl, this.operation).subscribe({
        next: (response) => {
          if (response.success) {
            this.successMessage = 'Operation added successfully!';
            this.errorMessage = '';
            // Optionally reset the form after successful submission
            this.resetForm();
          } else {
            this.errorMessage = response.message || 'Failed to add operation.';
            this.successMessage = '';
          }
        },
        error: (err) => {
          this.errorMessage = 'An error occurred while adding the operation.';
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
      this.operation.username !== '' &&
      this.operation.branchName !== '' &&
      this.operation.price !== null &&  // Updated to check 'price'
      this.operation.description !== ''
    );
  }

  // Reset the form after successful submission
  resetForm(): void {
    this.operation = {
      operationType: 'add',
      username: '',
      branchName: '',
      price: null,  // Reset 'price'
      description: ''
    };
  }
}
