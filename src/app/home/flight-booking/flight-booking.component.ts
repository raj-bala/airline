import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '../../../../node_modules/@angular/forms';
import { Flights } from '../../admin/classes/flight';
import { BookFlight } from '../classes/bookFlight';
import { AllocatedSeat } from '../classes/allocatedSeat';
import { AdminService } from '../../admin/services/admin.service';
import { StaffService } from '../../staff/services/staff.service';
import { SeatService } from '../services/seat.service';
import { Router } from '../../../../node_modules/@angular/router';
import { PassengerTickets } from '../../staff/classes/passengerTickets';

@Component({
  selector: 'app-flight-booking',
  templateUrl: './flight-booking.component.html',
  styleUrls: ['./flight-booking.component.scss']
})
export class FlightBookingComponent implements OnInit {

  addSearchFlightForm: FormGroup;
  passengersDetails: FormGroup;
  isLinear = true;
  isEditable = false;
  flights: Flights[] = [];
  requiredFlights: Flights[] = [];
  minDate: Date;
  maxDate: Date;
  stepper: any;
  cols: any[];

  childAllowRequired = new FormControl(false);

  wheelChairRequired = new FormControl(false);
  shoppingRequired = new FormControl(false);
  flightWifiRequired = new FormControl(false);
  flightEntertainmentRequired = new FormControl(false);
  magazinesRequired = new FormControl(false);
  fullMealRequired = new FormControl(false);
  miniMealRequired = new FormControl(false);
  snackesRequired = new FormControl(false);
  drinksRequired = new FormControl(false);

  boolchildAllowRequired = false;
  boolwheelChairRequired = false;
  boolshoppingRequired = false;
  boolflightWifiRequired = false;
  boolflightEntertainmentRequired = false;
  boolmagazinesRequired = false;
  boolfullMealRequired = false;
  boolminiMealRequired = false;
  boolsnackesRequired = false;
  booldrinksRequired = false;

  displayDialog: boolean;
  ancillaryDisplay = false;
  searchClick: boolean;
  passengerFlights: BookFlight[] = [];
  passengerFlight: BookFlight;
  passengerFlight1: BookFlight;
  flightSelected: BookFlight;
  seats: AllocatedSeat[];
  seats1: AllocatedSeat[];
  display = false;
  seatConfig: any = null;
  seatmap = [];
  submitActive = false;
  genders = [
    'Male',
    'Female',
    'ThirdGender'
  ];


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
  seats2: AllocatedSeat;
  transactionID = 0;
  transactionString = '1234567890';
  pnrString = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
  lengthOfTransactionNumber = 8;
  passengerTickets: PassengerTickets;
  seats4: AllocatedSeat[];
  seatsAlloc3: AllocatedSeat;
  seatsAlloc2: AllocatedSeat;
  seatsAlloc4: AllocatedSeat;
  constructor(private formBuilder: FormBuilder,
              private service: AdminService,
              private staffservice: StaffService,
              private seatService: SeatService,
              private route: Router) {
    const currentYear = new Date().getFullYear();
    const today = new Date();
    this.minDate = new Date(today.setDate(today.getDate() + 1));
    this.maxDate = new Date(currentYear, 11, 31);
     }

