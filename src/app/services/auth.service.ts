import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

interface LoginResponse {
  id: string,
  email: string;
  username: string,
  auth_token: string;
  role: string;
  organizationId: string;
  accessLevel: string;
  data: any;
  success: boolean;
  status: string;
  message: string;
  password: string;
  organizationUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  basePath = 'http://122.170.12.63:90/api/auth/login';

  constructor(private router: Router,
    private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }

  loginForm(data: any): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(this.basePath, data, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  setUser(resp: LoginResponse) {
    localStorage.setItem('email', resp.email);
    localStorage.setItem('auth_token', resp.auth_token);
    this.router.navigate(['/list']);
  }

  isLoggedIn() {
    return localStorage.getItem('auth_token') != null;
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  getData(data: any): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(this.basePath, data, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }


}
