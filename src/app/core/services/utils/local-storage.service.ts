import { Injectable } from '@angular/core';
import { SnackbarService } from '@services/utils/snackbar.service';

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
      // TODO handle this later with snackbar
    }
  }

  public set<T>(key: string, data: T): void {
    try {
      const serializedData = JSON.stringify(data);
      localStorage.setItem(key, serializedData);
    } catch (err) {
      // TODO handle this later with snackbar
    }
  }

  public clear(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (err) {
      // TODO handle this later with snackbar
    }
  }
}
