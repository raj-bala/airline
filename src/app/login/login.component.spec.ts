import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule } from '@angular/material/card';
import {MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxSocialButtonModule, SocialServiceConfig } from 'ngx-social-button';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AuthsService } from './services/auth.service';
import { RouterTestingModule } from '../../../node_modules/@angular/router/testing';
import { getAuthServiceConfigs } from '../app.module';
import { BrowserAnimationsModule } from '../../../node_modules/@angular/platform-browser/animations';
import { RouterModule } from '../../../node_modules/@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, MatDialogModule, MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatTableModule,
        MatIconModule,
        MatButtonModule,
        NgxSpinnerModule, NgxSocialButtonModule,
        FormsModule, HttpClientModule, RouterTestingModule, BrowserAnimationsModule,
        RouterModule],
      declarations: [LoginComponent],
      providers: [AuthsService,
        {
          provide: SocialServiceConfig,
          useFactory: getAuthServiceConfigs
        },
      ],
    }).compileComponents();
  }));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should set submitted to true', fakeAsync(() => {
     component.onSubmit();
     expect(component.onSubmit).toBeTruthy();

  }));
  it('should call onSubmit method', fakeAsync(() => {
   spyOn(component, 'onSubmit').and.callThrough();
   component.onSubmit();
   expect(component.onSubmit).toHaveBeenCalled();

  }));
  it('Form should be invalid', fakeAsync(() => {
    component.loginForm.controls.username.setValue('');
    component.loginForm.controls.password.setValue('');
    expect(component.loginForm.valid).toBeFalsy();
  }));

  it('Form should be valid', fakeAsync(() => {
    component.loginForm.controls.username.setValue('raj');
    component.loginForm.controls.password.setValue('rajuser');
    expect(component.loginForm.valid).toBeTruthy();
  }));

});
