import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material';

const materialModules = [
  MatInputModule,
];

@NgModule({
  declarations: [],
  imports: [
    ...materialModules,
    CommonModule,
    RouterModule,
  ],
  exports: [
    ...materialModules,
    RouterModule,
    CommonModule,
  ],
})
export class SharedModule { }
