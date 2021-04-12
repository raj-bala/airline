import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthsService } from '../services/auth.service';


@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector) {}
  intercept(req, next) {
    const authService = this.injector.get(AuthsService);
    const tokenizedReq = req.clone(
      {
        headers: req.headers.set('Authorization', 'bearer ' + authService.getToken())
      }
    );
    return next.handle(tokenizedReq);
  }

}
