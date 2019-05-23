import { Injectable } from '@angular/core';

import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  public async getMerchantId(): Promise<string> {
    return environment.payUMerchantId;
  }

  get apiUrl(): string {
    return environment.apiUrl;
  }
}
