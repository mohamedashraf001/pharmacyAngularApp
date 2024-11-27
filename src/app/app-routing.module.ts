import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { AddOperationComponent } from './add-operation/add-operation.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { SearchCustomerComponent } from './search-customer/search-customer.component';

const routes: Routes = [
  {path:"Login",component:LoginComponent},
  {path:"home",component:HomeComponent},
  {path:"AddCustomer",component:AddCustomerComponent},
  {path:"AddOperation",component:AddOperationComponent},
  {path:"page",component:AdminPageComponent},
  {path:"SearchCustomer",component:SearchCustomerComponent},
  {path:"",component:LoginComponent},
  {path:"**",component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
