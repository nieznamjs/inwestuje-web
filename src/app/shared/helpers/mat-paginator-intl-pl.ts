import { MatPaginatorIntl } from '@angular/material';

export class MatPaginatorIntlPl extends MatPaginatorIntl {
  public itemsPerPageLabel = 'Wyników na stronę';
  public nextPageLabel = 'Następna strona';
  public previousPageLabel = 'Poprzednia strona';

  // kod znaleziony jako przykład z materiala, niestety nie da się tego przypisać tak prosto jak wyżej
  public getRangeLabel = function (page: number, pageSize: number, length: number): string {
    if (length === 0 || pageSize === 0) {
      return '0 z ' + length;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
    return startIndex + 1 + ' - ' + endIndex + ' z ' + length;
  };
}
