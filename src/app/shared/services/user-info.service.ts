import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  /**
   * User info
   */
  private user: User;

  constructor() {
  }

  public setUser(user: any) {
    if (user) {
      this.user = {
        email: user.email,
        token: user.token,
        id: user._id
      };
    } else {
      this.user = null;
    }
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
