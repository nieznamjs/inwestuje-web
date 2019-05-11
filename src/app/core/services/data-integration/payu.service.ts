import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

import { CreateTokenFormatErrors } from '@interfaces/payu/create-token-format-errors';
import { OpenPayU } from '@interfaces/payu/open-payu';
import { PayuTokenCreateResponse } from '@interfaces/payu/payu-token-create-response';
import { PayUCreateTokenResponses } from '@constants/payu-create-token-response';

declare const OpenPayU: OpenPayU;

@Injectable({
  providedIn: 'root'
})
export class PayUService {

  constructor() { }

  public createToken(): Observable<CreateTokenFormatErrors | PayuTokenCreateResponse> {
    return new Observable((observer: Observer<CreateTokenFormatErrors | PayuTokenCreateResponse>) => {
      OpenPayU.Token.create({}, (response: PayuTokenCreateResponse) => {
        if (response.status.code !== PayUCreateTokenResponses.Success) {
          observer.error(response);
        }

        observer.next(response);
      });
    });
  }

  public setMerchantId(id: string): void {
    OpenPayU.merchantId = id;
  }
}
