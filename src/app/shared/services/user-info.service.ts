import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

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

  public getUser() {
    return this.user;
  }

  public getUserEmail() {
    return this.user ? this.user.email : null;
  }

  public getUserToken() {
    return this.user ? this.user.token : null;
  }

  public getUserId() {
    return this.user ? this.user.id : null;
  }

}
