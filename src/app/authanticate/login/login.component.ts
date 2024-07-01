import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [''],
      password: ['']
    });
  }

  submitForm() {
    if (this.loginForm.invalid) {
      return;
    }
    this.userService.login(this.loginForm.value).subscribe({
      next: (value: any) => {
        sessionStorage.setItem('user', JSON.stringify(value.isUser));
        sessionStorage.setItem('role', value.isUser.role);
        sessionStorage.setItem('token', value.token);
        const role = value.isUser.role;
        Swal.fire({
          icon: 'success',
          title: 'Login successfull!',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          this.router.navigate([`/${role}/media`]);
        });
      }, error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.error.message,
        });
      },
    }
    );
  }

  onReset() {
    this.loginForm.reset();
  }
}