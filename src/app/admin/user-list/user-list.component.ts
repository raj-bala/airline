import { Component, OnInit } from '@angular/core';
import { StaffService } from '../../staff/services/staff.service';
import { Router } from '../../../../node_modules/@angular/router';
import { PassengerTickets } from '../../staff/classes/passengerTickets';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  passengerTickets: PassengerTickets[] = [];
  cols: any;
  displayDialog = false;
  checked = false;
  passengerTicketsDetails: PassengerTickets;
  fiteredPassengerDetails: PassengerTickets[] = [];
  emptyData: PassengerTickets[] = [];
  displayDetailsDialog = false;
  constructor(private staffService: StaffService, private route: Router) { }

  ngOnInit(): void {
    this.staffService.getBookedTickets().subscribe(data => {
      this.passengerTickets = data;
      });

    this.cols = [
      { field: 'transactionId', header: 'Transaction Id' },
      { field: 'personName', header: 'Person Name' },
      { field: 'email', header: 'Email' },
      { field: 'infantCount', header: 'Infant' },
      { field: 'seat', header: 'Seat' },
      { field: 'passportNumber', header: 'passport Number' },
      { field: 'address', header: 'address' },
      { field: 'flightnumber', header: 'Flight number' },
      { field: 'flightname', header: 'Flight name' },
      { field: 'flightorigin', header: 'Flight origin' },
      { field: 'flightdest', header: 'Flight dest' },
      { field: 'flighttime', header: 'Departure time' },
      { field: 'childAllow', header: 'Child Allow' },
      { field: 'wheelChairProvision', header: 'Wheel Chair required' },
      { field: 'id', header: 'Edit Details' },

    ];
  }


ChangeData(rowData: PassengerTickets) {
  this.passengerTicketsDetails = rowData;
  this.displayDialog = true;
}
updateData() {
  this.displayDialog = false;
  this.staffService.updateBookedTickets(this.passengerTicketsDetails).subscribe(x => {
    alert('Updated Successfully');
  }, error => {
    alert('Sorry! Not able to update. Please try again');
  });
}

DisplayData(rowData: PassengerTickets) {
  this.passengerTicketsDetails = rowData;
  this.displayDetailsDialog = true;
}

filterData() {

  this.fiteredPassengerDetails = this.passengerTickets.filter(p => p.personName === '' || p.passportNumber === '' || p.dob === null);
  if (this.fiteredPassengerDetails.length === 0) {
      alert(' No passenger has missing mandatory requirements (passport, address, date of birth) ');
      this.checked = false;
    }
}

}