  ngOnInit(): void {
    this.addSearchFlightForm = this.formBuilder.group({
      origin: ['', Validators.required],
      destination: ['', Validators.required],
      date: ['', Validators.required],
      numberOfPassenger: ['', Validators.required],
      infantCount: ['', Validators.required]
    });
    this.createPassengerDetailsForm();
    this.service.getFlights().subscribe(data => {
      this.flights = data;
    });
    this.seatService.getAllSeat().subscribe(
      (data: AllocatedSeat[]) => {
        this.seats = data;
      });

    this.cols = [
        { field: 'flightnumber', header: 'Flight Number' },
        { field: 'flightname', header: 'Name' },
        { field: 'price', header: 'Price' },
        { field: 'departTime', header: 'Departure' },
        { field: 'source', header: 'From' },
        { field: 'destination', header: 'To' },
        { field: 'bookingAvailability', header: 'Availability' },
      ];
      // Process a simple layout
    this.seatConfig = [
      {
        seat_price: 4000,
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
          },
          {
            seat_label: '11',
            layout: 'ggg__ggg'
          },
          {
            seat_label: '12',
            layout: 'ggg__ggg'
          },
          {
            seat_label: '13',
            layout: 'ggg__ggg'
          },
          {
            seat_label: '14',
            layout: 'ggg__ggg'
          },
          {
            seat_label: '15',
            layout: 'ggg__ggg'
          }
        ]
      }

    ];
  }

  SearchFlights(stepper) {
    this.stepper = stepper;
    this.searchClick = true;
    this.addSearchFlightForm.markAsUntouched();
    if (this.addSearchFlightForm.controls.origin.value === this.addSearchFlightForm.controls.destination.value) {
      alert('Source and Destination cities cannot be same');
      return;
    }
    // Fetching flights based on Source and Destination
    this.requiredFlights = this.flights.filter(x => x.flightdest.toString() === this.addSearchFlightForm.controls.destination.value.toString() && x.flightorigin.toString() === this.addSearchFlightForm.controls.origin.value.toString());

    if (this.requiredFlights.length > 0) {

      if (Number(this.addSearchFlightForm.controls.infantCount.value) > 0) {
        this.requiredFlights = this.requiredFlights.filter(x => x.childAllow === true);
      }
      if (this.requiredFlights.length <= 0 ) {
        alert('No flights Available');
        this.searchClick = false;


    } else {
      this.flightsToDisplay(this.requiredFlights);
    }

  } else {
    this.searchClick = false;
    alert('No flights Available');
  }

}
CheckSeatsAvailability(flightnumber: string): number {
  let seatsQuantity = 60;
  this.seats1 = this.seats.filter(x => x.flightnumber.toString() === flightnumber && x.flightDateforSeat.toString() === this.addSearchFlightForm.controls.date.value.toString());
  if (this.seats.length > 0) {
    seatsQuantity = seatsQuantity - this.seats.length;
  }
  return seatsQuantity;
}
flightsToDisplay(Flight: Flights[]) {
  Flight.forEach(x => {
    const flightsToDisplay = new BookFlight();
    flightsToDisplay.source = x.flightorigin;
    flightsToDisplay.departTime = x.departuretime;
    flightsToDisplay.destination = x.flightdest;
    flightsToDisplay.flightname = x.flightname;
    flightsToDisplay.flightnumber = x.flightnumber;
    flightsToDisplay.reachDestination = x.arrivaltime;
    flightsToDisplay.price = x.flightprice;
    flightsToDisplay.seatsAvailable = this.CheckSeatsAvailability(x.flightnumber);
    if (flightsToDisplay.seatsAvailable >= Number(this.addSearchFlightForm.controls.numberOfPassenger.value)) {
      flightsToDisplay.bookingAvailability = 'Available';
      flightsToDisplay.ableToBook = true;
    } else {
      flightsToDisplay.bookingAvailability = 'Not Available';
      flightsToDisplay.ableToBook = false;
    }
    this.passengerFlights.push(flightsToDisplay);
  });
}

onRowSelect(event) {
  this.passengerFlight = new BookFlight();
  this.passengerFlight.source = event.data.source;
  this.passengerFlight.departTime = event.data.departTime;
  this.passengerFlight.destination = event.data.destination;
  this.passengerFlight.flightname = event.data.flightname;
  this.passengerFlight.flightnumber = event.data.flightnumber;
  this.passengerFlight.reachDestination = event.data.reachDestination;
  this.passengerFlight.price = event.data.price;
  this.passengerFlight.bookingAvailability = event.data.bookingAvailability;
  this.passengerFlight.ableToBook = event.data.ableToBook;
  this.passengerFlight.seatsAvailable = event.data.seatsAvailable;

  this.passengerFlight1 = (this.passengerFlight);
  this.displayDialog = true;
}


