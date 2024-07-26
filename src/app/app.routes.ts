import { Routes } from '@angular/router';
import { LayoutComponent } from './shared/layout/layout.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { UserManagementComponent } from './pages/user-management/user-management.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    
    {
        path: '',
        component: LayoutComponent,
        children: [
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
          {
            path: 'dashboard',
            canActivate: [authGuard],
            component: UserManagementComponent
          },
          { path: 'login', component: LoginComponent },
          { path: 'register', component: RegisterComponent }
        ]
      }
];