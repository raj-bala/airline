import { Component, OnInit } from '@angular/core';
import { Flights } from '../classes/flight';
import { FormGroup, FormBuilder, Validators } from '../../../../node_modules/@angular/forms';
import { AdminService } from '../services/admin.service';
import { Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-add-flight',
  templateUrl: './add-flight.component.html',
  styleUrls: ['./add-flight.component.scss']
})
export class AddFlightComponent implements OnInit {
  flightForm: FormGroup;
  ancillaryServiceFormGroup: FormGroup;
  isLinear = true;
  flight: Flights;
  constructor(private formBuilder: FormBuilder, private adminService: AdminService, private route: Router) { }

  ngOnInit(): void {
    this.flightForm = this.formBuilder.group({
      flightnumber: ['', Validators.required],
      flightname: ['', Validators.required],
      flightorigin: ['', Validators.required],
      flightdest: ['', Validators.required],
      departuretime: ['', Validators.required],
      flightprice: ['', Validators.required],
      arrivaltime: ['', Validators.required]
    });
    this.ancillaryServiceFormGroup = this.formBuilder.group({
      childAllow: [false],
      wheelChairProvision: [false],
      shopping: [false],
      flightWifi: [false],
      flightEntertainment: [false],
      magazines: [false],
      fullMeal: [false],
      miniMeal: [false],
      snackes: [false],
      drinks: [false]
    });
  }

  addFlightDetails() {
    this.flight = new Flights();
    this.flight.flightnumber = this.flightForm.controls.flightnumber.value;
    this.flight.flightname = this.flightForm.controls.flightname.value;
    this.flight.flightorigin = this.flightForm.controls.flightorigin.value;
    this.flight.flightdest = this.flightForm.controls.flightdest.value;
    this.flight.departuretime = this.flightForm.controls.departuretime.value;
    this.flight.flightprice = this.flightForm.controls.flightprice.value;
    this.flight.arrivaltime = this.flightForm.controls.arrivaltime.value;
    this.flight.childAllow = this.ancillaryServiceFormGroup.controls.childAllow.value === true ? true : false;
    this.flight.wheelChairProvision = this.ancillaryServiceFormGroup.controls.wheelChairProvision.value === true ? true : false;
    this.flight.shopping = this.ancillaryServiceFormGroup.controls.shopping.value === true ? true : false;
    this.flight.flightWifi = this.ancillaryServiceFormGroup.controls.flightWifi.value === true ? true : false;
    this.flight.flightEntertainment = this.ancillaryServiceFormGroup.controls.flightEntertainment.value === true ? true : false;
    this.flight.magazines = this.ancillaryServiceFormGroup.controls.magazines.value === true ? true : false;
    this.flight.fullMeal = this.ancillaryServiceFormGroup.controls.fullMeal.value === true ? true : false;
    this.flight.miniMeal = this.ancillaryServiceFormGroup.controls.miniMeal.value === true ? true : false;
    this.flight.snackes = this.ancillaryServiceFormGroup.controls.snackes.value === true ? true : false;
    this.flight.drinks = this.ancillaryServiceFormGroup.controls.drinks.value === true ? true : false;
    this.adminService.addFlights(this.flight).subscribe(x => {
    this.route.navigate(['/admin/flightList']);
    }, error => {
      alert('Not able to add Flight Details');
    });
  }
}
