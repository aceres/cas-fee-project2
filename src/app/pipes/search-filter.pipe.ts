import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: Array<any>, receipt: string): Array<any> {
    return items.filter(item => item.receipt === receipt);
  }
}