backToSearchPage() {
  this.searchClick = false;
  this.route.navigateByUrl('/login', { skipLocationChange: true }).then(() => {
    this.route.navigate(['/home/flightBooking']);
  });
}
showSeats() {
  this.display = true;
  this.flightSelected = this.passengerFlight1;
  const flightNumber = this.flightSelected.flightnumber;
  this.processSeatChart(this.seatConfig);
  this.stepper.next();
}
public processSeatChart(mapData: any[]) {
  const key = 'seatLabel';
  const key1 = 'seatNo';
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
      // rowLabel += ' : Rs. ' + counter.seat_price;
      rowLabel += ' : Rs. ' + this.flightSelected.price;


      itemMap.forEach(mapElement => {
        const mapObj = {
          seatRowLabel: mapElement.seat_label,
          seats: [],
          seatPricingInformation: rowLabel
        };
        rowLabel = '';
        const seatValArr = mapElement.layout.split('');
        if (this.seatChartConfig.newSeatNoForRow) {
          seatNoCounter = 1; // Reset the seat label counter for new row
        }
        let totalItemCounter = 1;
        seatValArr.forEach(item => {
          const seatObj = {
            key: mapElement.seat_label + '_' + totalItemCounter,

            price: this.flightSelected.price,
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
      this.seats2 = this.seats1[0];

      if (this.seats1.length !== 0) {
        const seatsToBlockArr1 = this.seats2.bookedseatsForDate;

        for (const index1 of seatsToBlockArr1) {
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
      }

    }
  }
}
public selectSeat(seatObject: any) {

  if (seatObject.status === 'available' && this.cart.selectedSeats.length < Number(this.addSearchFlightForm.controls.numberOfPassenger.value)) {
    seatObject.status = 'booked';
    this.cart.selectedSeats.push(seatObject.seatLabel);
    this.cart.seatstoStore.push(seatObject.key);
    this.cart.totalamount += seatObject.price;
  } else if (seatObject.status === 'booked') {
    seatObject.status = 'available';
    const seatIndex = this.cart.selectedSeats.indexOf(seatObject.seatLabel);
    if (seatIndex > -1) {
      this.cart.selectedSeats.splice(seatIndex, 1);
      this.cart.seatstoStore.splice(seatIndex, 1);
      this.cart.totalamount -= seatObject.price;
    }
  }
}

confirmSeat() {
  if (this.cart.seatstoStore.length !== Number(this.addSearchFlightForm.controls.numberOfPassenger.value)) {
      alert('select seat for all passenger');
  } else {

  this.cart.seatstoStore.forEach(x => {
    this.createItem();
  });

  this.stepper.next();
}

}



showAncillaryDialog() {
  let flightSelected: Flights[] = [];
  flightSelected = this.requiredFlights.filter(x => x.flightnumber === this.passengerFlight1.flightnumber && x.flightname === this.passengerFlight1.flightname);
  this.boolchildAllowRequired = flightSelected[0].childAllow;
  this.boolwheelChairRequired = flightSelected[0].wheelChairProvision;
  this.boolshoppingRequired = flightSelected[0].shopping;
  this.boolflightWifiRequired = flightSelected[0].flightWifi;
  this.boolflightEntertainmentRequired = flightSelected[0].flightEntertainment;
  this.boolmagazinesRequired = flightSelected[0].magazines;
  this.boolfullMealRequired = flightSelected[0].fullMeal;
  this.boolminiMealRequired = flightSelected[0].miniMeal;
  this.boolsnackesRequired = flightSelected[0].snackes;
  this.booldrinksRequired = flightSelected[0].drinks;

  this.ancillaryDisplay = true;
}

// add passenger details

 createPassengerDetailsForm() {
  this.passengersDetails = this.formBuilder.group({
    detailsArray: this.formBuilder.array([ ])
  });
}
get passengerDetailsForms() {
  return this.passengersDetails.get('detailsArray') as FormArray;
}
 createItem() {
  const detail = this.formBuilder.group({
    personName: ['', Validators.required],
    dob: [null, Validators.required],
    mobileNumber: ['', Validators.required],
    gender: ['', Validators.required],
    email: ['', Validators.email],
    address: ['', Validators.required],
    passportNumber: ['', Validators.required]
    });
  this.passengerDetailsForms.push(detail);
  }

  makeRandom(lengthOfCode: number, possible: string) {
    let text = '';
    for (let i = 0; i < lengthOfCode; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }


  finishBooking() {
    this.transactionID = Number(this.makeRandom(this.lengthOfTransactionNumber, this.transactionString));
    const pnr = this.makeRandom(6, this.pnrString);
    const tickets: PassengerTickets[] = [];
    const tickets1: PassengerTickets[] = [];
    const todayDate = new Date();
    let i = 0;
    for (const person of  this.passengersDetails.controls.detailsArray.value) {
      this.passengerTickets = new PassengerTickets();
      this.passengerTickets.transactionId = this.transactionID;
      this.passengerTickets.bookingDate = todayDate.toString();
      this.passengerTickets.pnrNumber = pnr;
      this.passengerTickets.personName = person.personName;
      this.passengerTickets.dob = person.dob.toString();
      this.passengerTickets.gender = person.gender;
      this.passengerTickets.address = person.address;
      this.passengerTickets.email = person.email;
      this.passengerTickets.mobileNumber = person.mobileNumber;
      this.passengerTickets.passportNumber = person.passportNumber;
      this.passengerTickets.seat = this.cart.seatstoStore[i];
      this.passengerTickets.infantCount = this.addSearchFlightForm.controls.infantCount.value;
      this.passengerTickets.flightname = this.passengerFlight1.flightname;
      this.passengerTickets.flightnumber = this.passengerFlight1.flightnumber;
      this.passengerTickets.flightorigin = this.addSearchFlightForm.controls.origin.value;
      this.passengerTickets.flightdest = this.addSearchFlightForm.controls.destination.value;
      this.passengerTickets.flighttime = this.passengerFlight1.departTime;
      this.passengerTickets.dateofjourney = this.addSearchFlightForm.controls.date.value.toString();
      this.passengerTickets.checkedin = false;
      this.passengerTickets.childAllow = this.childAllowRequired.value;
      this.passengerTickets.wheelChairProvision = this.wheelChairRequired.value;
      this.passengerTickets.shopping = this.shoppingRequired.value;
      this.passengerTickets.flightWifi = this.flightWifiRequired.value;
      this.passengerTickets.flightEntertainment = this.flightEntertainmentRequired.value;
      this.passengerTickets.magazines = this.magazinesRequired.value;
      this.passengerTickets.fullMeal = this.fullMealRequired.value;
      this.passengerTickets.miniMeal = this.miniMealRequired.value;
      this.passengerTickets.snackes = this.snackesRequired.value;
      this.passengerTickets.drinks = this.drinksRequired.value;

      tickets.push(this.passengerTickets);
      i++;
    }

    this.seats4 = this.seats.filter(x => x.flightnumber === Number(this.passengerFlight1.flightnumber) && x.flightDateforSeat.toString() === this.addSearchFlightForm.controls.date.value.toString());

    if (this.seats4.length !== 0) {
        this.seatsAlloc3 = this.seats4[0];
        this.seatsAlloc2 = new AllocatedSeat();
        this.seatsAlloc2.id = this.seatsAlloc3.id;
        this.seatsAlloc2.flightnumber = Number(this.passengerFlight1.flightnumber);
        this.seatsAlloc2.flightDateforSeat = this.addSearchFlightForm.controls.date.value.toString();

        const x = this.cart.seatstoStore.length;
        const z = this.seatsAlloc3.bookedseatsForDate.length;
        for ( let v = 0; v < x ; v++ ) {
          this.seatsAlloc3.bookedseatsForDate[z + v] = this.cart.seatstoStore[v];
        }
        this.seatsAlloc2.bookedseatsForDate = this.seatsAlloc3.bookedseatsForDate;
        this.seatService.updateSeat(this.seatsAlloc2).subscribe(
          (data) => {
            this.seatsAlloc4 = data;
          });

      } else {
        this.seatsAlloc3 = this.seats4[0];
        this.seatsAlloc2 = new AllocatedSeat();
        this.seatsAlloc2.flightnumber = Number(this.passengerFlight1.flightnumber);
        this.seatsAlloc2.flightDateforSeat = this.addSearchFlightForm.controls.date.value.toString();
        this.seatsAlloc2.bookedseatsForDate = this.cart.seatstoStore;
        this.seatService.createSeat(this.seatsAlloc2).subscribe(
          (data) => {
            this.seatsAlloc4 = data;
          });
      }

    tickets.forEach(bookedTicket => {
      this.staffservice.addBookedTickets(bookedTicket).subscribe(x => {
        tickets1.push(x);
      }
      );
    }
    );
    alert('Booking Successful!');
    this.route.navigateByUrl('/login', { skipLocationChange: true }).then(() => {
        this.route.navigate(['/home/flightBooking']);
      });
  }

}
