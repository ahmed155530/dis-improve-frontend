import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'egyCurrency'
})
export class EgyCurrencyPipe implements PipeTransform {

  transform(n: number): string {
    if (n === null || n === undefined) {
      return '';
    }
    return new Intl.NumberFormat('ar-EG', {}).format(n);
  }

}
