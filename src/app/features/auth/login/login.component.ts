import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { FormsService } from '@services/utils/forms.service';
import { PASSWORD_REQUIREMENT_REGEX_STRING } from '@constants/regexes';
import { DOMAIN_NAME } from '@constants/app-config';
import { AuthFacade } from '../../../store/auth-store/auth-facade';
import { Observable } from 'rxjs';

@Component({
  selector: 'iw-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  public isLoading$: Observable<boolean>;
  public loginError$: Observable<string>;
  public loginForm = this.fb.group({
    email: [ null, [ Validators.required, Validators.email ]],
    password: [ null, [
      Validators.required,
      Validators.pattern(PASSWORD_REQUIREMENT_REGEX_STRING),
    ]],
  });

  constructor(
    private authFacade: AuthFacade,
    private fb: FormBuilder,
    private formsService: FormsService,
    @Inject(DOMAIN_NAME) public domainName: string,
  ) { }

  public ngOnInit(): void {
    this.isLoading$ = this.authFacade.isLogging$;
    this.loginError$ = this.authFacade.loginError$;
  }

  public getFormControl(name: string): AbstractControl {
    return this.formsService.getFormControl(this.loginForm, name);
  }

  public onSubmit(): void {
    if (this.loginForm.invalid) { return; }

    const { email, password } = this.loginForm.value;

    this.authFacade.login(email, password);
  }
}
