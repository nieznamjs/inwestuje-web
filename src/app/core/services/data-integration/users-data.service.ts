import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '@interfaces/user.interface';
import { ConfigService } from '@services/utils/config.service';

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
}
