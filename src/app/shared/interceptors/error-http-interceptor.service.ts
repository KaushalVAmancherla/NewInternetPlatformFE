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
      errorMessage = `Error: ${error.error.message || 'Generic error'}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message || 'Generic error'}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

}
