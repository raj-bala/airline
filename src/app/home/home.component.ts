import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  items: MenuItem[] = [
{
    label: 'Book Flight',
    items: [
      {label: 'Add Passengers', icon: 'pi pi-fw pi-ticket', routerLink: '/home/flightBooking'}
    ]
}
];
  constructor( private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 3000);
  }


}
