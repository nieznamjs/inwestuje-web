import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { CoreRoutingModule } from './core-routing.module';
import { HttpConfigInterceptor } from './interceptors/http-config.interceptor';

@NgModule({
  imports: [
    CoreRoutingModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }
  ],
})
export class CoreModule { }

