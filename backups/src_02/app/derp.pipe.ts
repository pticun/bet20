import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'derp'
})
export class DerpPipe implements PipeTransform {
  transform(dict: any): any {
    let a = [];
    for (let key in dict) {
      if (dict.hasOwnProperty(key)) {
        a.push({key: key, val: dict[key]});
      }
    }
    return a;
  }
}

/*
  transform(object: any): Array<any> {
    if (object) {
      return Object.keys(object).map(key => object[key]);
    }
  }

}
*/
