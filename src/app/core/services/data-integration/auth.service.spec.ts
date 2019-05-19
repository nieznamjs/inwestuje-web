import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';

import { AuthService } from './auth.service';
import { ConfigService } from '@services/utils/config.service';
import { UsersService } from '@services/data-integration/users.service';
import { expectedLoginResponse, expectedUser, newUserBody } from '../../../../mocks/auth-service-mock';
import { User } from '@interfaces/user.interface';
import { of } from 'rxjs';
import { LoginResponse } from '@interfaces/http/login-response.interface';

describe('AuthService', () => {
  let authService: AuthService;
  let httpClientSpy: { post: jasmine.Spy };
  let configServiceSpy: ConfigService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    configServiceSpy = jasmine.createSpyObj('ConfigService', ['getApiUrl']);

    TestBed.configureTestingModule({
      providers: [
        UsersService,
        { provide: ConfigService, useValue: configServiceSpy },
        { provide: HttpClient, useValue: httpClientSpy }
      ],
    });

    authService = new AuthService(<any>httpClientSpy, configServiceSpy);
  });

  it('should be created', () => {
    authService = TestBed.get(AuthService);
    expect(authService).toBeTruthy();
  });

  it('#register should return created user', () => {
    httpClientSpy.post.and.returnValue(of(expectedUser));

    authService.register(newUserBody).subscribe((user: User) => expect(user).toEqual(expectedUser));
  });

  it('#login should return object with success: boolean', () => {
    httpClientSpy.post.and.returnValue(of(expectedLoginResponse));

    authService.login('drefto@to.pala', '123')
      .subscribe((response: LoginResponse) => expect(response).toEqual(expectedLoginResponse));
  });
});
