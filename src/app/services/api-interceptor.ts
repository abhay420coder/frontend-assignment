// import {
//   HttpErrorResponse,
//   HttpEvent,
//   HttpHandler,
//   HttpInterceptor,
//   HttpRequest,
// } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// // import { MatSnackBar } from '@angular/material/snack-bar';
// import { Router } from '@angular/router';
// import { ToastrService } from 'ngx-toastr';
// import { Observable, throwError as observableThrowError } from 'rxjs';
// import { catchError } from 'rxjs/operators';
// import { environment } from 'src/environments/environment';
// import { CurrentUserService } from './current-user.service';
// import { JwtService } from './jwt.service';
// import { TranslationService } from './translation.service';

// @Injectable({ providedIn: 'root' })
// export class ApiInterceptor implements HttpInterceptor {
//   langSuportedModules = [
//     '/vca-api-server/line',
//     '/vca-api-server/cord',
//     '/vca-api-server/ts',
//   ];

//   constructor(
//     public jwtService: JwtService,
//     public router: Router,
//     private cus: CurrentUserService,
//     private toastr: ToastrService,
//     private translation: TranslationService
//   ) {}

//   intercept(
//     req: HttpRequest<any>,
//     next: HttpHandler
//   ): Observable<HttpEvent<any>> {
//     if (
//       req.url.indexOf('vca-security') < 0 &&
//       req.url.indexOf('googleapis') < 0
//     ) {
//       // req = req.clone({ headers: req.headers.set("Authorization", "Bearer " + this.authToken) });
//       let authorization = "";
//       const bearerToken = this.jwtService.getToken();
//       if(bearerToken&&bearerToken!==""){
//         authorization = `Bearer ${bearerToken}`
//       } else {
//         authorization = environment.basicToken
//       }
//       req = req.clone({
//         setHeaders: {
//           Authorization: authorization,
//           'zone-id': Intl.DateTimeFormat().resolvedOptions().timeZone,
//         },
//       });
//     }
    
//     for (let index = 0; index < this.langSuportedModules.length; index++) {
//       if (req.url.indexOf(this.langSuportedModules[index]) >= 0) {
//         const selectedLang = this.translation.selectedLanguage.value;

//         req = req.clone({
//           body: {
//             ...req.body,
//             langCode: selectedLang.langCode,
//             langSupportId: selectedLang.langSupportId,
//           },
//         });
//         break;
//       }
//     }
//     return next.handle(req).pipe(
//       catchError((error: HttpErrorResponse, caught) => {
//         // if (error.toString().indexOf('Lost connection') !== -1) {
//         //   // console.log("LOST CONNECTION >>>>");

//         //   this.snackBar.open('Server is offline.', null, {
//         //     duration: 2000,
//         //   });
//         //   this.cus.purgeAuth();
//         // }

//         if (error.status === 401 || error.status === 403) {
//           // console.log("SESSION EXPIRED >>>>");
//           // this.snackBar.open('Your session is expired.', null, {
//           //   duration: 2000,
//           // });
//           this.cus.purgeAuth();
//           this.router.navigate(['/']);
//           this.toastr.error(
//             'Your session has expired. Please login again',
//             'Error'
//           );
//         } else if (error.status === 504) {
//           this.cus.purgeAuth();
//           this.router.navigate(['/']);
//           this.toastr.error(
//             'Your session has expired. Please login again',
//             'Error'
//           );
//         }

//         // return the error to the method that called it
//         return observableThrowError(error);
//       }) as any
//     );
//   }
// }
