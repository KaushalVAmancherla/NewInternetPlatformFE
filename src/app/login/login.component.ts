import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserInfoService } from '../shared/services/user-info.service';
import { LoginService } from './login.service';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Utils } from '../shared/utils/Utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit, OnDestroy {

  private unsubscribe: Subject<void> = new Subject<void>();

  loginForm: FormGroup;

  pswIcon = faEyeSlash;

  pswType: string = 'password';

  msgErrorService: string = '';

  constructor(
    protected router: Router,
    private formBuilder: FormBuilder,
    private userInfoService: UserInfoService,
    private loginService: LoginService
  ) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    }, {
      updateOn: 'blur'
    });
  }

  public ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
    this.unsubscribe.unsubscribe();
  }

  get password() {
    return this.loginForm.get('password');
  }

  get email() {
    return this.loginForm.get('email');
  }

  onSubmit() {
    this.msgErrorService = null;
    if (this.loginForm.valid) {
      const user = {
        user: {
          email: this.loginForm.value.email,
          password: this.loginForm.value.password
        }
      };

      this.loginService.login(user)
        .pipe(takeUntil(this.unsubscribe))
        .subscribe(
          data => {
            if (data && data.user) {
              this.userInfoService.setUser(data.user);
              this.router.navigate(['dashboard']);
            }
          },
          error => {
            this.msgErrorService = error;
          });

    } else {
      Utils.validateForm(this.loginForm);
    }
  }

  switchPsw() {
    this.pswType === 'text' ? this.pswType = 'password' : this.pswType = 'text';
    this.pswIcon === faEyeSlash ? this.pswIcon = faEye : this.pswIcon = faEyeSlash;
  }

  forgotPassword() {
    // TODO Implement forgot password
  }

}
