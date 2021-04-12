import { TestBed, getTestBed } from '@angular/core/testing';

import { AdminService } from './admin.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { Flights } from '../classes/flight';

describe('AdminService', () => {
  let service: AdminService;
  let injector: TestBed;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule, HttpClientTestingModule
      ],
      providers: [AdminService],
    }).compileComponents();

    injector = getTestBed();
    service = injector.get(AdminService);
    httpMock = injector.get(HttpTestingController);
  });

  it('should be created', () => {
    service = TestBed.get(AdminService);
    expect(service).toBeTruthy();
  });

  it('be able to retrieve posts from the API bia GET', () => {
    const dummyFlights: Flights[] = [
      {
        flightnumber: '101',
        flightname: 'Indigo',
        flightorigin: 'Delhi',
        flightdest: 'Ranchi',
        departuretime: '17:43',
        childAllow: true,
        wheelChairProvision: true,
        flightprice: '3000',
        arrivaltime: '18:43',
        shopping: false,
        flightWifi: false,
        flightEntertainment: false,
        magazines: false,
        fullMeal: false,
        miniMeal: false,
        snackes: true,
        drinks: true,
        id: 1
      },
      {
        flightnumber: '102',
        flightname: 'Go Air',
        flightorigin: 'Mumbai',
        flightdest: 'Pune',
        departuretime: '18:20',
        childAllow: true,
        wheelChairProvision: true,
        flightprice: '4000',
        arrivaltime: '19:20',
        shopping: false,
        flightWifi: false,
        flightEntertainment: false,
        magazines: false,
        fullMeal: false,
        miniMeal: true,
        snackes: true,
        drinks: true,
        id: 2
      }
    ];
    service.getFlights().subscribe(posts => {
        expect(posts.length).toBe(2);
        expect(posts).toEqual(dummyFlights);
    });
    const request = httpMock.expectOne( `http://localhost:3000/Flights`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyFlights);
    });

  it('getAllFlights() should return data', () => {
    const dummyFlightListResponse: Flights[] = [
      {
        flightnumber: '101',
        flightname: 'Indigo',
        flightorigin: 'Delhi',
        flightdest: 'Ranchi',
        departuretime: '17:43',
        childAllow: true,
        wheelChairProvision: true,
        flightprice: '3000',
        arrivaltime: '18:43',
        shopping: false,
        flightWifi: false,
        flightEntertainment: false,
        magazines: false,
        fullMeal: false,
        miniMeal: false,
        snackes: true,
        drinks: true,
        id: 1
      },
      {
        flightnumber: '102',
        flightname: 'Go Air',
        flightorigin: 'Mumbai',
        flightdest: 'Pune',
        departuretime: '18:20',
        childAllow: true,
        wheelChairProvision: true,
        flightprice: '4000',
        arrivaltime: '19:20',
        shopping: false,
        flightWifi: false,
        flightEntertainment: false,
        magazines: false,
        fullMeal: false,
        miniMeal: true,
        snackes: true,
        drinks: true,
        id: 2
      }
      ];
    service.getFlights().subscribe((res) => {
      expect(res).toEqual(dummyFlightListResponse);
    });

    const req = httpMock.expectOne('http://localhost:3000/Flights');
    expect(req.request.method).toBe('GET');
    req.flush(dummyFlightListResponse);
  });

  afterEach(() => {
    httpMock.verify();
  });
});
