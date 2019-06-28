import { AccountRolePipe } from './account-role.pipe';
import { AccountRoles } from '@constants/account-roles';

describe('AccountRolePipe', () => {
  let pipe: AccountRolePipe;

  beforeEach(() => {
    pipe = new AccountRolePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('transform should return proper values', () => {
    expect(pipe.transform(AccountRoles.Investor)).toBe('Inwestor');

    expect(pipe.transform(AccountRoles.DealMaker)).toBe('Deal Maker');

    expect(pipe.transform(AccountRoles.Sourcer)).toBe('Sourcer');

    expect(pipe.transform(AccountRoles.Admin)).toBe('Admin');
  });
});
