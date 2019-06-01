import { Injectable } from '@angular/core';
import { SnackbarService } from '@services/utils/snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(
    private snackbarService: SnackbarService,
  ) { }

  public get(key: string) {
    try {
      const data = localStorage.getItem(key);
      return JSON.parse(data);
    } catch (err) {
      // handle this later with snackbar
    }
  }

  public set(key: string, data: any) {
    try {
      const serializedData = JSON.stringify(data);
      localStorage.setItem(key, serializedData);
    } catch (err) {
      // handle this later with snackbar
    }
  }

  public clear(key: string) {
    try {
      localStorage.removeItem(key);
    } catch (err) {
      // handle this later with snackbar
    }
  }
}
