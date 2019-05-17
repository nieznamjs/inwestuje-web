import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { SnackbarComponent } from '@components/snackbar/snackbar.component';
import { SnackbarTypes } from '@constants/snackbar-types';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(
    private snackbar: MatSnackBar,
  ) { }

  public showSuccess(message: string): void {
    this.snackbar.openFromComponent(SnackbarComponent, {
      data: {
        message,
        type: SnackbarTypes.Success,
      },
    });
  }
}
