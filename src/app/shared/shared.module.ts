import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
import { IMaskModule } from 'angular-imask';

import { SuccessSnackbarComponent } from '@components/succes-snackbar/success-snackbar.component';
import { ContainerComponent } from '@components/container/container.component';
import { OrdinalNumberPipe } from '@pipes/ordinal-number.pipe';
import { ConfirmDialogComponent } from '@components/confirm-dialog/confirm-dialog.component';
import { ErrorSnackbarComponent } from '@components/error-snackbar/error-snackbar.component';
import { DOMAIN_NAME } from '@constants/app-config';
import { GlobalHeaderComponent } from '@components/global-header/global-header.component';
import { GlobalHeaderNavComponent } from '@components/global-header/global-header-nav/global-header-nav.component';
import { PageNotFoundComponent } from '@components/page-not-found/page-not-found.component';
import { AccountTypePipe } from '@pipes/account-type.pipe';
import { AccountRolePipe } from '@pipes/account-role.pipe';
import { MatPaginatorIntlPl } from './helpers/mat-paginator-intl-pl';

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
  MatMenuModule,
  MatIconModule,
  MatDialogModule,
  MatSortModule,
];

@NgModule({
  declarations: [
    SuccessSnackbarComponent,
    ContainerComponent,
    OrdinalNumberPipe,
    ConfirmDialogComponent,
    ErrorSnackbarComponent,
    GlobalHeaderComponent,
    GlobalHeaderNavComponent,
    PageNotFoundComponent,
    AccountTypePipe,
    AccountRolePipe,
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
    IMaskModule,
    ContainerComponent,
    OrdinalNumberPipe,
    GlobalHeaderComponent,
    AccountTypePipe,
    AccountRolePipe,
  ],
  entryComponents: [
    SuccessSnackbarComponent,
    ErrorSnackbarComponent,
    ConfirmDialogComponent,
  ],
  providers: [
    { provide: DOMAIN_NAME, useValue: DOMAIN_NAME },
    { provide: MatPaginatorIntl, useClass: MatPaginatorIntlPl },
  ],
})
export class SharedModule { }
