import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../shared/components/modal/modal.component';
import { UserInfoService } from '../shared/services/user-info.service';
import { SignupService } from './signup.service';
import { takeUntil } from 'rxjs/operators';
import { Utils} from '../shared/utils/Utils';
import { faEye, faEyeSlash, faCheck, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { MustMatchValidation } from '../shared/validators/must-match.validator';
import { ModalConfig } from '../shared/models/modal-config';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  providers: [SignupService]
})
export class SignupComponent implements OnInit, OnDestroy {

  private unsubscribe: Subject<void> = new Subject<void>();

  signupForm: FormGroup;

  pswIcon: IconDefinition = faEyeSlash;

  pswType: string = 'password';

  msgErrorService: string = '';

  @ViewChild('registerationModal', { static: false }) private registrationModal: ModalComponent;

  registerationModalOptions: ModalConfig = {
    id: 'registerationModal',
    title: 'Registration',
    description: '',
    icon:  faCheck,
    iconColor: 'text-success',
    okButtonLabel: 'Login',
    okButtonClick: this.goToLogin,
    closeButtonClick:  this.goToLogin,
  };

  constructor(
    protected router: Router,
    private formBuilder: FormBuilder,
    private userInfoService: UserInfoService,
    private modalService: NgbModal,
    private signupService: SignupService
  ) {
  }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      firstName: new FormControl('', {
        validators: [Validators.required, Validators.maxLength(45), Validators.pattern(Utils.CHARSET_NAME_REGEX)],
        updateOn: 'blur'
      }),
      lastName: new FormControl('', {
        validators: [Validators.required, Validators.maxLength(45), Validators.pattern(Utils.CHARSET_NAME_REGEX)],
        updateOn: 'blur'
      }),
      username: new FormControl('', { // TODO Add unique validator
        validators: [Validators.required, Validators.minLength(6), Validators.maxLength(16), Validators.pattern(Utils.CHARSET_NAME_REGEX)],
        updateOn: 'blur'
      }),
      email: new FormControl('', { // TODO Add unique validator
        validators: [Validators.required, Validators.email, Validators.pattern(Utils.CHARSET_EMAIL_REGEX)],
        updateOn: 'blur'
      }),
      password: ['', [Validators.required, Validators.pattern(Utils.CHARSET_PASSWORD_REGEX)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validator: MustMatchValidation('password', 'confirmPassword')
    });
  }

  checkPasswords(group: FormGroup) {
    const password = group.controls.password.value;
    const confirmPassword = group.controls.confirmPassword.value;
    if (password === confirmPassword) {
      group.get('confirmPassword').setErrors(null);
    } else {
      group.get('confirmPassword').setErrors({notMatch: true});
    }
  }

  public ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
    this.unsubscribe.unsubscribe();
  }

  switchPsw() {
    this.pswType === 'text' ? this.pswType = 'password' : this.pswType = 'text';
    this.pswIcon === faEyeSlash ? this.pswIcon = faEye : this.pswIcon = faEyeSlash;
  }

  onSubmit() {
    this.msgErrorService = null;
    if (this.signupForm.valid) {
      const user = {
        firstName: this.signupForm.value.firstName,
        lastName: this.signupForm.value.lastName,
        username: this.signupForm.value.username,
        email: this.signupForm.value.email,
        password: this.signupForm.value.password,
        password_retype: this.signupForm.value.confirmPassword
      };

      this.signupService.signup(user)
        .pipe(takeUntil(this.unsubscribe))
        .subscribe(
          data => {
            if (data && data.data && data.data.message) {
              this.registerationModalOptions.description = data.data.message;
              this.registrationModal.open();
            }
          },
          error => {
            this.msgErrorService = error;
          });

    } else {
      Utils.validateForm(this.signupForm);
    }
  }

  onReset() {
    this.signupForm.reset();
  }

  goToLogin() {
    this.router.navigate(['login']);
  }

  get firstName() {
    return this.signupForm.get('firstName');
  }

  get lastName() {
    return this.signupForm.get('lastName');
  }

  get username() {
    return this.signupForm.get('username');
  }

  get email() {
    return this.signupForm.get('email');
  }

  get password() {
    return this.signupForm.get('password');
  }

  get confirmPassword() {
    return this.signupForm.get('confirmPassword');
  }

}
