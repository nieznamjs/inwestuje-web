import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';

import { SuccessSnackbarComponent } from '@components/succes-snackbar/success-snackbar.component';
import { ErrorSnackbarComponent } from '@components/error-snackbar/error-snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(
    private snackbar: MatSnackBar,
  ) { }

  public showSuccess(message: string, duration?: number): MatSnackBarRef<SuccessSnackbarComponent> {
    return this.snackbar.openFromComponent(SuccessSnackbarComponent, {
      data: { message },
      duration,
    });
  }

  public showError(message: string, duration?: number): MatSnackBarRef<ErrorSnackbarComponent> {
    return this.snackbar.openFromComponent(ErrorSnackbarComponent, {
      data: { message },
      duration,
    });
  }
}
