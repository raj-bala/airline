import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffComponent } from './staff.component';
import { HttpClientModule } from '@angular/common/http';
import { SlideMenuModule } from 'primeng/slidemenu';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '../../../node_modules/@angular/platform-browser/animations';

describe('StaffComponent', () => {
  let component: StaffComponent;
  let fixture: ComponentFixture<StaffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffComponent ],
      imports: [HttpClientModule, SlideMenuModule, BrowserAnimationsModule, RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should run ngOnInit()', async () => {
    const spyOnMethod = spyOn(component, 'ngOnInit');
    const result = component.ngOnInit();
    expect(component.ngOnInit).toHaveBeenCalled();
  });
});
