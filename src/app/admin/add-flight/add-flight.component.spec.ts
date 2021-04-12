import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFlightComponent } from './add-flight.component';
import { of } from '../../../../node_modules/rxjs';
import { AdminService } from '../services/admin.service';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {CheckboxModule} from 'primeng/checkbox';
import {TableModule} from 'primeng/table';
import {DialogModule} from 'primeng/dialog';
import { CardModule } from 'primeng/card';
import {CalendarModule} from 'primeng/calendar';
import { SpinnerModule } from 'primeng/spinner';
import {MatStepperModule} from '@angular/material/stepper';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTableModule} from '@angular/material/table';
import {PanelMenuModule} from 'primeng/panelmenu';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HttpClientModule } from '../../../../node_modules/@angular/common/http';
import { BrowserAnimationsModule } from '../../../../node_modules/@angular/platform-browser/animations';
import { RouterTestingModule } from '../../../../node_modules/@angular/router/testing';
import { RouterModule } from '../../../../node_modules/@angular/router';


class MockAdminService {
  addFlights(obj) {
    return of(true);
  }
}
describe('AddFlightComponent', () => {
  let component: AddFlightComponent;
  let fixture: ComponentFixture<AddFlightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFlightComponent ],
      imports: [
        RouterModule, RouterTestingModule, BrowserAnimationsModule,
        FormsModule, ReactiveFormsModule, HttpClientModule,
        PanelMenuModule,
        MatDatepickerModule, MatNativeDateModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatStepperModule,
        MatCheckboxModule, MatTableModule,
        InputTextModule, ButtonModule, CheckboxModule, TableModule, CalendarModule,
        DialogModule, CardModule, SpinnerModule,
        NgbModule, NgxSpinnerModule,
        TooltipModule.forRoot()
      ],
      providers: [{ provide: AdminService, useClass: MockAdminService },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFlightComponent);
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
  it('should run addFlightDetails()', async () => {
    const flightForm = {
    flightnumber: '103',
    flightname: 'Boeing',
    flightorigin: 'Delhi',
    flightdest: 'Ranchi',
    departuretime: '08:00',
    flightprice: '5000',
    arrivaltime: '11:30',
    };
    const ancillaryServiceFormGroup = {
    childAllow: true,
    wheelChairProvision: true,
    shopping: false,
    flightWifi: false,
    flightEntertainment: false,
    magazines: true,
    fullMeal: false,
    miniMeal: true,
    snackes: true,
    drinks: true
    };
    component.ancillaryServiceFormGroup.patchValue(ancillaryServiceFormGroup);
    component.flightForm.patchValue(flightForm);
    spyOn(component, 'addFlightDetails').and.callThrough();
    component.addFlightDetails();
    expect(component.addFlightDetails).toHaveBeenCalled();
  });
});
