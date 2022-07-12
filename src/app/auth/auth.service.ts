import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
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
  user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient, private router: Router) {}

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

  logOut() {
    this.user.next(null);
    localStorage.removeItem('userData');
    if (this.router.url === '/') {
      window.location.reload();
    }
    this.router.navigate(['/']);
  }

  autoLogin() {
    const userData: AuthResponseData = JSON.parse(
      localStorage.getItem('userData')
    );
    if (!userData) {
      return;
    }
    const loadedUser = new User(userData.jwt, userData.user);
    if (loadedUser.token) {
      this.user.next(loadedUser);
    }
  }

  private handleAuth(token: string, userObj: any) {
    const user = new User(token, userObj);
    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleErro(respError: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!respError.error.error || !respError.error.error.message) {
      return throwError(() => new Error(errorMessage));
    }
    return throwError(() => new Error(respError.error.error.message));
  }
}
