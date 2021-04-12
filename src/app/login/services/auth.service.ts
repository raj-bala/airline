import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '../../../../node_modules/@angular/common/http';
import { Router } from '../../../../node_modules/@angular/router';
import { User } from '../classes/user';
import { Observable } from '../../../../node_modules/rxjs';
import { LoginUser } from '../classes/login';


const headerOption = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class AuthsService {

  private registerUrl = 'http://localhost:3000/User';
  private loginUrl = 'http://localhost:3000/LoginUser';
  currentUser: User = {
    id: null,
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: null,
    role: null,
  };

  constructor(private http: HttpClient,
              private router: Router) { }

  registerUser(user: User): Observable<User> {
    return this.http.post<User>(this.registerUrl, user, headerOption);
  }
// registerUser(user: User) {
// return this.http.post<any>(this.registerUrl, user);
// }

loginUser(user: LoginUser): Observable<LoginUser> {
return this.http.post<LoginUser>(this.loginUrl, user, headerOption);
}

getAll(): Observable<User[]> {
  return this.http.get<User[]>(this.registerUrl , headerOption);
}
getAllLoginUser(): Observable<LoginUser[]> {
  return this.http.get<LoginUser[]>(this.loginUrl , headerOption);
}
deleteLoginUser(id: number): Observable<LoginUser> {
  return this.http.delete<LoginUser>(this.loginUrl + '/' + id, headerOption);
}
// loginUser(user) {
//   return this.http.post<any>(this.loginUrl, user);
//   }

// logoutUser() {
// localStorage.removeItem('token');
// this.router.navigate(['/login']);
// }

getToken() {
return sessionStorage.getItem('token');
}

loggedIn() {
return !!sessionStorage.getItem('token');
}
}
