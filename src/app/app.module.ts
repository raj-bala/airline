import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {MatDatepickerModule } from '@angular/material/datepicker';
import {MatIconModule } from '@angular/material/icon';
import {MatButtonModule } from '@angular/material/button';
import {MatCheckboxModule } from '@angular/material/checkbox';
import {MatToolbarModule } from '@angular/material/toolbar';
import {MatCardModule } from '@angular/material/card';
import {MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule } from '@angular/material/input';
import {MatListModule } from '@angular/material/list';
import {MatTableModule } from '@angular/material/table';
import {MatMenuModule } from '@angular/material/menu';
import {MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatStepperModule} from '@angular/material/stepper';
import { AuthsService } from './login/services/auth.service';
import { AuthGuard } from './login/helper/auth.guard';
import { TokenInterceptorService } from './login/helper/token-interceptor.service';
import { InterceptorService } from './login/helper/interceptor.service';

import { NgxSocialButtonModule, SocialServiceConfig } from 'ngx-social-button';
import { NgxSpinnerModule } from 'ngx-spinner';

export function getAuthServiceConfigs() {
  const config = new SocialServiceConfig()
      .addFacebook('2559489370958187');
  return config;
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDatepickerModule, MatIconModule, MatButtonModule,
    MatCheckboxModule, MatToolbarModule, FormsModule, MatCardModule,
    MatFormFieldModule, MatInputModule, MatListModule, MatTableModule,
    MatMenuModule, MatProgressSpinnerModule, MatStepperModule,
    NgxSocialButtonModule, NgxSpinnerModule
  ],
  providers: [
    AuthsService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    {
      provide: SocialServiceConfig,
      useFactory: getAuthServiceConfigs
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
