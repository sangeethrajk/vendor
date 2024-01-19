import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ApiService } from '../service/api.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(private titleService: Title, private fb: FormBuilder, private apiCall: ApiService, private _snackBar: MatSnackBar, private router: Router
  ) {
    this.updateTitle();
  }
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

  }

  updateTitle() {
    this.titleService.setTitle('Login');
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const username = this.loginForm.get('username')?.value;
      const password = this.loginForm.get('password')?.value;

      const payload = {
        username: username
      }
      this.apiCall.apiPostCall(payload, 'loginCheck').subscribe(data => {
        if (data.message === 'Success') {
          this.apiCall.vendorDetails = data.data;
          localStorage.setItem('vendorDet',JSON.stringify(data.data))
          this.router.navigate(['/vendor/home']);
        }
      }, error => {
        console.log(error)
        this._snackBar.open(error, 'Ok', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      })
    } else {
      return;
    }
  }

}
