import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookFlightComponent } from './book-flight.component';
import { of } from '../../../../node_modules/rxjs';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import {MatStepperModule, MatStepper} from '@angular/material/stepper';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTableModule} from '@angular/material/table';
import {PanelMenuModule} from 'primeng/panelmenu';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { TooltipModule } from 'ngx-bootstrap/tooltip';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '../../../../node_modules/@angular/platform-browser/animations';
import { StaffService } from '../../staff/services/staff.service';
import { HttpClientModule } from '../../../../node_modules/@angular/common/http';
import { PassengerTickets } from '../../staff/classes/passengerTickets';
import { SeatService } from '../../home/services/seat.service';
import { AdminService } from '../services/admin.service';
import { RouterTestingModule } from '@angular/router/testing';


class  MockSteppper {
  previous() {

  }
  next() {

  }
}
class MockStaffService {
  PassengerTickets = [{
    transactionId: 94755561,
    bookingDate: 'Tue Aug 04 2020 10:51:10 GMT+0530 (India Standard Time)',
    pnrNumber: 'WGGDUO',
    personName: 'jaya',
    dob: 'Thu Aug 02 2001 00:00:00 GMT+0530 (India Standard Time)',
    gender: 'Female',
    address: 'yttuhf',
    email: 'jaya@gmail.com',
    mobileNumber: 873456712,
    passportNumber: '7836863',
    seat: '1_1',
    infantCount: '1',
    flightname: 'Indigo',
    flightnumber: '101',
    flightorigin: 'Delhi',
    flightdest: 'Ranchi',
    flighttime: '17:43',
    dateofjourney: 'Sun Aug 30 2020 00:00:00 GMT+0530 (India Standard Time)',
    checkedin: true,
    childAllow: false,
    wheelChairProvision: false,
    shopping: false,
    flightWifi: false,
    flightEntertainment: false,
    magazines: false,
    fullMeal: false,
    miniMeal: false,
    snackes: true,
    drinks: true,
    id: 1
  }];
  passengerDetails = this.PassengerTickets[0];
  fetchFlight() {
    const flights = [
      {
        flightnumber: '101',
        flightname: 'Indigo',
        flightorigin: 'Delhi',
        flightdest: 'Ranchi',
        departuretime: '17:43',
        childAllow: true,
        wheelChairProvision: true,
        flightprice: '3000',
        arrivaltime: '18:43',
        shopping: false,
        flightWifi: false,
        flightEntertainment: false,
        magazines: false,
        fullMeal: false,
        miniMeal: false,
        snackes: true,
        drinks: true,
        id: 1
      },
      {
        flightnumber: '102',
        flightname: 'Go Air',
        flightorigin: 'Mumbai',
        flightdest: 'Pune',
        departuretime: '18:20',
        childAllow: true,
        wheelChairProvision: true,
        flightprice: '4000',
        arrivaltime: '19:20',
        shopping: false,
        flightWifi: false,
        flightEntertainment: false,
        magazines: false,
        fullMeal: false,
        miniMeal: true,
        snackes: true,
        drinks: true,
        id: 2
      }
    ];
    return of(flights);
  }

  addBookedTickets(ticket: PassengerTickets) {
    return of('');
  }
  getBookedTickets() {

    return of(this.PassengerTickets);
  }
}
describe('BookFlightComponent', () => {
  let component: BookFlightComponent;
  let fixture: ComponentFixture<BookFlightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookFlightComponent ],
      imports : [FormsModule, RouterModule, BrowserAnimationsModule,
        FormsModule, ReactiveFormsModule, HttpClientModule,
        PanelMenuModule,
        MatDatepickerModule, MatNativeDateModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatStepperModule,
        MatCheckboxModule, MatTableModule,
        InputTextModule, ButtonModule, CheckboxModule, TableModule, CalendarModule,
        DialogModule, CardModule, SpinnerModule,
        NgbModule, NgxSpinnerModule, RouterTestingModule.withRoutes([]),
        TooltipModule.forRoot()],
        providers: [SeatService, AdminService, {provide: MatStepper, useClass: MockSteppper},
        {provide: StaffService, useClass: MockStaffService}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookFlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should run #SearchFlights() with same origin and dest', async () => {
    const passengerGroupObj = {
      origin: 'Delhi',
      destination: 'Delhi',
      date: 'Sun Aug 30 2020 00:00:00 GMT+0530 (India Standard Time)',
      numberOfPassenger: 1,
      infantCount : 0
    };
    component.addSearchFlightForm.patchValue(passengerGroupObj);
    spyOn(component, 'SearchFlights').and.callThrough();
    const stepper = new MockSteppper();
    const result = component.SearchFlights(stepper);


    expect(component.SearchFlights).toHaveBeenCalled();
  });

  it('should run SearchFlights() ', async () => {
    const passengerGroupObj = {
      origin: 'Delhi',
      destination: 'Delhi',
      date: 'Sun Aug 30 2020 00:00:00 GMT+0530 (India Standard Time)',
      numberOfPassenger: 1,
      infantCount : 0
    };
    component.addSearchFlightForm.patchValue(passengerGroupObj);
    spyOn(component, 'SearchFlights').and.callThrough();
    const stepper = new MockSteppper();
    const result = component.SearchFlights(stepper);

    expect(component.SearchFlights).toHaveBeenCalled();
  });

  it('should run #SearchFlights() with InfantCount', async () => {
    const passengerGroupObj = {
      origin: 'Delhi',
      destination: 'Delhi',
      date: 'Sun Aug 30 2020 00:00:00 GMT+0530 (India Standard Time)',
      numberOfPassenger: 1,
      infantCount : 1
    };
    component.addSearchFlightForm.patchValue(passengerGroupObj);
    spyOn(component, 'SearchFlights').and.callThrough();
    const stepper = new MockSteppper();
    const result = component.SearchFlights(stepper);

    expect(component.SearchFlights).toHaveBeenCalled();
  });

  it('should run SearchFlights() with No Available Flights', async () => {
    const passengerGroupObj = {
      origin: 'Delhi',
      destination: 'Patna',
      date: 'Sun Aug 30 2020 00:00:00 GMT+0530 (India Standard Time)',
      numberOfPassenger: 1,
      infantCount : 1
    };
    component.addSearchFlightForm.patchValue(passengerGroupObj);
    spyOn(component, 'SearchFlights').and.callThrough();
    const stepper = new MockSteppper();
    const result = component.SearchFlights(stepper);

    expect(component.SearchFlights).toHaveBeenCalled();
  });

});
