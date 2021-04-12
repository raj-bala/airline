import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  items: MenuItem[] = [{
    label: 'Manage Flights',
    items: [
        {label: 'Add Flights', icon: 'pi pi-fw pi-plus', routerLink: '/admin/AddFlights'},
        {label: 'Manage Flights', icon: 'pi pi-fw pi-pencil', routerLink: '/admin/manageFlights'}
    ]
},
{
    label: 'Manage Users',
    items: [
      {label: 'Add Passengers', icon: 'pi pi-fw pi-ticket', routerLink: '/admin/bookFlight'},
        {label: 'Edit Passengers', icon: 'pi pi-fw pi-pencil', routerLink: '/admin/edituser'}
    ]
},
{
  label: 'Flight List' , icon: 'pi pi-fw pi-align-justify', routerLink: '/admin/flightList'
}
];
  constructor(private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 3000);
  }

}
