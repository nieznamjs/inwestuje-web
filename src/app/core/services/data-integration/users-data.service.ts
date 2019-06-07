import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '@interfaces/user.interface';
import { ConfigService } from '@services/utils/config.service';
import { GetAllResponse } from '@interfaces/http/get-all-response';
import { GetAllRequestConfig } from '@interfaces/get-all-request-config';

@Injectable({
  providedIn: 'root'
})
export class UsersDataService {

  constructor(
    private http: HttpClient,
    private config: ConfigService,
  ) { }

  public getUser(id: string): Observable<User> {
    return this.http.get<User>(`${this.config.apiUrl}/user/${id}`);
  }

  public getUsers(config: Partial<GetAllRequestConfig>): Observable<GetAllResponse<User>> {
    return this.http.post<GetAllResponse<User>>(`${this.config.apiUrl}/user/findAll`, config);
  }

  public updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.config.apiUrl}/user`, user);
  }
}
