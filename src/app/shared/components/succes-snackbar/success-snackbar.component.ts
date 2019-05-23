import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material';

import { SnackbarData } from '@interfaces/snackbar-data.interface';

@Component({
  selector: 'app-snackbar',
  templateUrl: './success-snackbar.component.html',
  styleUrls: ['./success-snackbar.component.scss']
})
export class SuccessSnackbarComponent {

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: SnackbarData,
    private snackbarRef: MatSnackBarRef<SuccessSnackbarComponent>,
  ) { }

  public close(): void {
    this.snackbarRef.dismiss();
  }
}
