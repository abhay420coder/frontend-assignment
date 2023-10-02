// import { Injectable } from "@angular/core";
// import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
// import { Observable } from "rxjs";
// import { ADMIN_OVERRIDE_ROLE, PERMISSION } from "../main/constants";
// import { CurrentUserService } from "./current-user.service";

// @Injectable()
// export class RoleGuard implements CanActivate{
//     constructor(private cus: CurrentUserService, private router: Router){}
//     canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean>{
//         // console.log(state.url);
//         return new Promise<boolean>(resolve=>{
//             this.cus.getCurrentUser().subscribe((data:any)=>{
//                 if(JSON.stringify(data)!=='{}'){
//                     if (state.url.includes("kubernetes-namespace")) {
//                         if (data.permissionList.includes(PERMISSION.NS.READ) || data.permissionList.includes(PERMISSION.NS.ADD)||(data.permissionList.includes(ADMIN_OVERRIDE_ROLE))) {
//                             resolve(true)
//                         } else {
//                             this.router.navigate(['/main']);
//                         }                        
//                     } else if (state.url.includes("release-train")){
//                         if (data.permissionList.includes(PERMISSION.RT.READ) || data.permissionList.includes(PERMISSION.RT.ADD)||(data.permissionList.includes(ADMIN_OVERRIDE_ROLE))) {
//                             resolve(true)
//                         } else {
//                             this.router.navigate(['/main']);
//                         }
//                     } else if (state.url.includes("rt-deployments")){
//                         // if (data.permissionList.includes(PERMISSION.RT.READ)||(data.permissionList.includes(ADMIN_OVERRIDE_ROLE))) {
//                             resolve(true)
//                         // } else {
//                         //     this.router.navigate(['/main']);
//                         // }
//                     } else if (state.url.includes("templates")){
//                         if (data.permissionList.includes(PERMISSION.SPEC.READ) || data.permissionList.includes(PERMISSION.SPEC.ADD)||(data.permissionList.includes(ADMIN_OVERRIDE_ROLE))) {
//                             resolve(true)
//                         } else {
//                             this.router.navigate(['/main']);
//                         }
//                     } else if (state.url.includes("service-release")){
//                         if (data.permissionList.includes(PERMISSION.SERVICE_RELEASE.READ) || data.permissionList.includes(PERMISSION.SERVICE_RELEASE.ADD)||(data.permissionList.includes(ADMIN_OVERRIDE_ROLE))) {
//                             resolve(true);
//                         } else {
//                             this.router.navigate(['/main']);
//                         }
//                     } else if (state.url.includes("service")){
//                         if (data.permissionList.includes(PERMISSION.SERVICE.READ) || data.permissionList.includes(PERMISSION.SERVICE.ADD)||(data.permissionList.includes(ADMIN_OVERRIDE_ROLE))) {
//                             resolve(true)
//                         } else {
//                             this.router.navigate(['/main']);
//                         }
//                     }
//                 }
//             });
//         });
//     }
// }