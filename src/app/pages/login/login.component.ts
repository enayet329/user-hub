import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { LocalStorage } from '../../core/constants/constants';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  providers: [FormBuilder],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  form: FormGroup;
  authService = inject(AuthService);

  constructor(private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
      ]),
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const loginData = this.form.value;
      this.authService.login(loginData).subscribe({
        next: (res) => {
          if (res.isSuccess) {
            console.log('Logged In Successfully');
            this.router.navigate(['dashboard']);
          } else {
            alert(res.message);
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
