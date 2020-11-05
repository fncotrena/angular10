// import {formatDate} from '@angular/common';
import {Inject, LOCALE_ID, Pipe, PipeTransform} from '@angular/core';
// import {firestore} from 'firebase/app';
// import Timestamp = firestore.Timestamp;
@Pipe({
  name: 'toAge'
})
export class DateFormatPipe implements PipeTransform {

  constructor() {
  }
  transform(value: Date): string {
      return "hola";
  
}
 // var birthday = +new Date(dateString);
 // return ~~((Date.now() - birthday) / (31557600000)
}
