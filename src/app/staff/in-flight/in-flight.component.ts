import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '../../../../node_modules/@angular/forms';
import { Flights } from '../../admin/classes/flight';
import { Router } from '../../../../node_modules/@angular/router';
import { StaffService } from '../services/staff.service';
import { CheckedInSeat } from '../classes/checkinseat';
import { AllocatedSeat } from '../../home/classes/allocatedSeat';
import { SeatService } from '../../home/services/seat.service';
import { PassengerTickets } from '../classes/passengerTickets';
import { CheckinService } from '../services/checkin.service';

@Component({
  selector: 'app-in-flight',
  templateUrl: './in-flight.component.html',
  styleUrls: ['./in-flight.component.scss']
})
export class InFlightComponent implements OnInit {

  flightSearchForm: FormGroup;
  flightsToDisplay: Flights[] = [];
  flightSelected: Flights;
  stepper: any;
  cols: any;
  form: FormGroup;
  showDialog = false;
  showModifyDialog = false;
  flights: Flights[];
  isLinear = true;
  isEditable = false;

  seatConfig: any = null;
  seatmap = [];
  seatgenerate = false;
  count = 0;
  submitActive = false;
  seatChartConfig = {
    showRowsLabel: false,
    showRowWisePricing: false,
    newSeatNoForRow: false
  };

  cart = {
    selectedSeats: [],
    seatstoStore: [],
    totalamount: 0,
    cartId: '',
    eventId: 0
  };
  seats: AllocatedSeat[];
  checkSeats: CheckedInSeat[] = [];
  seats3: AllocatedSeat[];
  checkSeats2: CheckedInSeat[];
  checkinseats2: CheckedInSeat;
  xyz: any[];
  seats2: AllocatedSeat;
  passengerTickets: PassengerTickets[] = [];
  selectedPassengerTickets: PassengerTickets[] = [];
  selectedPassengerTicket: PassengerTickets;
  updatedUserBooked: PassengerTickets;
  constructor(private formbuilder: FormBuilder, private service: StaffService, private router: Router, private seatService: SeatService, private checkinService: CheckinService) { }

  ngOnInit(): void {
    this.initializeCols();
    this.flightSearchForm = this.formbuilder.group({
      origin: ['', Validators.required],
      dest: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
    });
    this.service.fetchFlight().subscribe(data => {
      this.flights = data;
    });
    this.service.getBookedTickets().subscribe(data => {
      this.passengerTickets = data;
      });
    this.seatService.getAllSeat().subscribe(
      (data: AllocatedSeat[]) => {
        this.seats = data;
      });

    this.checkinService.getAllCheckedInSeat().subscribe(
        (data: CheckedInSeat[]) => {
            this.checkSeats = data;
        });
    // Process a simple layout
    this.seatConfig = [
      {
        seat_price: 5000,
        seat_map: [
          {
            seat_label: '1',
            layout: 'ggg__ggg'
          },
          {
            seat_label: '2',
            layout: 'ggg__ggg'
          },
          {
            seat_label: '3',
            layout: 'ggg__ggg'
          },
          {
            seat_label: '4',
            layout: 'ggg__ggg'
          },
          {
            seat_label: '5',
            layout: 'ggg__ggg'
          },
          {
            seat_label: '6',
            layout: 'ggg__ggg'
          },
          {
            seat_label: '7',
            layout: 'ggg__ggg'
          },
          {
            seat_label: '8',
            layout: 'ggg__ggg'
          },
          {
            seat_label: '9',
            layout: 'ggg__ggg'
          },
          {
            seat_label: '10',
            layout: 'ggg__ggg'
          }
        ]
      }

    ];
  }

  initializeCols() {
    this.cols = [
      { field: 'flightnumber', header: 'Flight Number' },
      { field: 'flightname', header: 'Name' },
      { field: 'flightorigin', header: 'From' },
      { field: 'flightdest', header: 'To' },
      { field: 'departuretime', header: 'Departure Time' },
      { field: 'flightprice', header: 'Price' },
      { field: 'arrivaltime', header: 'Reach Destination Time' },
      { field: 'id', header: 'Seat Map' },

    ];
  }

