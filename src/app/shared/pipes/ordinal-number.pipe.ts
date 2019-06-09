import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ordinalNumber',
})
export class OrdinalNumberPipe implements PipeTransform {
  public transform(index: number, pageIndex: number, pageSize: number): number {
    return index + pageSize * pageIndex + 1;
  }
}
