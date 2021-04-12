import { Component, OnInit } from '@angular/core';
import { Flights } from '../classes/flight';
import { AdminService } from '../services/admin.service';
import { Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-manage-flights',
  templateUrl: './manage-flights.component.html',
  styleUrls: ['./manage-flights.component.scss']
})
export class ManageFlightsComponent implements OnInit {

  flightsList: Flights[] = [];
  cols: any;
  displayDialog = false;
  flightDetails: Flights;
  constructor(private adminService: AdminService, private route: Router) { }

  ngOnInit(): void {
    this.adminService.getFlights().subscribe(x => {
      this.flightsList = x;
      });

    this.cols = [
      { field: 'flightnumber', header: 'flight number' },
      { field: 'flightname', header: 'flight name' },
      { field: 'flightorigin', header: 'flight origin' },
      { field: 'flightdest', header: 'flight dest' },
      { field: 'departuretime', header: 'departure time' },
      { field: 'arrivaltime', header: 'arrival time' },
      { field: 'flightprice', header: 'flight price' },
      { field: 'childAllow', header: 'child Allow' },
      { field: 'wheelChairProvision', header: 'wheel Chair required' },
      { field: 'shopping', header: 'shopping' },
      { field: 'flightWifi', header: 'flight Wifi' },
      { field: 'flightEntertainment', header: 'flight Entertainment' },
      { field: 'magazines', header: 'magazines' },
      { field: 'fullMeal', header: 'full Meal' },
      { field: 'miniMeal', header: 'mini Meal' },
      { field: 'snackes', header: 'snackes' },
      { field: 'drinks', header: 'drinks' },
      { field: 'id', header: 'Edit' },

    ];
  }

ChangeData(rowData: Flights) {
  this.flightDetails = rowData;
  this.displayDialog = true;
}


  updateFlight() {
    this.displayDialog = false;
    this.adminService.updateFlight(this.flightDetails).subscribe(x => {
      alert('Updated Successfully');
    }, error => {
      alert('Sorry! Not able to update. Please try again');
    });
  }
  deleteFlight() {
    this.displayDialog = false;
    this.adminService.deleteFlight(this.flightDetails.id).subscribe(x => {
      alert('Deleted Successfully');
      this.route.navigate(['/admin/flightList']);
    }, error => {
      alert('Sorry! Not able to delete. Please try again');
    });
  }
}
