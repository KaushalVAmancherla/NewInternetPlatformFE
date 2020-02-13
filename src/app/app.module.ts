import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoggedModule } from './private/logged.module';

import { HeadersInterceptor } from './shared/interceptors/headers.interceptor';
import { AppHttpInterceptor } from './shared/interceptors/app-http.interceptor';
import { ErrorHttpInterceptor } from './shared/interceptors/error-http.interceptor';
import { UserInfoService } from './shared/services/user-info.service';
import { LoggedGuardService } from './shared/services/logged-guard.service';

import { AppComponent } from './app.component';
import { ErrorComponent } from './shared/components/error/error.component';
import { ModalComponent } from './shared/components/modal/modal.component';
import { LoginComponent } from './login/login.component';
import { NipHeaderComponent } from './nip-header/nip-header.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    ModalComponent,
    LoginComponent,
    NipHeaderComponent,
    SignupComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    FontAwesomeModule,
    NgbModule,
    LoggedModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeadersInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppHttpInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHttpInterceptor,
      multi: true
    },
    UserInfoService,
    LoggedGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
