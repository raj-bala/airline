import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '../../../../node_modules/@angular/forms';
import { Flights } from '../../admin/classes/flight';
import { Router } from '../../../../node_modules/@angular/router';
import { StaffService } from '../services/staff.service';
import { CheckedInSeat } from '../classes/checkinseat';
import { AllocatedSeat } from '../../home/classes/allocatedSeat';
import { SeatService } from '../../home/services/seat.service';
import { PassengerTickets } from '../classes/passengerTickets';
import { CheckinService } from '../services/checkin.service';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.scss']
})
export class CheckInComponent implements OnInit {

  flightSearchForm: FormGroup;
  flightsToDisplay: Flights[] = [];
  flightSelected: Flights;
  stepper: any;
  cols: any;
  form: FormGroup;
  showDialog = false;
  flights: Flights[];
  isLinear = true;
  isEditable = false;
  isDisplayPassengerList = false;
  isDisplaySeatMap = false;
  passengerTickets: PassengerTickets[] = [];
  passengerTicketsToDisplay: PassengerTickets[] = [];
  columns: any;
  checked = false;
  displayDetailsDialog = false;
  passengerTicketsDetails: PassengerTickets;
  checkinPassenger: PassengerTickets;

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
  countseat = 0;
  checkSeats: CheckedInSeat[];
  seats: AllocatedSeat[];
  checkSeats2: CheckedInSeat[];
  seats2: AllocatedSeat;
  seats3: AllocatedSeat[];
  checkinseats2: CheckedInSeat;
  xyz: any[] = [];
  xyz1: any[] = [];
  seatscheck: any[] = [];
  updatedSeats: AllocatedSeat;
  updatedUserBooked: PassengerTickets;
  seatsAlloc4: AllocatedSeat;
  updatedCheckinseats: CheckedInSeat;
  constructor(private formbuilder: FormBuilder, private service: StaffService, private seatService: SeatService, private router: Router, private checkinService: CheckinService) { }

  ngOnInit(): void {
    this.flightSearchForm = this.formbuilder.group({
      origin: ['', Validators.required],
      dest: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
    });
    this.service.fetchFlight().subscribe(data => {
      this.flights = data;
    });
    this.getBookedTickets();

    this.seatService.getAllSeat().subscribe(
        (data: AllocatedSeat[]) => {
          this.seats = data;
        });

    this.checkinService.getAllCheckedInSeat().subscribe(
          (data: CheckedInSeat[]) => {
              this.checkSeats = data;
          });
    this.initializeCols();
    this.initializePassengerCols();
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

  getBookedTickets() {
    this.service.getBookedTickets().subscribe(data => {
      this.passengerTickets = data;
      });
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

    ];
  }
  initializePassengerCols() {
    this.columns = [
      { field: 'transactionId', header: 'Transaction Id' },
      { field: 'personName', header: 'Person Name' },
      { field: 'email', header: 'Email' },
      { field: 'infantCount', header: 'Infant' },
      { field: 'seat', header: 'Seat' },
      { field: 'passportNumber', header: 'passport Number' },
      { field: 'wheelChairProvision', header: 'Wheel Chair' },
      { field: 'flightnumber', header: 'Flight number' },
      { field: 'flightname', header: 'Flight name' },
      { field: 'flightorigin', header: 'Flight origin' },
      { field: 'flightdest', header: 'Flight dest' },
      { field: 'flighttime', header: 'Departure time' },
      { field: 'checkedin', header: 'Checked In' },
      { field: 'id', header: 'CheckIn' },

    ];
  }

  searchFlight(stepper) {
    this.stepper = stepper;
    this.flightsToDisplay = this.flights.filter(x => x.flightdest === this.flightSearchForm.controls.dest.value && x.flightorigin === this.flightSearchForm.controls.origin.value && x.departuretime.toString() === this.flightSearchForm.controls.time.value);
    if (this.flightsToDisplay.length === 0) {
      alert('No flights available');
      this.moveBackToSearchPage();
    }
    stepper.next();
   }

