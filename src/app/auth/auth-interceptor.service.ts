import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, take } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        if (user) {
          return next.handle(
            req.clone({
              headers: req.headers.set('Authorization', `Bearer ${user.token}`),
            })
          );
        } else {
          return next.handle(req);
        }
      })
    );
  }
}
