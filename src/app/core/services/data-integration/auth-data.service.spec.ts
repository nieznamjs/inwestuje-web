import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AuthDataService } from './auth-data.service';
import { ConfigService } from '@services/utils/config.service';
import { UsersDataService } from '@services/data-integration/users-data.service';
import { expectedLoginResponse, expectedUser, newUserBody } from '@mocks/auth-service-mock';
import { User } from '@interfaces/user.interface';
import { LoginResponse } from '@interfaces/http/login-response.interface';
import { configServiceDataMock } from '@mocks/config-service-mock';

describe('AuthService', () => {
  const apiUrl = configServiceDataMock.getApiUrl();
  let authService: AuthDataService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        UsersDataService,
        { provide: ConfigService, useValue: configServiceDataMock },
      ],
    });

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);

    authService = new AuthDataService(httpClient, <any>configServiceDataMock);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    authService = TestBed.get(AuthDataService);
    expect(authService).toBeTruthy();
  });

  it('#register should return created user', () => {
    authService.register(newUserBody).subscribe((user: User) => expect(user).toEqual(expectedUser));

    const req = httpTestingController.expectOne(`${apiUrl}/auth/register`);
    req.flush(expectedUser);

    expect(req.request.method).toBe('POST');
  });

  it('#login should return object with success: boolean', () => {
    authService.login('dummy@email.com', '123')
      .subscribe((response: LoginResponse) => expect(response).toEqual(expectedLoginResponse));

    const req = httpTestingController.expectOne(`${apiUrl}/auth/login`);
    req.flush(expectedLoginResponse);

    expect(req.request.method).toBe('POST');
  });
});
