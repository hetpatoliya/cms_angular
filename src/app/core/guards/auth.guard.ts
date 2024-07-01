import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { TokenService } from '../services/token.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard {

  constructor(private router: Router, private token: TokenService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const accessToken = this.token.getToken().accessToken;
    if (accessToken) {
      return true;
    }
    else {
      this.router.navigateByUrl('/auth/login');
      return false;
    }
  }
};
