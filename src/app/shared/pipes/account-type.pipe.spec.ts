import { AccountTypePipe } from './account-type.pipe';
import { AccountTypes } from '@constants/account-types';

describe('AccountTypesPipe', () => {
  let pipe: AccountTypePipe;

  beforeEach(() => {
    pipe = new AccountTypePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('transform should return proper values', () => {
    expect(pipe.transform(AccountTypes.Private)).toBe('Osoba prywatna');

    expect(pipe.transform(AccountTypes.Company)).toBe('Firma');
  });
});
