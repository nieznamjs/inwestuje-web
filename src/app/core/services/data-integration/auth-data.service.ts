import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ConfigService } from '@services/utils/config.service';
import { CreateUserBody } from '@interfaces/http/create-user-body.inteface';
import { User } from '@interfaces/user.interface';
import { LoginResponse } from '@interfaces/http/login-response.interface';
import { SuccessResponse } from '@interfaces/http/success-response.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthDataService {
  constructor(
    private http: HttpClient,
    private config: ConfigService,
  ) { }

  public register(newUser: CreateUserBody): Observable<User> {
    return this.http.post<User>(`${this.config.apiUrl}/auth/register`, newUser);
  }

  public login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.config.apiUrl}/auth/login`, { email, password });
  }

  public activate(userId: string, token: string): Observable<SuccessResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: token,
      }),
    };

    return this.http.post<SuccessResponse>(`${this.config.apiUrl}/user/activate`, { userId }, httpOptions);
  }

  public initPasswordReset(userEmail: string): Observable<SuccessResponse> {
    return this.http.post<SuccessResponse>(`${this.config.apiUrl}/user/init-password-reset`, { userEmail });
  }

  public resetPassword(userId: string, newPassword: string, token: string): Observable<SuccessResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: token,
      }),
    };

    return this.http.post<SuccessResponse>(`${this.config.apiUrl}/user/${userId}/reset-password`, { newPassword }, httpOptions);
  }
}