  searchFlight(stepper) {
    this.stepper = stepper;
    this.flightsToDisplay = this.flights.filter(x => x.flightdest === this.flightSearchForm.controls.dest.value && x.flightorigin === this.flightSearchForm.controls.origin.value && x.departuretime.toString() === this.flightSearchForm.controls.time.value);
    stepper.next();
   }
   moveBackToSearchFlight() {
    this.router.navigateByUrl('/login', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/staff/inflight']);
    });
   }
  checkSeatMap(rowData: Flights) {
    this.flightSelected = rowData;
    this.processSeatChart(this.seatConfig);
    this.stepper.next();
  }

  public processSeatChart(mapData: any[]) {

    if (mapData.length > 0) {
      let seatNoCounter = 1;

      for (const counter of mapData) {

        let rowLabel = '';
        const itemMap = counter.seat_map;

        // Get the label name and price
        rowLabel = 'Row ' + itemMap[0].seat_label + ' - ';
        if (itemMap[itemMap.length - 1].seat_label !== ' ') {
          rowLabel += itemMap[itemMap.length - 1].seat_label;
        } else {
          rowLabel += itemMap[itemMap.length - 2].seat_label;
        }
        rowLabel += ' : Rs. ' + this.flightSelected.flightprice;

        itemMap.forEach(mapElement => {
          const mapObj = {
            seatRowLabel: mapElement.seat_label,
            seats: [],
            seatPricingInformation: rowLabel
          };
          rowLabel = '';
          const key = 'seatLabel';
          const key1 = 'seatNo';
          const seatValArr = mapElement.layout.split('');
          if (this.seatChartConfig.newSeatNoForRow) {
            seatNoCounter = 1; // Reset the seat label counter for new row
          }
          let totalItemCounter = 1;
          seatValArr.forEach(item => {
            const seatObj = {
              key: mapElement.seat_label + '_' + totalItemCounter,
              price: this.flightSelected.flightprice,
              status: 'available'
            };

            if (item !== '_') {
              seatObj[key] = mapElement.seat_label + ' ' + seatNoCounter;
              if (seatNoCounter < 10) { seatObj[key1] = '0' + seatNoCounter; } else { seatObj[key1] = '' + seatNoCounter; }

              seatNoCounter++;
            } else {

              seatObj[key] = '';

            }
            totalItemCounter++;
            mapObj.seats.push(seatObj);
          });
          this.seatmap.push(mapObj);

        });


        this.seats3 = this.seats.filter(x => x.flightnumber.toString() === this.flightSelected.flightnumber.toString() && x.flightDateforSeat.toString() === this.flightSearchForm.controls.date.value.toString());
        if (this.checkSeats.length !== 0) {

          this.checkSeats2 = this.checkSeats.filter(x => x.flightId === Number(this.flightSelected.flightnumber) && x.flightDateforSeat.toString() === this.flightSearchForm.controls.date.value.toString());
          this.checkinseats2 = this.checkSeats2[0];
          this.xyz = this.checkinseats2.bookedseatsForDate;
        } else {
          this.checkSeats2 = null;
          this.checkinseats2 = null;
          this.xyz = null;
        }

        this.seats2 = this.seats3[0];

        const abc = this.seats2.bookedseatsForDate;

        let union = null;
        let difference = null;
        let intersection = null;

        if ( this.xyz !== null) {
          union = [...new Set([...abc, ...this.xyz])];
          difference = abc.filter(x => !this.xyz.includes(x));
          intersection = abc.filter(x => this.xyz.includes(x));
        } else {
          union = abc;
          intersection = null;
          difference = abc;
        }


        const seatsToBlockArr2 = difference;
        const seatsToBlockArr1 = intersection;
        for (const index1 of seatsToBlockArr2) {

          const bseat = index1 + '';
          const seatSplitArr1 = bseat.split('_');

          for (const index22 of this.seatmap) {

            const element = index22;
            if (element.seatRowLabel === seatSplitArr1[0]) {

              const seatObj = element.seats[Number(seatSplitArr1[1]) - 1];
              if (seatObj) {

                seatObj.status = 'bookedcheckin';
                index22.seats[Number(seatSplitArr1[1]) - 1] = seatObj;
                break;
              }

            }
          }

        }
        if ( seatsToBlockArr1 !== null) {
        for (const index1 of seatsToBlockArr1) {

          const bseat = index1 + '';
          const seatSplitArr1 = bseat.split('_');

          for (const index22 of this.seatmap) {

            const element = index22;
            if (element.seatRowLabel === seatSplitArr1[0]) {

              const seatObj = element.seats[Number(seatSplitArr1[1]) - 1];
              if (seatObj) {

                seatObj.status = 'checkin';
                index22.seats[Number(seatSplitArr1[1]) - 1] = seatObj;

                break;
              }

            }
          }

        }
      }

      }
    }
  }
  public selectSeat(seatObject: any) {
    if (seatObject.status === 'bookedcheckin' || seatObject.status === 'checkin') {
      this.cart.seatstoStore = [];
      this.cart.seatstoStore.push(seatObject.key);
      const selectedSeat = this.cart.seatstoStore[0];
      this.selectedPassengerTickets = this.passengerTickets.filter( x => x.flightnumber.toString() === this.flightSelected.flightnumber.toString() && x.dateofjourney.toString() === this.flightSearchForm.controls.date.value.toString() && x.seat === selectedSeat);
      this.selectedPassengerTicket = new PassengerTickets();
      this.selectedPassengerTicket = this.selectedPassengerTickets[0];
      this.showDialog = true;
    } else {
      alert('Select booked seat');
    }
  }
  moveBackToFlightSearch() {
    this.router.navigateByUrl('/login', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/staff/inflight']);
    });
  }
  modifyData() {
    this.selectedPassengerTicket = this.selectedPassengerTickets[0];
    this.showModifyDialog = true;
    this.showDialog = false;
  }
  updateServices() {
    this.updatedUserBooked = new PassengerTickets();
    this.updatedUserBooked = this.selectedPassengerTicket;

    this.service.updateBookedTickets(this.updatedUserBooked).subscribe(
        (data) => {
          alert('succesfully updated !');
          this.router.navigateByUrl('/login', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/staff/inflight']);
          });
        });
  }

}
