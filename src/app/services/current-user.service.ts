import { Injectable, OnDestroy } from '@angular/core';
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, ReplaySubject, tap } from "rxjs";
import { userUrls } from '../urls';
import { ApiService } from './api.service';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService implements OnDestroy {
  private currentUserSubject = new BehaviorSubject<any>({});
  public currentUser = this.currentUserSubject.asObservable();
  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();
  // private subscription = this.isAuthenticatedSubject.subscribe(res => {
  //   if (!res) {
  //     this.router.navigate(['/login']);
  //   }
  // });
  public userDetailLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  constructor(private jwtService: JwtService, private apiService: ApiService,
    private router: Router) {
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }

  populate() {
    return new Promise<boolean>(resolve => {
      if (this.jwtService.getToken()) {
        this.apiService.postData(userUrls.userInfo, {
        }).subscribe({
          next: (data: any) => {
            if (data.status === "success") {
              this.setAuth(data.payload);
              resolve(true);
            }
          },
          error: (err) => {
            if (err.status === 401 || err.status === 403) {
              this.purgeAuth();
            }
            resolve(false);
          }
        });
      } else {
        this.purgeAuth();
        resolve(false);
      }
    })
  }

  setAuth(user: any) {
    // this.jwtService.saveToken(user.signedToken);
    // this.currentUserSubject.next(user);
    this.jwtService.saveCcId(user.connectedFrontCordId);
    this.isAuthenticatedSubject.next(true);
  }

  fetchUserData() {
    this.userDetailLoading.next(true);
    if (!this.jwtService.getFrontEntityId()) {
      this.userDetailLoading.next(false);
    }
    this.apiService.postData(userUrls.fetchContactDetail, {
      "frontEntityId": this.jwtService.getFrontEntityId(),
      // "filterType": "contactNumber" 
    }).subscribe({
      next: (data: any) => {
        
          if (data && data.payload && data.payload.frontDetailsUiVo && data.payload.frontDetailsUiVo) {
            this.jwtService.saveCreatedByBusinessId(data.payload.createdByBusinessId);
            this.currentUserSubject.next({
              "customerIconId": data.payload.frontDetailsUiVo.docUuid,
              "customerName": data.payload.frontDetailsUiVo.name,
              "addressList": data.payload.frontDetailsUiVo.addressList || []
            })
          }
        this.userDetailLoading.next(false);
      },
      error: err => {
        this.userDetailLoading.next(false);
      }
    })
  }

  purgeAuth() {
    console.log('Token Cleaned');
    this.jwtService.destroyToken();
    this.jwtService.destroyCcId();
    this.jwtService.destroyTransactionStyleId();
    this.jwtService.destroyTcId();
    this.jwtService.destroyFrontEntityId();
    this.jwtService.destroySelectedAddress();
    this.jwtService.destroyStartTcPayload();
    this.currentUserSubject.next({});
    this.isAuthenticatedSubject.next(false);
  }

  getCurrentUser(): Observable<any> {
    return this.currentUser;
  }

  /* Setting diffrent token in jwt service to avoid user to navigate without reseting pwd  for api interceptor*/
  setResetToken(userDetails: any) {
    this.jwtService.resetTokenUserDetails = userDetails;
  }
  setAuthFromTokenDetails() {
    this.setAuth(this.jwtService.resetTokenUserDetails);
  }
  // logout() {
  //   this.apiService.postData(environment.login_url + '/logout', {
  //     token: this.jwtService.getToken()
  //   }).subscribe(res => {
  //     this.purgeAuth();
  //     let logoutStatus: any = '';
  //     if (res['status'] === 'success') {
  //       logoutStatus = 'You have successfully Logged Out.';
  //     } else {
  //       logoutStatus = 'Network Error';
  //     }
  //     this.snackBar.open(logoutStatus,null,{
  //       duration: 2000,
  //     })
  //   });
  // }
  getUserDetails() {
    return this.currentUserSubject.value;
  }

  isLoggedIn() {
    let loggedIn = false;
    this.isAuthenticatedSubject.pipe(
      tap(d => {
        loggedIn = d;
      })
    ).subscribe();
    return loggedIn
  }
}
