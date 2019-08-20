import { Pipe, PipeTransform } from '@angular/core';
import { ACCOUNT_ROLES, AccountRoles } from '@constants/account-roles';
import { AccountRole } from '@interfaces/account-role.interface';

@Pipe({
  name: 'accountRole'
})
export class AccountRolePipe implements PipeTransform {
  transform(value: string): string {
    switch (value) {
      case AccountRoles.Sourcer: {
        return ACCOUNT_ROLES.find((type: AccountRole) => type.value === AccountRoles.Sourcer).label;
      }

      case AccountRoles.DealMaker: {
        return ACCOUNT_ROLES.find((type: AccountRole) => type.value === AccountRoles.DealMaker).label;
      }

      case AccountRoles.Investor: {
        return ACCOUNT_ROLES.find((type: AccountRole) => type.value === AccountRoles.Investor).label;
      }

      default: {
        return 'Admin';
      }
    }
  }
}
