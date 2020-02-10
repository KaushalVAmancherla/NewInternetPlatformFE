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

  /**
   * Execute login user
   * @param userData
   */
  login(
    userData: {
      user: {
        email: string,
        password: string
      }
    }): Observable<any> {
    const url = this.baseUrl + endpoints.login;
    return this.httpClient.post<JSON>(url, userData);
  }

}
