import { AccountRoleOrType } from '@interfaces/account-role.interface';

export enum AccountRoles {
  Investor = 'investor',
  DealMaker = 'dealMaker',
  Sourcer = 'sourcer',
}

export const ACCOUNT_ROLES: AccountRoleOrType[] = [
  { label: 'Inwestor', value: AccountRoles.Investor },
  { label: 'Deal Maker', value: AccountRoles.DealMaker },
  { label: 'Sourcer', value: AccountRoles.Sourcer },
];


