import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ConfigService } from '@services/utils/config.service';
import { CreateUserBody } from '@interfaces/http/create-user-body.inteface';
import { User } from '@interfaces/user.interface';
import { LoginResponse } from '@interfaces/http/login-response.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthDataService {

  private readonly API_URL = this.config.apiUrl;

  constructor(
    private http: HttpClient,
    private config: ConfigService,
  ) { }

  public register(newUser: CreateUserBody): Observable<User> {
    return this.http.post<User>(`${this.API_URL}/auth/register`, newUser);
  }

  public login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.API_URL}/auth/login`, { email, password });
  }
}
