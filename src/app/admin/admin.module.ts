import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AddFlightComponent } from './add-flight/add-flight.component';
import { ManageFlightsComponent } from './manage-flights/manage-flights.component';
import { FlightListComponent } from './flight-list/flight-list.component';
import { BookFlightComponent } from './book-flight/book-flight.component';
import { UserListComponent } from './user-list/user-list.component';

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

import { HttpClientModule } from '../../../node_modules/@angular/common/http';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';



@NgModule({
  declarations: [AdminComponent, AddFlightComponent, ManageFlightsComponent, FlightListComponent, BookFlightComponent, UserListComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule, ReactiveFormsModule, HttpClientModule,
     PanelMenuModule,
     MatDatepickerModule, MatNativeDateModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatStepperModule,
     MatCheckboxModule, MatTableModule,
     InputTextModule, ButtonModule, CheckboxModule, TableModule, CalendarModule,
     DialogModule, CardModule, SpinnerModule,
     NgbModule, NgxSpinnerModule,
     TooltipModule.forRoot()
  ]
})
export class AdminModule { }
