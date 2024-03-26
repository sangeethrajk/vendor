import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { HttpClient } from '@angular/common/http';

declare var AWS: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(
    private titleService: Title,
    private fb: FormBuilder,
    private authService: AuthService,
    private route: Router,
    private ngxService: NgxUiLoaderService,
    private http: HttpClient
  ) {
    this.updateTitle();
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      usernameOrEmail: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

  }

  updateTitle() {
    this.titleService.setTitle('Login');
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      this.authService.authenticateVendor(this.loginForm.value).subscribe(
        (response: any) => {
          sessionStorage.setItem('token', response.accessToken);
          sessionStorage.setItem('username', this.loginForm.get('usernameOrEmail')?.value);
          this.route.navigate(['/vendor']);
        },
        (error: any) => {
          console.error(error);
        }
      );
    } else {
      // Form is invalid, handle accordingly (show error messages, etc.)
      console.log('Form is invalid');
    }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.uploadFile(file);
  }

  uploadFile(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    this.http.post('http://files.tnhb.in/upload', formData).subscribe(
      (response) => {
        console.log('File uploaded successfully:', response);
      },
      (error) => {
        console.error('Error uploading file:', error);
      }
    );
  }

}
