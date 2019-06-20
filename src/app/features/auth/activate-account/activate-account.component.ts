import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthFacade } from '@store/auth-store';
import { SnackbarService } from '@services/utils/snackbar.service';
import { SnackbarMessages } from '@constants/snackbar-messages';

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
    private snackbarService: SnackbarService,
    private router: Router,
  ) { }

  public ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('userId');
    const token = this.route.snapshot.queryParamMap.get('token');

    if (!userId || !token) {
      this.snackbarService.showError(SnackbarMessages.BadUrl);
      this.router.navigate(['/login']);
    }

    this.isActivating$ = this.authFacade.isActivating$;
    this.isUserActivated$ = this.authFacade.isUserActivated$;
    this.activateError$ = this.authFacade.activateError$;

    this.authFacade.activate(userId, token);
  }
}
