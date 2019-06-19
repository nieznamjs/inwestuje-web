import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { AuthFacade } from '@store/auth-store';
import { FormsService } from '@services/utils/forms.service';
import { DOMAIN_NAME } from '@constants/app-config';

@Component({
  selector: 'iw-reset-password-init',
  templateUrl: './reset-password-init.component.html',
  styleUrls: ['./reset-password-init.component.scss']
})
export class ResetPasswordInitComponent implements OnInit {

  public isLoading$: Observable<boolean>;
  public resetPasswordInitError$: Observable<string>;
  public resetPasswordForm = this.fb.group({
    email: [ null, [ Validators.required, Validators.email ]],
  });

  constructor(
    private fb: FormBuilder,
    private authFacade: AuthFacade,
    private formsService: FormsService,
    @Inject(DOMAIN_NAME) public domainName: string,
  ) { }

  public ngOnInit(): void {
    this.isLoading$ = this.authFacade.isInitializingPasswordReset$;
    this.resetPasswordInitError$ = this.authFacade.initPasswordResetError$;
  }

  public getFormControl(name: string): AbstractControl {
    return this.formsService.getFormControl(this.resetPasswordForm, name);
  }

  public onSubmit(): void {
    if (this.resetPasswordForm.invalid) { return; }

    const { email } = this.resetPasswordForm.value;

    this.authFacade.initPasswordReset(email);
  }
}
