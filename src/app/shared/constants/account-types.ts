import { AccountType } from '@interfaces/account-type.interface';

export enum AccountTypes {
  Private = 'privatePerson',
  Company = 'company',
}

export const ACCOUNT_TYPES: AccountType[] = [
  { label: 'Osoba prywatna', value: AccountTypes.Private },
  { label: 'Firma', value: AccountTypes.Company },
];
