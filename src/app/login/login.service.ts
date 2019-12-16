import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { endpoints } from '../shared/constants/endpoints.constant';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) {
  }

  login(user: any): Observable<any> {
    const url = this.baseUrl + endpoints.login;
    return this.httpClient.post<JSON>(url, user);
  }

}
