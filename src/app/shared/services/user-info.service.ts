import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  /**
   * User info
   */
  private user: User;

  /**
   * Check if the user is logged
   */
  private isUserLoggedObs: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() {
  }

  /**
   * Check if the User is logged
   * Return an Observable with true if the user is logged, false is not logged.
   */
  isUserLogged(): Observable<boolean> {
    return this.isUserLoggedObs.asObservable();
  }

  /**
   * Set User login
   * @param isLogged: true is correctly logged; false is not properly logged.
   */
  setUserLogged(isLogged: boolean): void {
    this.isUserLoggedObs.next(isLogged);
  }

  /**
   * Set User info
   * @param user data
   */
  public setUser(user: any): void {
    if (user) {
      this.user = {
        email: user.email,
        token: user.token,
        id: user._id
      };
    } else {
      this.user = null;
    }
    this.setUserLogged(user ? true : false);
  }

  /**
   * Get User info
   */
  public getUser(): User {
    return this.user;
  }

  /**
   * Get User email
   */
  public getUserEmail(): string {
    return this.user ? this.user.email : null;
  }

  /**
   * Get User login Token
   */
  public getUserToken(): string {
    return this.user ? this.user.token : null;
  }

  /**
   * Get User ID
   */
  public getUserId(): string {
    return this.user ? this.user.id : null;
  }

}
