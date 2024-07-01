import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthanticateRoutingModule } from './authanticate-routing.module';
import { AuthanticateComponent } from './authanticate.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AuthanticateComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    CommonModule,
    AuthanticateRoutingModule,
    ReactiveFormsModule
  ]
})
export class AuthanticateModule { }
