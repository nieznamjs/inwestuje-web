import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { UsersDataService } from './users-data.service';
import { ConfigService } from '@services/utils/config.service';
import { User } from '@interfaces/user.interface';
import { expectedUser, expectedUsersResponse } from '@mocks/users-service-mock';
import { ConfigServiceMock } from '@mocks/config-service-mock';
import { GetUsersResponse } from '@interfaces/http/get-users-response.interface';

describe('UsersDataService', () => {
  let apiUrl: string;
  let usersService: UsersDataService;
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
    httpTestingController = TestBed.get(HttpTestingController);
    configService = TestBed.get(ConfigServiceMock);
    apiUrl = configService.apiUrl;

    usersService = new UsersDataService(httpClient, configService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(usersService).toBeTruthy();
  });

  it('getUser should return expected user', () => {
    const userId = '123';

    usersService.getUser(userId).subscribe((user: User) => expect(user).toEqual(expectedUser));

    const req = httpTestingController.expectOne(`${configService.apiUrl}/user/${userId}`);
    req.flush(expectedUser);

    expect(req.request.method).toBe('GET');
  });

  it('getUsers should return expected users response', () => {
    usersService.getUsers(1, 1).subscribe((response: GetUsersResponse) => {
      expect(response).toEqual(expectedUsersResponse);
    });

    const req = httpTestingController.expectOne(`${configService.apiUrl}/user/findAll`);
    req.flush(expectedUsersResponse);

    expect(req.request.method).toBe('POST');
  });

  it('updateUser should return expected user', () => {
    usersService.updateUser(expectedUser).subscribe((user: User) => expect(user).toEqual(expectedUser));

    const req = httpTestingController.expectOne(`${configService.apiUrl}/user`);
    req.flush(expectedUser);

    expect(req.request.method).toBe('PUT');
  });
});
