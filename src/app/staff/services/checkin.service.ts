import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '../../../../node_modules/@angular/common/http';
import { Observable } from '../../../../node_modules/rxjs';
import { CheckedInSeat } from '../classes/checkinseat';


const headerOption = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class CheckinService {

  mockUrl1 = 'http://localhost:3000/CheckedInSeat';

  constructor(private http: HttpClient) { }

  getAllCheckedInSeat(): Observable<CheckedInSeat[]> {
    return this.http.get<CheckedInSeat[]>(this.mockUrl1, headerOption);
  }
  createCheckedInSeat(seat: CheckedInSeat): Observable<CheckedInSeat> {
    return this.http.post<CheckedInSeat>(this.mockUrl1, seat, headerOption);
  }
  updateCheckedInSeat(seat: CheckedInSeat): Observable<CheckedInSeat> {
    return this.http.put<CheckedInSeat>(this.mockUrl1 + '/' + seat.id, seat, headerOption);
  }
  getCheckedInSeatByFlightId(id: number): Observable<CheckedInSeat> {
    return this.http.get<CheckedInSeat>(this.mockUrl1 + '/' + id, headerOption);
  }
}
