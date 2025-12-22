import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthService } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  if (req.url.includes('/oauth2/token')) {
    return next(req);
  }

  const authService = inject(AuthService);
  const token = localStorage.getItem('access_token');

  let novaReq = req;

  if (token) {
    novaReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }


  return next(novaReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        console.warn('Token expirado ou inválido. Redirecionando...');
        authService.expire();
      }

      return throwError(() => error);
    })
  );
};
