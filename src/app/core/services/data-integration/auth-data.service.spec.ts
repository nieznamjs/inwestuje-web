import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { Type } from '@angular/core';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AuthDataService } from './auth-data.service';
import { ConfigService } from '@services/utils/config.service';
import { expectedLoginResponse, expectedUser, newUserBody } from '@mocks/auth-service-mock';
import { User } from '@interfaces/user.interface';
import { LoginResponse } from '@interfaces/http/login-response.interface';
import { ConfigServiceMock } from '@mocks/config-service-mock';

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

  it('login should return object with success: boolean', () => {
    authService.login('dummy@email.com', '123')
      .subscribe((response: LoginResponse) => {
        expect(response).toEqual(expectedLoginResponse);
      });

    const req = httpTestingController.expectOne(`${apiUrl}/auth/login`);

    expect(req.request.method).toBe('POST');

    req.flush(expectedLoginResponse);
  });
});
