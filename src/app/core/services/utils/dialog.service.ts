import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ConfirmDialogComponent } from '@components/confirm-dialog/confirm-dialog.component';
import { EditUserDialogComponent } from '@components/edit-user-dialog/edit-user-dialog.component';
import { User } from '@interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(
    private dialog: MatDialog,
  ) { }

  public openConfirmDialog(message: string): MatDialogRef<ConfirmDialogComponent> {
    return this.dialog.open(ConfirmDialogComponent, {
      data: { message },
    });
  }

  openEditUserDialog(user: User): MatDialogRef<EditUserDialogComponent> {
    return this.dialog.open(EditUserDialogComponent, {
      data: { user },
    });
  }
}
