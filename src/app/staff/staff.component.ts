import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit {

  items: MenuItem[] = [
        {label: 'Check In', icon: 'pi pi-fw pi-check',
          items: [
            {label: 'Check In', routerLink: '/staff/checkin'},
          ] },
        {label: 'In Flight', icon: 'pi pi-fw pi-sign-in',
        items: [
          {label: 'In Flight', routerLink: '/staff/inflight'},
        ] },

      {
        label: 'Flight List', icon: 'pi pi-fw pi-search-plus', routerLink: '/staff/flightList'
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
