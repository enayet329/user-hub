import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function matchPasswordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmpass')?.value;

    return password && confirmPassword && password !== confirmPassword ? { noPasswordMatch: true } : null;
  };
}
