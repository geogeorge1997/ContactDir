import { Pipe, PipeTransform } from '@angular/core';

export type SortOrder = 'asc' | 'desc';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(value: any[], sortOrder: SortOrder | string = 'asc', sortKey: string): any {
    sortOrder = sortOrder && (sortOrder.toLowerCase() as any);

    if (!value || (sortOrder !== 'asc' && sortOrder !== 'desc')) return value;

    let stringArray = [];
    stringArray = value
      .sort((a, b) => {
        if (a[sortKey].toLowerCase() < b[sortKey].toLowerCase()) return -1;
        else if (a[sortKey].toLowerCase() > b[sortKey].toLowerCase()) return 1;
        else return 0;
      });
    
    const sorted = stringArray;
    return sortOrder === 'asc' ? sorted : sorted.reverse();
  }
}