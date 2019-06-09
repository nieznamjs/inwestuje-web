import { Injectable } from '@angular/core';
import { SnackbarService } from '@services/utils/snackbar.service';
import { SnackbarMessages } from '@constants/snackbar-messages';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(
    private snackbarService: SnackbarService,
  ) { }

  public get<T>(key: string): T {
    try {
      const data = localStorage.getItem(key);
      return JSON.parse(data);
    } catch (err) {
      this.snackbarService.showError(SnackbarMessages.GeneralError);
    }
  }

  public set<T>(key: string, data: T): void {
    try {
      const serializedData = JSON.stringify(data);
      localStorage.setItem(key, serializedData);
    } catch (err) {
      this.snackbarService.showError(SnackbarMessages.GeneralError);
    }
  }

  public clear(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (err) {
      this.snackbarService.showError(SnackbarMessages.GeneralError);
    }
  }
}
