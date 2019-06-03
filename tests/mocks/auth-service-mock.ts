import { Observable, of } from 'rxjs';

import { CreateUserBody } from '@interfaces/http/create-user-body.inteface';
import { User } from '@interfaces/user.interface';
import { LoginResponse } from '@interfaces/http/login-response.interface';

export const newUserBody: CreateUserBody = {
  email: 'some@email.com',
  password: '123',
  firstName: 'Pawcio',
  lastName: 'Drefcik',
  companyName: 'DreftCode',
  nip: 1239874560,
  roles: [ 'investor' ],
  type: 'privatePerson',
};

export const expectedUser: User = {
  id: '123',
  email: 'some@email.com',
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

export const expectedLoginResponse: LoginResponse = {
  userRoles: [ 'admin', 'sourcer' ],
};

export class AuthServiceDataMock {
  public login(email: string, password: string): Observable<LoginResponse> {
    return of({ userRoles: [ 'admin', 'sourcer' ]});
  }

  public register(newUser: CreateUserBody): Observable<User> {
    return of(expectedUser);
  }
}
