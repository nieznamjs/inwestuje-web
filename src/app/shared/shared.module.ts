import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatSlideToggleModule,
  MatStepperModule,
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { IMaskModule } from 'angular-imask';

import { AuthSidebarComponent } from '@components/auth-sidebar/auth-sidebar.component';

const materialModules = [
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatSlideToggleModule,
  MatCheckboxModule,
  MatButtonToggleModule,
  MatStepperModule,
  MatProgressSpinnerModule,
];

@NgModule({
  declarations: [
    AuthSidebarComponent,
  ],
  imports: [
    ...materialModules,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    IMaskModule,
  ],
  exports: [
    ...materialModules,
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    AuthSidebarComponent,
    IMaskModule,
  ],
})
export class SharedModule { }
