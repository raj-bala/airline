import { Component, OnInit } from '@angular/core';
import { Flights } from '../classes/flight';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-flight-list',
  templateUrl: './flight-list.component.html',
  styleUrls: ['./flight-list.component.scss']
})
export class FlightListComponent implements OnInit {
  allFlightDetails: Flights[];
  cols: any;
  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.adminService.getFlights().subscribe(
      (data: Flights[]) => {
        this.allFlightDetails = data;
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
      ];

  }

}
