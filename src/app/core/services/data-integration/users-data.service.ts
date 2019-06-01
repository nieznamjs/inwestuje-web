import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '@interfaces/user.interface';
import { ConfigService } from '@services/utils/config.service';
import { GetUsersResponse } from '@interfaces/http/get-users-response.interface';

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

  public getUsers(page: number, pageSize: number): Observable<GetUsersResponse> {
    return this.http.post<GetUsersResponse>(`${this.config.apiUrl}/user/findAll`, { page, pageSize });
  }
}
