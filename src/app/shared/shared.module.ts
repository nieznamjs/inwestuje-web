import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import {
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatStepperModule,
  MatTableModule,
  MatToolbarModule,
  MatPaginatorModule,
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { IMaskModule } from 'angular-imask';

import { AuthSidebarComponent } from '@components/auth-sidebar/auth-sidebar.component';
import { SuccessSnackbarComponent } from '@components/succes-snackbar/success-snackbar.component';
import { ContainerComponent } from '@components/container/container.component';
import { OrdinalNumberPipe } from '@pipes/ordinal-number.pipe';

const materialModules = [
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatSlideToggleModule,
  MatCheckboxModule,
  MatButtonToggleModule,
  MatStepperModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
  MatToolbarModule,
  MatTableModule,
  MatPaginatorModule,
];

@NgModule({
  declarations: [
    AuthSidebarComponent,
    SuccessSnackbarComponent,
    ContainerComponent,
    OrdinalNumberPipe,
  ],
  imports: [
    ...materialModules,
    CommonModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    IMaskModule,
  ],
  exports: [
    ...materialModules,
    RouterModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    AuthSidebarComponent,
    IMaskModule,
    ContainerComponent,
    OrdinalNumberPipe,
  ],
  entryComponents: [
    SuccessSnackbarComponent,
  ],
})
export class SharedModule { }
