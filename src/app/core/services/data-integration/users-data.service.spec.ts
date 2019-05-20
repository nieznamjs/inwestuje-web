import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { UsersDataService } from './users-data.service';
import { ConfigService } from '@services/utils/config.service';
import { User } from '@interfaces/user.interface';
import { expectedUser } from '@mocks/users-service-mock';
import { configServiceDataMock } from '@mocks/config-service-mock';

describe('UsersService', () => {
  const apiUrl = configServiceDataMock.getApiUrl();
  let usersService: UsersDataService;
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

    usersService = new UsersDataService(httpClient, <any>configServiceDataMock);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    usersService = TestBed.get(UsersDataService);
    expect(usersService).toBeTruthy();
  });

  it('#getUser should return expected user', () => {
    const userId = '123';

    usersService.getUser(userId).subscribe((user: User) => expect(user).toEqual(expectedUser));

    const req = httpTestingController.expectOne(`${apiUrl}/user/${userId}`);
    req.flush(expectedUser);

    expect(req.request.method).toBe('GET');
  });
});
