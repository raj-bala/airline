import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Flights } from '../classes/flight';


const headerOption = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  mockUrl = 'http://localhost:3000/Flights';
  constructor(private http: HttpClient) { }

addFlights(flight: Flights) {
return this.http.post<Flights>(this.mockUrl, flight, headerOption);
}
getFlights(): Observable<Flights[]> {
  return this.http.get<Flights[]>(this.mockUrl, headerOption);
}
deleteFlight(flightid: number): Observable<Flights> {
  return this.http.delete<Flights>(this.mockUrl + '/' + flightid, headerOption);
}
updateFlight(flight: Flights): Observable<Flights> {
  return this.http.put<Flights>(this.mockUrl + '/' + flight.id, flight, headerOption);
}
}
