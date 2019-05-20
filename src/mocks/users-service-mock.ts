import { Observable, of } from 'rxjs';

import { User } from '@interfaces/user.interface';

export const expectedUser: User = {
  id: '123',
  email: 'drefto@pizda.to',
  firstName: 'Pawcio',
  lastName: 'Drefcik',
  companyName: 'DreftCode',
  nip: 1239874560,
  roles: [ 'investor' ],
  type: 'privatePerson',
  phone: '987321567',
  createdDate: new Date('2005-10-13'),
  updatedDate: new Date('2005-10-14'),
  websiteUrl: 'https://dev.dreftocode.pl',
};

export const usersServiceDataMock = {
  getUser: (id: string): Observable<User> => {
    return of(expectedUser);
  },
};
