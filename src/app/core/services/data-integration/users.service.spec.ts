import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

import { UsersService } from './users.service';
import { ConfigService } from '@services/utils/config.service';
import { User } from '@interfaces/user.interface';
import { expectedUser } from '../../../../mocks/users-service-mock';

describe('UsersService', () => {
  let usersService: UsersService;
  let httpClientSpy: { get: jasmine.Spy };
  let configServiceSpy: ConfigService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    configServiceSpy = jasmine.createSpyObj('ConfigService', ['getApiUrl']);

    TestBed.configureTestingModule({
      providers: [
        UsersService,
        { provide: ConfigService, useValue: configServiceSpy },
        { provide: HttpClient, useValue: httpClientSpy }
      ],
    });

    usersService = new UsersService(<any>httpClientSpy, configServiceSpy);
  });

  it('should be created', () => {
    usersService = TestBed.get(UsersService);
    expect(usersService).toBeTruthy();
  });

  it('#getUser should return expected user', () => {
    httpClientSpy.get.and.returnValue(of(expectedUser));

    usersService.getUser('123').subscribe((user: User) => expect(user).toEqual(expectedUser));
  });
});
