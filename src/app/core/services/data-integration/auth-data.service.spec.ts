import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { Type } from '@angular/core';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AuthDataService } from './auth-data.service';
import { ConfigService } from '@services/utils/config.service';
import { expectedLoginResponse, expectedSuccessReponse, expectedUser, newUserBody } from '@mocks/auth-service-mock';
import { User } from '@interfaces/user.interface';
import { LoginResponse } from '@interfaces/http/login-response.interface';
import { ConfigServiceMock } from '@mocks/config-service-mock';
import { SuccessResponse } from '@interfaces/http/success-response.interface';

describe('AuthDataService', () => {
  let apiUrl: string;
  let authService: AuthDataService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let configService: ConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        ConfigServiceMock,
      ],
    });

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController as Type<HttpTestingController>);
    configService = TestBed.get(ConfigServiceMock);
    apiUrl = configService.apiUrl;

    authService = new AuthDataService(httpClient, configService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('register should return created user', () => {
    authService.register(newUserBody).subscribe((user: User) => expect(user).toEqual(expectedUser));

    const req = httpTestingController.expectOne(`${apiUrl}/auth/register`);

    expect(req.request.method).toBe('POST');

    req.flush(expectedUser);
  });

  it('login should return object with user roles', () => {
    authService.login('dummy@email.com', '123')
      .subscribe((response: LoginResponse) => {
        expect(response).toEqual(expectedLoginResponse);
      });

    const req = httpTestingController.expectOne(`${apiUrl}/auth/login`);

    expect(req.request.method).toBe('POST');

    req.flush(expectedLoginResponse);
  });

  it('activate should return success response', () => {
    authService.activate('someId', 'someToken')
      .subscribe((response: SuccessResponse) => {
        expect(response).toEqual(expectedSuccessReponse);
      });

    const req = httpTestingController.expectOne(`${apiUrl}/user/activate`);
    req.flush(expectedSuccessReponse);

    expect(req.request.method).toBe('POST');
  });

  it('initPasswordReset should return success response', () => {
    authService.initPasswordReset('dummy@email.com')
      .subscribe((response: SuccessResponse) => {
        expect(response).toEqual(expectedSuccessReponse);
      });

    const req = httpTestingController.expectOne(`${apiUrl}/user/init-password-reset`);
    req.flush(expectedSuccessReponse);

    expect(req.request.method).toBe('POST');
  });

  it('resetPassword should return success response', () => {
    const userId = 'someId';

    authService.resetPassword('userId', userId, 'token')
      .subscribe((response: SuccessResponse) => {
        expect(response).toEqual(expectedSuccessReponse);
      });

    const req = httpTestingController.expectOne(`${apiUrl}/user/${userId}/reset-password`);
    req.flush(expectedSuccessReponse);

    expect(req.request.method).toBe('POST');
  });
});
