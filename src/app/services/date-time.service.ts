/*******************************************************************************
 * 
 * This is a utility service that handles all the date and time formatting task 
 * using Day.js.
 * 
 ******************************************************************************/
import { Injectable } from '@angular/core';
import * as dayjs from 'dayjs';
import * as relativeTime from 'dayjs/plugin/relativeTime';
import * as utc from 'dayjs/plugin/utc';

@Injectable({
  providedIn: 'root'
})
export class DateTimeService {

  constructor() { }
  dateFormats = {
    longDateTime: "MMM D, YYYY h:mm:ss A",
    fullDate: "MMM D, YYYY",
    timeWithoutSec: "h:mm A"
  }

  getFullDateTime(date: string, format: string){
    if(date !== "" || date !== null){
      dayjs.extend(utc);
      return dayjs(date).utc(true).local().format(format);
    } else {
      return 'NA'
    }
  }

  getFromNow(date: string, isUtc?:boolean){
    if(date !== "" || date !== null){
      dayjs.extend(relativeTime);
      dayjs.extend(utc);
      return dayjs(date).utc(isUtc!==undefined?isUtc:true).local().fromNow(true);
    } else {
      return 'NA';
    }
  }

  getFormattedDateTime(date: string, format: string, isUtc?: boolean){
    if(date !== "" || date !== null){
      dayjs.extend(utc);
      return dayjs(date).utc(isUtc!==undefined?isUtc:true).format(format);
    } else {
      return 'NA';
    }
  }

  getDatestampFromUnixStamp(unixstamp: number, isUtc?: boolean){
    return dayjs.unix(unixstamp).utc(true).toJSON();
  }

  getCurrentTimestamp(inUtc: boolean){
    dayjs.extend(utc);
    return dayjs().utc(!inUtc).format();
  }

  isBefore(dateA: string, dateB?: string){
    // checks if date A is befor date B
    dayjs.extend(utc);
    return dayjs(dateA).utc(true).isBefore(dateB?dayjs(dateB).utc(true):dayjs());
  }
}
