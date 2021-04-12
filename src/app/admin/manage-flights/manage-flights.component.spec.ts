import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageFlightsComponent } from './manage-flights.component';
import { of } from '../../../../node_modules/rxjs';
import { AdminService } from '../services/admin.service';
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
import { RouterModule } from '../../../../node_modules/@angular/router';
import { RouterTestingModule } from '../../../../node_modules/@angular/router/testing';

class MockAdminService {
  getFlights() {
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
  deleteFlight(id) {
    return of(true);
  }
  updateFlight(flight) {
    return of(true);
  }
}
describe('ManageFlightsComponent', () => {
  let component: ManageFlightsComponent;
  let fixture: ComponentFixture<ManageFlightsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageFlightsComponent ],
      imports : [FormsModule, ReactiveFormsModule, HttpClientModule,
        PanelMenuModule,
        MatDatepickerModule, MatNativeDateModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatStepperModule,
        MatCheckboxModule, MatTableModule,
        InputTextModule, ButtonModule, CheckboxModule, TableModule, CalendarModule,
        DialogModule, CardModule, SpinnerModule,
        NgbModule, NgxSpinnerModule,
        TooltipModule.forRoot(), RouterModule, RouterTestingModule,
        BrowserAnimationsModule],
      providers: [{provide: AdminService, useClass: MockAdminService}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageFlightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should run #ChangeData()', async () => {
    spyOn(component, 'ChangeData').and.callThrough();
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    fixture.whenStable().then(() => {
    expect(component.ChangeData).toHaveBeenCalled();
   });

  });
  it('should run deleteFlight()', async () => {
    spyOn(component, 'deleteFlight').and.callThrough();
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
    expect(component.deleteFlight).toHaveBeenCalled();
   });

  });
  it('should run updateFlight()', async () => {
    spyOn(component, 'updateFlight').and.callThrough();
    const flight = {
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
    };
    component.flightDetails = flight;
    const result = component.updateFlight();
    expect(component.updateFlight).toHaveBeenCalled();
  });
});
