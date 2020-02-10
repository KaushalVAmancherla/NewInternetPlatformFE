import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { endpoints } from '../shared/constants/endpoints.constant';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) {
  }

  /**
   * Execute user registration
   * @param user
   */
  signup(
    user: {
      firstName: string,
      lastName: string,
      username: string,
      email: string,
      password: string,
      password_retype: string
    }): Observable<any> {
    const url = this.baseUrl + endpoints.signup;
    return this.httpClient.post<JSON>(url, user);
  }

}
