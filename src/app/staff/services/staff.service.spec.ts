import { TestBed } from '@angular/core/testing';

import { StaffService } from './staff.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('StaffService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [StaffService],
    }).compileComponents();
  });

  it('should be created', () => {
    const service1: StaffService = TestBed.get(StaffService);
    expect(service1).toBeTruthy();
  });
});
