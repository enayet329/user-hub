import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { matchPasswordValidator } from '../../shared/validators/match-password.validator';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  form: FormGroup;
  authService = inject(AuthService);

  constructor(private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group(
      {
        name: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(1),
        ]),
        confirmpass: new FormControl('', [
          Validators.required,
          Validators.minLength(1),
        ]),
      },
      { validators: matchPasswordValidator() }
    );
  }

  onSubmit() {
    if (this.form.valid) {
      const { confirmpass, ...formData } = this.form.value;
      console.log(formData);

      this.authService.addUser(formData).subscribe({
        next: (res) => {
          console.log('Registration successful');
          alert((res.message));
          if(res.isSuccess)
          {
            this.router.navigate(['login']);
          }
        },
        error: (err) => {
          console.error('Registration error:', err);
        },
      });
    }
  }
}
