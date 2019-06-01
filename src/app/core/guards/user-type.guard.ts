import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';

import { USER_ROLE_KEY } from '@constants/local-storage-keys';
import { LocalStorageService } from '@services/utils/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserTypeGuard implements CanLoad {
  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
  ) {}

  public canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    const allowedUserRoles = route.data['allowedUserRoles'];
    const currentUserRole = this.localStorageService.get(USER_ROLE_KEY);

    if (!allowedUserRoles.includes(currentUserRole)) {
      this.router.navigate([ '/login' ]);
      return;
    }

    return true;
  }
}
