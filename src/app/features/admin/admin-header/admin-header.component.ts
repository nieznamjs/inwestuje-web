import { Component, Inject } from '@angular/core';
import { DOMAIN_NAME } from '@constants/app-config';

@Component({
  selector: 'iw-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss'],
})
export class AdminHeaderComponent {
  constructor(@Inject(DOMAIN_NAME) public domainName: string) {}
}
