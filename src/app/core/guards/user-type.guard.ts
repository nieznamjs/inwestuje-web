import { Injectable } from '@angular/core';
import { CanLoad, Route, Router } from '@angular/router';

import { USER_ROLES_KEY } from '@constants/local-storage-keys';
import { LocalStorageService } from '@services/utils/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserTypeGuard implements CanLoad {
  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
  ) {}

  public canLoad(route: Route): boolean {
    const allowedUserRoles = route.data['allowedUserRoles'];
    const currentUserRoles = this.localStorageService.get<string[]>(USER_ROLES_KEY);

    const userAllowed = currentUserRoles.some((role: string) => allowedUserRoles.includes(role));

    if (!userAllowed) {
      this.router.navigate([ '/' ]);
      return false;
    }

    return true;
  }
}
