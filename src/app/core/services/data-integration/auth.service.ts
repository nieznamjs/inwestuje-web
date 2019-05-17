import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ConfigService } from '@services/utils/config.service';
import { CreateUserBody } from '@interfaces/create-user-body.inteface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly apiUrl = this.configService.getApiUrl();

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
  ) { }

  public register(newUser: CreateUserBody): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, newUser);
  }
}
