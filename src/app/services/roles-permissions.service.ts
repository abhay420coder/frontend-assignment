import { Injectable } from '@angular/core';
import { globalUrls } from '../main/urls';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class RolesPermissionsService {
  allRoles: any[];
  allPerms: any[];

  constructor(private api:ApiService) { }

  fetchAllRolesAndPermissions(){
    return new Promise<boolean>((resolve, reject)=>{
      this.api.postData(globalUrls.vcaRolesAndPerms, {
        "pageNumber":1,
        "pageSize":1000,
        "searchKey":""
      }).subscribe({
        next: (data:any)=>{
          if(data&&data.payload){
            this.allRoles = [...data.payload.roleList];
            this.allPerms = [...data.payload.permissionList];
            resolve(true);
          } else {
            resolve(false);
          }
        }, 
        error: err=>{
          reject(true);
        }
      });
    });
  }

  getAllRoles(){
    return [...this.allRoles];
  }

  getAllPerms(){
    return [...this.allPerms];
  }
}
