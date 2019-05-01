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

import { AuthSidebarComponent } from './components/auth-sidebar/auth-sidebar.component';

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
  ],
  exports: [
    ...materialModules,
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    AuthSidebarComponent,
  ],
})
export class SharedModule { }
