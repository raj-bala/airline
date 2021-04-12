import { Component, OnInit } from '@angular/core';
import { LoginUser } from './login/classes/login';
import { AuthsService } from './login/services/auth.service';
import { Router } from '../../node_modules/@angular/router';
import { Role } from './login/classes/role';
import { SocialService } from '../../node_modules/ngx-social-button';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Airlines';
  public role = '';
  user = '';
  socialUser = '';
  allLoginUser: LoginUser[] = [];
  id = 0;
  constructor(public authsService: AuthsService,
              private socialAuthService: SocialService,
              private router: Router, private SpinnerService: NgxSpinnerService) { }
  ngOnInit() {
    this.fetchUser();
  }
  get isAdmin() {
    this.role = sessionStorage.getItem('role');
    return this.role === Role.Admin;
  }
  fetchUser() {
    this.SpinnerService.show();
    this.authsService.getAllLoginUser().subscribe(
      (data: LoginUser[]) => {
        this.allLoginUser = data;
        this.SpinnerService.hide();
      });

  }

  get isStaff() {
    this.role = sessionStorage.getItem('role');
    return this.role === Role.Staff;
  }
  get isCurrentUser() {
    return this.authsService.loggedIn();
  }

  get notisCurrentUser() {
    if (this.authsService.loggedIn() === true) {
      return false;
    } else {
      return true;
    }
  }

  logoutUser() {
    sessionStorage.removeItem('token');

    this.user = sessionStorage.getItem('Username');
    sessionStorage.removeItem('Username');

    this.socialUser = sessionStorage.getItem('socialUser');

    this.role = sessionStorage.getItem('role');
    sessionStorage.removeItem('role');
    if (this.socialUser === '' || this.socialUser === null) {
      this.authsService.getAllLoginUser().subscribe(
        (data1: LoginUser[]) => {
          this.allLoginUser = data1;
          const data = this.allLoginUser.find(x => x.username === this.user);
          if (data != null) {
        this.authsService.deleteLoginUser(Number(data.id)).subscribe(
          (x: LoginUser) => {
            this.router.navigate(['/login']);
          });
      }
        });


    } else {
      if (this.socialAuthService.isSocialLoggedIn()) {
        this.socialAuthService.signOut().catch((err) => {
          console.log(err);
        });
      }
      sessionStorage.removeItem('socialUser');

      this.authsService.getAllLoginUser().subscribe(
        (data1: LoginUser[]) => {
          this.allLoginUser = data1;
          const data = this.allLoginUser.find(x => x.username === this.user);
          if (data != null) {
        this.authsService.deleteLoginUser(Number(data.id)).subscribe(
          (x: LoginUser) => {
            this.router.navigate(['/login']);
          });
      }
        });

    }
  }
}
