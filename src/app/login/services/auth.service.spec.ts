import { TestBed, getTestBed } from '@angular/core/testing';

import { AuthsService } from './auth.service';
import {HttpClientModule} from '@angular/common/http';
import { RouterTestingModule } from '../../../../node_modules/@angular/router/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

describe('AuthsService', () => {
  let service: AuthsService;
  let injector: TestBed;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule, RouterTestingModule, HttpClientModule
      ],
      providers: [AuthsService],
    }).compileComponents();

    injector = getTestBed();
    service = injector.get(AuthsService);
    httpMock = injector.get(HttpTestingController);
  });


  it('should be created', () => {
    service = TestBed.get(AuthsService);
    expect(service).toBeTruthy();
  });
});
