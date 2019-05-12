import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

import { CreateTokenFormatErrors } from '@interfaces/payu/create-token-format-errors';
import { OpenPayU } from '@interfaces/payu/open-payu';
import { PayuTokenCreateResponse } from '@interfaces/payu/payu-token-create-response';
import { PayuCreateTokenResponses } from '@constants/payu-create-token-response';
import { ConfigService } from '@services/utils/config.service';

declare const OpenPayU: OpenPayU;

@Injectable({
  providedIn: 'root'
})
export class PayuService {

  constructor(
    private configService: ConfigService,
  ) {}

  public createToken(): Observable<CreateTokenFormatErrors | PayuTokenCreateResponse> {
    return new Observable((observer: Observer<CreateTokenFormatErrors | PayuTokenCreateResponse>) => {
      const isCardDataValid: CreateTokenFormatErrors | true = OpenPayU.Token.create({}, (response: PayuTokenCreateResponse) => {
        if (response.status.code !== PayuCreateTokenResponses.Success) {
          observer.error(response);
        }

        observer.next(response);
      });

      if (isCardDataValid !== true) {
        observer.error(isCardDataValid);
      }
    });
  }

  public async setMerchantId(): Promise<void> {
    OpenPayU.merchantId = await this.configService.getMerchantId();
  }
}
