import { Component, Inject } from '@angular/core';
import { DOMAIN_NAME } from '@constants/domain-name';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss'],
  providers: [
    { provide: DOMAIN_NAME, useValue: DOMAIN_NAME },
  ],
})
export class AdminHeaderComponent {
  constructor(@Inject(DOMAIN_NAME) public domainName: string) {}
}
