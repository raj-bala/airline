import { Component, OnInit } from '@angular/core';
import { LoginUser } from './classes/login';
import { User } from './classes/user';
import { Validators, FormBuilder, FormGroup } from '../../../node_modules/@angular/forms';
import { AuthsService } from './services/auth.service';
import { ActivatedRoute, Router } from '../../../node_modules/@angular/router';
import { Role } from './classes/role';
import { SocialService } from 'ngx-social-button';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  logdata: LoginUser;
  allUser: User[] = [];
  public role = '';
  currentRole = '';
  currentUserDetails = '';
  loggedIn: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private socialAuthService: SocialService,
    private authenticationService: AuthsService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 3000);
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    if (this.authenticationService.loggedIn() === true) {
      this.loggedIn = true;
    }

    this.authenticationService.getAll().subscribe(
      (data: User[]) => {
        this.allUser = data;
      });

    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }
  get f() { return this.loginForm.controls; }
  onSubmit() {
    this.submitted = true;


    this.loading = true;
    this.logdata = new LoginUser();
    this.logdata.username = this.f.username.value;
    try {
    const user1 = this.allUser.find( x => x.username === this.f.username.value && x.password === this.f.password.value);
    if (user1 !== null) {
        this.role = user1.role;
        sessionStorage.setItem('Username', this.f.username.value);
        sessionStorage.setItem('role', this.role);
        this.authenticationService.loginUser(this.logdata)
          .subscribe(
            res => {
              sessionStorage.setItem('token', this.f.username.value);
              this.router.navigate(['/home/flightBooking']);
            },
            error => {
              this.error = error;
              this.loading = false;
            });

      } else {
        alert('Enter Valid User name and password');
        this.router.navigate(['/login']);
      }
    } catch (e) {
      alert('Enter Valid User name and password');
    }
  }


  getSocialUser(socialUser) {
    this.submitted = true;

    this.loading = true;
    this.logdata = new LoginUser();
    this.logdata.username = socialUser.name;
    sessionStorage.setItem('socialUser', socialUser.name);

    this.role = Role.User;
    sessionStorage.setItem('Username', socialUser.name);
    sessionStorage.setItem('role', this.role);

    this.authenticationService.loginUser(this.logdata)
      .subscribe(
        res => {
          sessionStorage.setItem('token', socialUser.accessToken);
          this.router.navigate(['/home/flightBooking']);
        },
        error => {
          this.error = error;
          this.loading = false;
        });
}

}
