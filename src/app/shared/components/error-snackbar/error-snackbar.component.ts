import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material';

import { SnackbarData } from '@interfaces/snackbar-data.interface';

@Component({
  selector: 'app-error-snackbar',
  templateUrl: './error-snackbar.component.html',
  styleUrls: ['./error-snackbar.component.scss']
})
export class ErrorSnackbarComponent {
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: SnackbarData,
    private snackbarRef: MatSnackBarRef<ErrorSnackbarComponent>,
  ) { }

  public close(): void {
    this.snackbarRef.dismiss();
  }
}
