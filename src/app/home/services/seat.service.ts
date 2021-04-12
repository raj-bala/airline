import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AllocatedSeat } from '../classes/allocatedSeat';


const headerOption = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class SeatService {
  mockUrl = 'http://localhost:3000/AllocatedSeat';

  constructor(private http: HttpClient) { }

  getAllSeat(): Observable<AllocatedSeat[]> {
    return this.http.get<AllocatedSeat[]>(this.mockUrl, headerOption);
  }

  deleteSeat(id: number): Observable<AllocatedSeat> {
    return this.http.delete<AllocatedSeat>(this.mockUrl + '/' + id, headerOption);
  }

  createSeat(seat: AllocatedSeat): Observable<AllocatedSeat> {
    return this.http.post<AllocatedSeat>(this.mockUrl, seat, headerOption);
  }

  updateSeat(seat: AllocatedSeat): Observable<AllocatedSeat> {
    return this.http.put<AllocatedSeat>(this.mockUrl + '/' + seat.id, seat, headerOption);
  }

  getSeatByFlightId(id: number): Observable<AllocatedSeat> {
    return this.http.get<AllocatedSeat>(this.mockUrl + '/' + id, headerOption);
  }
}
