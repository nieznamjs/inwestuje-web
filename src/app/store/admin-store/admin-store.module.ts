import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { adminReducer } from './admin-reducer';

@NgModule({
  imports: [
    StoreModule.forFeature('admin', adminReducer),
  ],
})
export class AdminStoreModule { }
