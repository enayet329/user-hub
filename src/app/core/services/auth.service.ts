// auth.service.ts

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse, LoginPayload, User } from '../model/common.model';
import { ApiEndPoint, LocalStorage } from '../constants/constants';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private router = inject(Router);
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private _http: HttpClient) {
    this.checkLoginStatus();
  }

  getUsers(): Observable<ApiResponse<User[]>> {
    const token = localStorage.getItem(`${LocalStorage.token}`);
    
    const headers = new HttpHeaders({
      Accept: '*/*',
      Authorization: `Bearer ${token}`
    });
    
    return this._http.get<ApiResponse<User[]>>(`${ApiEndPoint.Auth.GetUsers}`, { headers });
  }

  addUser(user: User): Observable<ApiResponse<User>> {
    return this._http.post<ApiResponse<User>>(
      `${ApiEndPoint.Auth.Register}`,
      user
    );
  }

  login(user: LoginPayload): Observable<ApiResponse<User>> {
    return this._http
      .post<ApiResponse<User>>(`${ApiEndPoint.Auth.Login}`, user)
      .pipe(
        map((response: ApiResponse<User>) => {
          if (response.isSuccess && response.token) {
            localStorage.setItem(LocalStorage.token, response.token);
            this.isLoggedInSubject.next(true);
          }
          return response;
        })
      );
  }

  deleteUser(userEmail: string[]): Observable<void> {
    const token = localStorage.getItem(`${LocalStorage.token}`);
    const url = `${ApiEndPoint.Auth.Delete}`;
    
    const headers = new HttpHeaders({
      'accept': '*/*',
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    });
    
    const options = {
      headers: headers,
      body: {
        userEmail: userEmail
      }
    };
    
    return this._http.delete<void>(url, options);
  }

  blockUsers(userEmail: string[]): Observable<void> {
    const token = localStorage.getItem(`${LocalStorage.token}`);
    const url = `${ApiEndPoint.Auth.Block}`;
    
    const headers = new HttpHeaders({
      'accept': '*/*',
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    });
    
    const body = {
      userEmail: userEmail
    };
    
    return this._http.put<void>(url, body, { headers });
  }

  unBlockUsersByEmail(emails: string[]): Observable<void> {
    const token = localStorage.getItem(`${LocalStorage.token}`);
    const url = `${ApiEndPoint.Auth.Unblock}`;
    
    const headers = new HttpHeaders({
      'accept': '*/*',
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    });
    
    const body = {
      userEmail: emails
    };
    
    return this._http.put<void>(url, body, { headers });
  }

  logout() {
    localStorage.removeItem(LocalStorage.token);
    this.router.navigate(['login']);
    this.isLoggedInSubject.next(false);
  }

  checkLoginStatus() {
    const token = localStorage.getItem(LocalStorage.token);
    this.isLoggedInSubject.next(!!token);
  }
}