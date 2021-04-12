import { TestBed } from '@angular/core/testing';

import { CheckinService } from './checkin.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CheckinService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [CheckinService],
    }).compileComponents();
  });

  it('should be created', () => {
    const service1: CheckinService = TestBed.get(CheckinService);
    expect(service1).toBeTruthy();
  });
});
