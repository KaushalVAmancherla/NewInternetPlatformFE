import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ErrorHttpInterceptor {

  constructor() {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error) {
    let errorMessage = '';
    if (error instanceof HttpErrorResponse) {
      const message = error.error && error.error.errors && error.error.errors.message;
      errorMessage = `Error: ${ message || 'An error occurred retrieving data. Please try later.'}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message || 'An error occurred retrieving data. Please try later.'}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

}
