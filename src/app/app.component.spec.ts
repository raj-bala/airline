import { TestBed, async, ComponentFixture, fakeAsync, discardPeriodicTasks, flush, flushMicrotasks } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HttpClientModule } from '../../node_modules/@angular/common/http';
import { NgxSocialButtonModule, SocialService, SocialServiceConfig } from '../../node_modules/ngx-social-button';
import { BrowserAnimationsModule } from '../../node_modules/@angular/platform-browser/animations';
import { getAuthServiceConfigs } from './app.module';
import { NO_ERRORS_SCHEMA } from '../../node_modules/@angular/core';
import { RouterOutlet } from '../../node_modules/@angular/router';
import { AuthsService } from './login/services/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '../../node_modules/@angular/platform-browser';


describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule, HttpClientTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]), HttpClientTestingModule, HttpClientModule, RouterTestingModule, NgxSocialButtonModule, BrowserAnimationsModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [AuthsService, SocialService,
        {
          provide: SocialServiceConfig,
          useFactory: getAuthServiceConfigs
        }],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it(
    'should have a router outlet',
    fakeAsync(() => {
      const element = fixture.debugElement.query(By.directive(RouterOutlet));
      expect(element).not.toBeNull();
    })
  );
  it('should create the app', fakeAsync(() => {
    expect(component).toBeTruthy();
  }));
  it('should call fetchUser method', fakeAsync(() => {
    spyOn(component, 'fetchUser').and.callThrough();
    component.fetchUser();
    expect(component.fetchUser).toHaveBeenCalled();
    flush();
    flushMicrotasks();
    discardPeriodicTasks();

   }));
});
