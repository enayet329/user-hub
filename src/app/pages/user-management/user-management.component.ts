
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiResponse, User } from '../../core/model/common.model';
import { AuthService } from '../../core/services/auth.service';
import { Subscription } from 'rxjs';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { LocalStorage } from '../../core/constants/constants';
import { JwtPayload } from '../../core/model/common.model';
import { JwtDecoderService } from '../../core/services/jwt-decoder.service';
import { UserService } from '../../core/services/user.service';

@Component({
  standalone: true,
  selector: 'app-user-management',
  imports: [NgFor, NgIf, DatePipe],
  providers: [UserService],
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit, OnDestroy {
  users: User[] = [];
  selectedUserEmails: string[] = [];
  loading = false;
  errorMessage: string | null = null;
  loggedInUserEmail = '';
  loggedInUserName = '';

  private subscriptions: Subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private jwtDecoderService: JwtDecoderService,
    private router: Router,
    private userService: UserService
  ) {
    const token = localStorage.getItem(LocalStorage.token);
    if (token) {
      this.loggedInUserEmail = this.decodeTokenAndGetClaim(token, 'email') || '';
      this.loggedInUserName = this.decodeTokenAndGetClaim(token, 'name') || '';
      this.userService.setUserName(this.loggedInUserName);
      console.log('Logged In User Email:', this.loggedInUserEmail);
      console.log('Logged In User Name:', this.loggedInUserName);
    } else {
      console.log('Invalid token:', token);
    }
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private decodeTokenAndGetClaim(token: string | null, claimName: keyof JwtPayload): string | null {
    if (!token) return null;
    return this.jwtDecoderService.getClaimFromToken(token, claimName) as string | null;
  }

  loadUsers(): void {
    this.loading = true;
    this.errorMessage = null;

    this.subscriptions.add(
      this.authService.getUsers().subscribe(
        (response: ApiResponse<User[]> | User[]) => {
          this.loading = false;

          if (Array.isArray(response)) {
            this.users = response;
            console.log('User data loaded successfully!');
          } else {
            console.error('Invalid response structure:', response);
            this.errorMessage = 'Failed to load users due to invalid response structure.';
          }
        },
        error => {
          this.loading = false;
          this.errorMessage = 'Failed to load users. Please try again later.';
          console.error('Error loading users:', error);
        }
      )
    );
  }

  toggleUserSelection(user: User): void {
    const index = this.selectedUserEmails.indexOf(user.email);
    if (index > -1) {
      this.selectedUserEmails.splice(index, 1);
    } else {
      this.selectedUserEmails.push(user.email);
    }
  }

  deleteSelectedUsers(): void {
    if (this.selectedUserEmails.length === 0) {
      console.log('No users selected for deletion');
      return;
    }

    this.loading = true;
    const deletedUsers = [...this.selectedUserEmails];
    this.subscriptions.add(
      this.authService.deleteUser(this.selectedUserEmails).subscribe(
        () => {
          this.loading = false;
          this.users = this.users.filter(user => !deletedUsers.includes(user.email));
          console.log('Users deleted successfully');
          this.autoLogoutIfSelfAffected(deletedUsers);
          this.selectedUserEmails = [];
          
        },
        error => {
          this.loading = false;
          console.error('Error deleting users:', error);
        }
      )
    );
  }

  blockSelectedUsers(): void {
    if (this.selectedUserEmails.length === 0) {
      console.log('No users selected for blocking');
      return;
    }

    this.loading = true;
    const blockedUsers = [...this.selectedUserEmails];
    this.subscriptions.add(
      this.authService.blockUsers(this.selectedUserEmails).subscribe(
        () => {
          this.loading = false;
          this.users.forEach(user => {
            if (blockedUsers.includes(user.email)) {
              user.isBlocked = true;
            }
          });
          console.log('Users blocked successfully');
          this.autoLogoutIfSelfAffected(blockedUsers);
          this.selectedUserEmails = [];
          this.loadUsers();
        },
        error => {
          this.loading = false;
          console.error('Error blocking users:', error);
        }
      )
    );
  }

  unblockSelectedUsers(): void {
    if (this.selectedUserEmails.length === 0) {
      console.log('No users selected for unblocking');
      return;
    }

    this.loading = true;
    this.subscriptions.add(
      this.authService.unBlockUsersByEmail(this.selectedUserEmails).subscribe(
        () => {
          this.loading = false;
          this.users.forEach(user => {
            if (this.selectedUserEmails.includes(user.email)) {
              user.isBlocked = false;
            }
          });
          this.autoLogoutIfSelfAffected(this.selectedUserEmails);
          console.log('Users unblocked successfully');
          this.loadUsers();
        },
        error => {
          this.loading = false;
          console.error('Error unblocking users:', error);
        }
      )
    );
  }

  logout(): void {
    this.authService.logout();
    this.userService.setUserName('');
    console.log('User LogOut Successfully');
  }

  private autoLogoutIfSelfAffected(affectedUsers: string[]): void {
    console.log('Affected users:', affectedUsers);
    console.log('Logged in user:', this.loggedInUserEmail);
    
    if (affectedUsers.some(email => email.toLowerCase() === this.loggedInUserEmail.toLowerCase())) {
      console.log('User affected themselves. Logging out...');
      this.logout();
      this.router.navigate(['/login']);
    } else {
      this.loadUsers();
    }
  }
}