import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, NavigationEnd, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from "rxjs";
import { map, tap } from 'rxjs/operators';
import { CurrentUserService } from './current-user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private currentUserService: CurrentUserService,
    private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    // this.currentUserService.populate();
    return this.currentUserService.isAuthenticated.pipe(map(res => {
      if (!res) {
        this.router.navigate(["/main/login"], {queryParams: {referrer: state.url}});
      }
      return res;      
    }));
  }
}

@Injectable()
/* Restricts authenticated user to route to page whereever it is used.For Ex - At login page */
export class RestrictAuthedUserGuard implements CanActivate {
  constructor(
    private currentUserService: CurrentUserService,
    private router: Router) {
  }

  canActivate(): Observable<boolean> {
    // this.currentUserService.populate();
    return this.currentUserService.isAuthenticated.pipe(map(res => {
      if (res) {
        this.router.navigate(["/main/user"]);
      }
      return !res;      
    }));
  }
}

@Injectable({
  providedIn: 'root'
})
export class CanActivateChildGuard implements CanActivateChild {
  constructor(
    private currentUserService: CurrentUserService,
    private router: Router) {
  }

  canActivateChild(): Observable<boolean> | Promise<boolean> | boolean {
    // this.currentUserService.populate();
    return this.currentUserService.isAuthenticated.pipe(map(res => {
      if (!res) {
        this.router.navigate(["/main/login"]);
      }
      return res;      
    }));
  }
}
