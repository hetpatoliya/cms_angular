import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signUpForm!: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
      role: ['viewer', Validators.required]
    });
  }

  submitForm() {
    this.submitted = true;
    if (this.signUpForm.invalid) {
      return;
    }
    this.userService.signUp(this.signUpForm.value).subscribe({
      next: (value) => {
        Swal.fire({
          icon: 'success',
          title: 'Login successfull!',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          this.onReset();
          this.router.navigate(['/auth/login']);
        })
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.error.message,
        });
      },
    });
  }

  onReset() {
    this.submitted = false;
    this.signUpForm.reset();
  }
}