   moveBackToSearchPage() {
    this.router.navigateByUrl('/login', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/staff/checkin']);
    });
   }

   displayData(rowData: Flights) {
    this.flightSelected = rowData;
    this.passengerTicketsToDisplay = this.passengerTickets.filter( x => x.dateofjourney.toString() === this.flightSearchForm.controls.date.value.toString() && x.flightnumber.toString() === rowData.flightnumber.toString() && x.flightdest === this.flightSearchForm.controls.dest.value && x.flightorigin === this.flightSearchForm.controls.origin.value && x.flighttime.toString() === this.flightSearchForm.controls.time.value.toString());
    this.stepper.next();
   }

   displayPassangerData(rowData: PassengerTickets) {
    this.passengerTicketsDetails = rowData;
    this.displayDetailsDialog = true;
   }
   checkInUser(rowData: PassengerTickets) {
     this.checkinPassenger = rowData;
     this.cart.selectedSeats[0] = this.checkinPassenger.seat;
     this.cart.seatstoStore[0] = this.checkinPassenger.seat;
     this.cart.totalamount += Number(this.flightSelected.flightprice);

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

        this.seats3 = this.seats.filter(x => x.flightnumber.toString() === this.checkinPassenger.flightnumber.toString() && x.flightDateforSeat.toString() === this.checkinPassenger.dateofjourney.toString());
        if (this.checkSeats.length !== 0) {

          this.checkSeats2 = this.checkSeats.filter(x => x.flightId.toString() === this.checkinPassenger.flightnumber.toString() && x.flightDateforSeat.toString() === this.checkinPassenger.dateofjourney.toString());
          if (this.checkSeats2.length !== 0) {
            this.checkinseats2 = this.checkSeats2[0];
            this.xyz = this.checkinseats2.bookedseatsForDate;
          } else {
            this.checkinseats2 = null;
            this.xyz = null;
          }
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


        this.seatscheck[0] = this.checkinPassenger.seat;
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

                seatObj.status = 'unavailable';
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
        for (const index1 of this.seatscheck) {
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

      }
    }
  }
  public selectSeat(seatObject: any) {
    this.countseat = this.countseat + 1;
    if (seatObject.status === 'available' && this.cart.selectedSeats.length < 1) {
      seatObject.status = 'bookedcheckin';
      this.cart.selectedSeats.push(seatObject.seatLabel);
      this.cart.seatstoStore.push(seatObject.key);
      this.cart.totalamount += seatObject.price;
    } else if (seatObject.status === 'bookedcheckin') {
      if (this.seatscheck[0] === this.cart.seatstoStore[0] && this.countseat <= 1) {
        seatObject.status = 'available';
        this.cart.selectedSeats = [];
        this.cart.seatstoStore = [];
        this.cart.totalamount = 0;
      } else {
        seatObject.status = 'available';
        const seatIndex = this.cart.selectedSeats.indexOf(seatObject.seatLabel);
        if (seatIndex > -1) {
          this.cart.selectedSeats.splice(seatIndex, 1);
          this.cart.seatstoStore.splice(seatIndex, 1);
          this.cart.totalamount -= seatObject.price;
        }
      }
    }
  }

  processCheckIn() {
    let check = null; // check in seat
    let checkstore = null; // selected seat
    let unioncheck = null;
    if (this.checkSeats2.length !== 0) {
      check = this.checkinseats2.bookedseatsForDate;
      checkstore = this.cart.seatstoStore;
      unioncheck = [...new Set([...check, ...checkstore])];
      this.updatedCheckinseats = new CheckedInSeat();
      this.updatedCheckinseats = this.checkinseats2;
      this.updatedCheckinseats.bookedseatsForDate = unioncheck;

      this.checkinService.updateCheckedInSeat(this.updatedCheckinseats).subscribe(
      (data) => {
        this.checkinseats2 = data;
    });
    } else {
      this.updatedCheckinseats = new CheckedInSeat();
      this.updatedCheckinseats.flightId = Number(this.checkinPassenger.flightnumber);
      this.updatedCheckinseats.flightDateforSeat = this.checkinPassenger.dateofjourney;
      this.updatedCheckinseats.bookedseatsForDate = this.cart.seatstoStore;
      this.checkinService.createCheckedInSeat(this.updatedCheckinseats).subscribe(
        (data) => {
          this.checkinseats2 = data;
      });
    }

    const abc = this.cart.seatstoStore;
    const xyz = this.seatscheck[0];
    const isEqual = (abc.length === xyz.length) && (abc.every(val => xyz.includes(val)));

    if (!isEqual) {
      const abc1 = this.seats2.bookedseatsForDate; // alloc seat

      const xyz1 = this.seatscheck[0]; // user seat

      const difference = abc1.filter(x => !xyz1.includes(x)); // alloc seat without user seat

      const add = [...new Set([...abc, ...difference])]; // new alloc seat
      this.updatedSeats = new AllocatedSeat();
      this.updatedSeats = this.seats2;
      this.updatedSeats.bookedseatsForDate = add;

      this.updatedUserBooked = new PassengerTickets();
      this.updatedUserBooked = this.checkinPassenger;
      this.updatedUserBooked.seat = this.cart.seatstoStore[0];
      this.updatedUserBooked.checkedin = true;
      this.seatService.updateSeat(this.updatedSeats).subscribe(
        (data) => {
          this.seatsAlloc4 = data;
      });

      this.service.updateBookedTickets(this.updatedUserBooked).subscribe(
        (data) => {
          alert('succesfully checkedIn !');
        });

      this.router.navigateByUrl('/login', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/staff/checkin']);
      });
    } else {
      this.updatedUserBooked = new PassengerTickets();
      this.updatedUserBooked = this.checkinPassenger;
      this.updatedUserBooked.seat = this.seatscheck[0];
      this.updatedUserBooked.checkedin = true;

      this.service.updateBookedTickets(this.updatedUserBooked).subscribe(
        (data) => {
          alert('succesfully checkedIn !');

        });
      this.router.navigateByUrl('/login', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/staff/checkin']);
        });
    }
  }
  undoCheckInUser(rowData: PassengerTickets) {
    this.checkinPassenger = rowData;
    this.checkSeats2 = this.checkSeats.filter(x => x.flightId.toString() === this.checkinPassenger.flightnumber.toString() && x.flightDateforSeat.toString() === this.checkinPassenger.dateofjourney.toString());
    this.checkinseats2 = this.checkSeats2[0];
    this.xyz = this.checkinseats2.bookedseatsForDate;
    this.xyz1[0] = this.checkinPassenger.seat; // user seat
    const difference = this.xyz.filter(x => !this.xyz1.includes(x)); // checkin seat without user seat
    this.updatedCheckinseats = new CheckedInSeat();
    this.updatedCheckinseats = this.checkinseats2;
    this.updatedCheckinseats.bookedseatsForDate = difference;

    this.updatedUserBooked = new PassengerTickets();
    this.updatedUserBooked = this.checkinPassenger;
    this.updatedUserBooked.checkedin = false;

    this.checkinService.updateCheckedInSeat(this.updatedCheckinseats).subscribe(
      (data) => {
        this.checkinseats2 = data;
    });

    this.service.updateBookedTickets(this.updatedUserBooked).subscribe(
        (data) => {
          alert('undo checkedIn done !');
        });
    this.router.navigateByUrl('/login', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/staff/checkin']);
        });
  }

}
