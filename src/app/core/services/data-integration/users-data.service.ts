import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '@interfaces/user.interface';
import { ConfigService } from '@services/utils/config.service';

@Injectable({
  providedIn: 'root'
})
export class UsersDataService {

  private readonly apiUrl = this.configService.getApiUrl();

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
  ) { }

  public getUser(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/user/${id}`);
  }
}
