import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { IUser } from 'src/app/shared/interfaces/user.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: IUser = JSON.parse(sessionStorage.getItem('user') as string);
  userId = this.user._id;
  userForm!: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private _userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      firstName: [{ value: this.user.firstName, disabled: true }, Validators.required],
      lastName: [{ value: this.user.lastName, disabled: true }, Validators.required],
      phone: [{ value: this.user.phone, disabled: true }, [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      email: [{ value: this.user.email, disabled: true }, [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]]
    });
  }

  editUser() {
    this.submitted = true;
    if (this.userForm.invalid) {
      return;
    }
    this._userService.updateUser(this.userForm.value, this.userId).subscribe({
      next: (value) => {
        Swal.fire({
          icon: 'success',
          title: 'User updated successfully!',
          showConfirmButton: false,
          timer: 1000
        }).then(() => {
          this.onReset();
        })
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `${err.error.message}`
        })
      },
    });
  }

  enableEditMode() {
    this.userForm.controls['firstName']?.enable();
    this.userForm.controls['lastName']?.enable();
    this.userForm.controls['email']?.enable();
    this.userForm.controls['phone']?.enable();
  }

  deleteUser() {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this._userService.deleteUser(this.userId).subscribe({
          next: (value) => {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            }).then(() => {
              this.router.navigateByUrl('/auth/login');
              sessionStorage.clear();
            })
          },
          error: (err) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: `${err.error.message}`
            })
          },
        });
      }
    });
  }

  onReset() {
    this.submitted = false;
    this.userForm.disable();
  }

  cancelEditing() {
    this.onReset();
    this.userForm.controls['firstName'].setValue(this.user.firstName);
    this.userForm.controls['lastName'].setValue(this.user.lastName);
    this.userForm.controls['email'].setValue(this.user.email);
    this.userForm.controls['phone'].setValue(this.user.phone);
  }
}
