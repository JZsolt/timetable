import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Subject, tap, throwError } from 'rxjs';
import { User } from 'src/app/auth/user.model';

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
  user = new Subject<User>();

  constructor(private http: HttpClient) {}

  signUp(username: string, email: string, password: string) {
    return this.http
      .post<AuthResponseData>('http://localhost:1337/api/auth/local/register', {
        username: username,
        email: email,
        password: password,
      })
      .pipe(
        catchError(this.handleErro),
        tap((resData) => {
          this.handleAuth(resData.jwt, resData.user);
        })
      );
  }

  logIn(email: string, password: string) {
    return this.http
      .post<AuthResponseData>('http://localhost:1337/api/auth/local', {
        identifier: email,
        password: password,
      })
      .pipe(
        catchError(this.handleErro),
        tap((resData) => {
          this.handleAuth(resData.jwt, resData.user);
        })
      );
  }

  private handleAuth(token: string, userObj: any) {
    const user = new User(token, userObj);
    this.user.next(user);
  }

  private handleErro(respError: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!respError.error.error || !respError.error.error.message) {
      return throwError(() => new Error(errorMessage));
    }
    return throwError(() => new Error(respError.error.error.message));
  }
}
