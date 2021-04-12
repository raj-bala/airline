import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StaffComponent } from './staff.component';
import { CheckInComponent } from './check-in/check-in.component';
import { AuthGuard } from '../login/helper/auth.guard';
import { InFlightComponent } from './in-flight/in-flight.component';
import { FlightListComponent } from './flight-list/flight-list.component';

const routes: Routes = [ {
  path: '',
  component: StaffComponent,
  children: [
    {path: 'checkin', component: CheckInComponent, canActivate: [ AuthGuard ] },
    {path: 'flightList', component: FlightListComponent , canActivate: [ AuthGuard ], },
    {path: 'inflight', component: InFlightComponent, canActivate: [ AuthGuard ] }
  ]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffRoutingModule { }
