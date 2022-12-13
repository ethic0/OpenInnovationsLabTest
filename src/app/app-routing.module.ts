import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProductsComponent } from './products/products.component';
import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
  {
    path:'', component:LoginComponent
  },
  {
    path:'products', component: ProductsComponent, canActivate:[AuthGuard]
  },
  {
    path:'**', redirectTo:'',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
