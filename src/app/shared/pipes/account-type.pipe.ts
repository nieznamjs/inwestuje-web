import { Pipe, PipeTransform } from '@angular/core';

import { ACCOUNT_TYPES, AccountTypes } from '@constants/account-types';
import { AccountType } from '@interfaces/account-type.interface';

@Pipe({
  name: 'accountType'
})
export class AccountTypePipe implements PipeTransform {
  transform(value: string): string {
    switch (value) {
      case AccountTypes.Private: {
        return ACCOUNT_TYPES.find((type: AccountType) => type.value === AccountTypes.Private).label;
      }

      case AccountTypes.Company: {
        return ACCOUNT_TYPES.find((type: AccountType) => type.value === AccountTypes.Company).label;
      }

      default: {
        return 'Nieznany';
      }
    }
  }
}
