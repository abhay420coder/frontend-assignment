import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityHelperService {

  constructor() { }

  //this function checks if an object is present in an array of objects
  //obj: the object that needs to be searched
  //arr: the array of objects
  //filterBy: key that contains unique id of each object, this is used for filtering
  //seconderyFilterBy: In case objects in array contains a different key with unique id, pass it here
  objectExistInArray(obj: any, arr: any[], filterBy: string, seconderyFilterBy?: string): boolean {
    const filteredItems = arr.filter(d=>d[seconderyFilterBy?seconderyFilterBy:filterBy]===obj[filterBy]);
    return filteredItems.length > 0;
  }
}
