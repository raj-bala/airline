import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '../../../../node_modules/@angular/common/http';
import { Observable } from '../../../../node_modules/rxjs';
import { Flights } from '../../admin/classes/flight';
import { CheckedInSeat } from '../classes/checkinseat';
import { PassengerTickets } from '../classes/passengerTickets';


const headerOption = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class StaffService {

  mockUrl = 'http://localhost:3000/PassengerTickets';
  api = 'http://localhost:3000/Flights';
  constructor(private http: HttpClient) { }

addBookedTickets(ticket: PassengerTickets) {
return this.http.post<PassengerTickets>(this.mockUrl, ticket, headerOption);
}
getBookedTickets(): Observable<PassengerTickets[]> {
  return this.http.get<PassengerTickets[]>(this.mockUrl, headerOption);
}
updateBookedTickets(passengerTickets: PassengerTickets): Observable<PassengerTickets> {
  return this.http.put<PassengerTickets>(this.mockUrl + '/' + passengerTickets.id, passengerTickets, headerOption);
}
fetchFlight(): Observable<Flights[]> {
  return this.http.get<Flights[]>(this.api , headerOption);
}


}
