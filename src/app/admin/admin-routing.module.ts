import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { AddFlightComponent } from './add-flight/add-flight.component';
import { AuthGuard } from '../login/helper/auth.guard';
import { FlightListComponent } from './flight-list/flight-list.component';
import { ManageFlightsComponent } from './manage-flights/manage-flights.component';
import { BookFlightComponent } from './book-flight/book-flight.component';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {path: 'AddFlights', component: AddFlightComponent, canActivate: [ AuthGuard ], },
      {path: 'flightList', component: FlightListComponent , canActivate: [ AuthGuard ], },
      {path: 'manageFlights', component: ManageFlightsComponent , canActivate: [ AuthGuard ], },
      {path: 'edituser', component: UserListComponent, canActivate: [ AuthGuard ], },
      {path: 'bookFlight', component: BookFlightComponent, canActivate: [ AuthGuard ], },
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
