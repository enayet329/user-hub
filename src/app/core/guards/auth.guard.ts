// auth.guard.ts

import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  let isLoggedIn = false;
  authService.isLoggedIn$.subscribe(loggedIn => isLoggedIn = loggedIn);

  if (!isLoggedIn) {
    router.navigate(['/login']);
    return false;
  }
  return true;
};