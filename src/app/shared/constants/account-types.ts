import { AccountRoleOrType } from '@interfaces/account-role.interface';

export enum AccountTypes {
  Private = 'privatePerson',
  Company = 'company',
}

export const ACCOUNT_TYPES: AccountRoleOrType[] = [
  { label: 'Osoba prywatna', value: AccountTypes.Private },
  { label: 'Firma', value: AccountTypes.Company },
];
