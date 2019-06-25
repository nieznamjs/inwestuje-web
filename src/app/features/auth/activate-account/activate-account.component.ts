import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthFacade } from '@store/auth-store';
import { SnackbarService } from '@services/utils/snackbar.service';
import { SnackbarMessages } from '@constants/snackbar-messages';
import { DOMAIN_NAME } from '@constants/app-config';

@Component({
  selector: 'iw-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.scss']
})
export class ActivateAccountComponent implements OnInit {

  public isActivating$: Observable<boolean>;
  public isUserActivated$: Observable<boolean>;
  public userActivationError$: Observable<string>;

  constructor(
    private authFacade: AuthFacade,
    private route: ActivatedRoute,
    private snackbarService: SnackbarService,
    private router: Router,
    @Inject(DOMAIN_NAME) public domainName: string,
  ) { }

  public ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('userId');
    const token = this.route.snapshot.queryParamMap.get('token');

    if (!userId || !token) {
      this.snackbarService.showError(SnackbarMessages.BadUrl);
      // TODO navigate to 404
      this.router.navigate(['/auth/login']);
      return;
    }

    this.isActivating$ = this.authFacade.isActivating$;
    this.isUserActivated$ = this.authFacade.isUserActivated$;
    this.userActivationError$ = this.authFacade.userActivationError$;

    this.authFacade.activateUser(userId, token);
  }
}
