import { Injectable } from '@angular/core';
import { globalUrls } from '../main/urls';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class DependencyService {

  constructor(private apiService: ApiService) { }

  getRootServices(){
    const promise = new Promise((resolve, reject)=>{
      this.apiService.postData(globalUrls.srList, {}).subscribe((data: any)=>{
        resolve(data.payload);
      })
    });
    return promise;
  }

  getDependentService(id){
    const promise = new Promise((resolve, reject)=>{
      let payload = {
        "baseServiceReleaseId": id
      }
      this.apiService.postData(globalUrls.srDepAttachedList, payload).subscribe((data: any)=>{
        resolve(data.payload);
      });
    });
    return promise;
  }
}
