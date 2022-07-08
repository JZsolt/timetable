import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

export interface AuthResponseData {
  jwt: string;
  user: {
    id: number;
    username: string;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    createdAt: string;
    updatedAt: string;
  };
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  signUp(username: string, email: string, password: string) {
    return this.http
      .post<AuthResponseData>('http://localhost:1337/api/auth/local/register', {
        username: username,
        email: email,
        password: password,
      })
      .pipe(catchError(this.handleErro));
  }

  logIn(email: string, password: string) {
    return this.http
      .post<AuthResponseData>('http://localhost:1337/api/auth/local', {
        identifier: email,
        password: password,
      })
      .pipe(catchError(this.handleErro));
  }

  private handleErro(respError: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!respError.error.error || !respError.error.error.message) {
      return throwError(() => new Error(errorMessage));
    }
    return throwError(() => new Error(respError.error.error.message));
  }
}
