import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { AuthsService } from '../services/auth.service';
import { LoginUser } from '../classes/login';
import { SocialService } from '../../../../node_modules/ngx-social-button';





@Injectable()
export class AuthGuard implements CanActivate {
  allLoginUser: LoginUser[];
  constructor(private authService: AuthsService,
              private socialAuthService: SocialService,
              private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const allowedRoles = next.data.allowedRoles;
    const role = sessionStorage.getItem('role');
    if ((allowedRoles == null || allowedRoles.length === 0) && this.authService.loggedIn()) {
      return true;
    } else if (this.authService.loggedIn() && allowedRoles.length !== 0) {
      if (allowedRoles.includes(role)) {
        return true;
      } else {
        sessionStorage.removeItem('token');

        const user = sessionStorage.getItem('Username');
        sessionStorage.removeItem('Username');

        const socialUser = sessionStorage.getItem('socialUser');

        const roles = sessionStorage.getItem('role');
        sessionStorage.removeItem('role');
        if (socialUser === '' || socialUser === null) {
      this.authService.getAllLoginUser().subscribe(
        (data1: LoginUser[]) => {
          this.allLoginUser = data1;
          const data = this.allLoginUser.find(x => x.username === user);
          if (data != null) {
        this.authService.deleteLoginUser(Number(data.id)).subscribe(
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

      this.authService.getAllLoginUser().subscribe(
        (data1: LoginUser[]) => {
          this.allLoginUser = data1;
          const data = this.allLoginUser.find(x => x.username === user);
          if (data != null) {
        this.authService.deleteLoginUser(Number(data.id)).subscribe(
          (x: LoginUser) => {
            this.router.navigate(['/login']);
          });
      }
        });

    }
        return false;
      }
    } else {
      console.log('false');
      this.router.navigate(['/login']);
      return false;
    }
  }
}
