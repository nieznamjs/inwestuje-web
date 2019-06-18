import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AuthFacade } from '@store/auth-store';
import { Observable } from 'rxjs';

@Component({
  selector: 'iw-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.scss']
})
export class ActivateAccountComponent implements OnInit {

  public isActivating$: Observable<boolean>;
  public isUserActivated$: Observable<boolean>;
  public activateError$: Observable<string>;

  constructor(
    private authFacade: AuthFacade,
    private route: ActivatedRoute,
  ) { }

  public ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('userId');
    const token = this.route.snapshot.queryParamMap.get('token');

    this.isActivating$ = this.authFacade.isActivating$;
    this.isUserActivated$ = this.authFacade.isUserActivated$;
    this.activateError$ = this.authFacade.activateError$;

    this.authFacade.activate(userId, token);
  }
}
