import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { SuccessSnackbarComponent } from '@components/succes-snackbar/success-snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(
    private snackbar: MatSnackBar,
  ) { }

  public showSuccess(message: string): void {
    this.snackbar.openFromComponent(SuccessSnackbarComponent, {
      data: { message },
    });
  }
}
