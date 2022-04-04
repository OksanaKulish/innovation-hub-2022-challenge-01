import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMsg = '';
        if (error.status === 401) {
          console.log('401');
          errorMsg = `Error: ${error.error.message}`;
        }
        if (error.status === 400) {
          console.log('400');
          errorMsg = `Error: ${error.error.message}`;
        }
        console.log(errorMsg);
        return throwError(errorMsg);
      })
    );
  }
}
