import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { SnackbarMessages } from '@constants/snackbar-messages';
import { SnackbarService } from '@services/utils/snackbar.service';
import { AuthFacade } from '@store/auth-store';
import { PASSWORD_REQUIREMENT_REGEX_STRING } from '@constants/regexes';
import { DOMAIN_NAME } from '@constants/app-config';
import { Observable } from 'rxjs';
import { FormsService } from '@services/utils/forms.service';

@Component({
  selector: 'iw-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  private userId: string;
  private token: string;
  public isLoading$: Observable<boolean>;
  public resetPasswordError$: Observable<string>;
  public resetPasswordForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private snackbarService: SnackbarService,
    private router: Router,
    private authFacade: AuthFacade,
    private formsService: FormsService,
    @Inject(DOMAIN_NAME) public domainName: string,
  ) { }

  private createForm(): FormGroup {
    return this.fb.group({
      password: [ '', [
        Validators.required,
        Validators.pattern(PASSWORD_REQUIREMENT_REGEX_STRING),
      ]],
      confirmPassword: [ '', Validators.required ],
    });
  }

  public ngOnInit(): void {
    this.resetPasswordForm = this.createForm();

    this.userId = this.route.snapshot.paramMap.get('userId');
    this.token = this.route.snapshot.queryParamMap.get('token');

    if (!this.userId || !this.token) {
      this.snackbarService.showError(SnackbarMessages.BadUrl);
      this.router.navigate(['/auth/login']);
      return;
    }

    this.isLoading$ = this.authFacade.isResettingPassword$;
    this.resetPasswordError$ = this.authFacade.resetPasswordError$;
  }

  public getFormControl(name: string): AbstractControl {
    return this.formsService.getFormControl(this.resetPasswordForm, name);
  }

  public onSubmit(): void {
    if (this.resetPasswordForm.invalid) { return; }

    const { password } = this.resetPasswordForm.value;

    this.authFacade.resetPassword(this.userId, password, this.token);
  }
}
