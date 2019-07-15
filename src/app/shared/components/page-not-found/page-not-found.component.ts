import { Component, Inject } from '@angular/core';
import { Location } from '@angular/common';

import { DOMAIN_NAME } from '@constants/app-config';

@Component({
  selector: 'iw-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent {

  constructor(
    private location: Location,
    @Inject(DOMAIN_NAME) public domainName: string,
  ) { }

  public goBack(): void {
    this.location.back();
  }
}


