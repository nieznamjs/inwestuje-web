import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';

import { LocalStorageService } from '@services/utils/local-storage.service';
import { USER_ROLES_KEY } from '@constants/local-storage-keys';

@Injectable({
  providedIn: 'root'
})
export class AppGuard implements CanLoad {
  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
  ) {}

  public canLoad(): boolean {
    const currentUserRoles = this.localStorageService.get<string[]>(USER_ROLES_KEY);

    if (!currentUserRoles) {
      this.router.navigate([ '/auth/login' ]);
      return false;
    }

    return true;
  }
}
