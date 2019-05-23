import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material';

import { SuccessSnackbarComponent } from '@components/succes-snackbar/success-snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(
    private snackbar: MatSnackBar,
  ) { }

  public showSuccess(message: string): MatSnackBarRef<SuccessSnackbarComponent> {
    return this.snackbar.openFromComponent(SuccessSnackbarComponent, {
      data: { message },
    });
  }
}
