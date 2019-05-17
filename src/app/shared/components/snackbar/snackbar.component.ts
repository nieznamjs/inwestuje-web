import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material';

import { SnackbarData } from '@interfaces/snackbar-data.interface';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent {

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: SnackbarData,
    private snackbarRef: MatSnackBarRef<SnackbarComponent>,
  ) { }

  public close(): void {
    this.snackbarRef.dismiss();
  }
}
