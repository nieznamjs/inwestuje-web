import { Component, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

import { FormsService } from '@services/utils/forms.service';
import { AuthDataService } from '@services/data-integration/auth-data.service';
import { PASSWORD_REQUIREMENT_REGEX_STRING } from '@constants/regexes';
import { LocalStorageService } from '@services/utils/local-storage.service';
import { USER_ROLES_KEY } from '@constants/local-storage-keys';
import { LoginResponse } from '@interfaces/http/login-response.interface';
import { DOMAIN_NAME } from '@constants/domain-name';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [
    { provide: DOMAIN_NAME, useValue: DOMAIN_NAME },
  ],
})
export class LoginComponent {

  public isLoading = false;
  public loginError = false;
  public loginForm = this.fb.group({
    email: [ null, [ Validators.required, Validators.email ]],
    password: [ null, [
      Validators.required,
      Validators.pattern(PASSWORD_REQUIREMENT_REGEX_STRING),
    ]],
  });

  constructor(
    private fb: FormBuilder,
    private formsService: FormsService,
    private authService: AuthDataService,
    private router: Router,
    private localStorageService: LocalStorageService,
    @Inject(DOMAIN_NAME) public domainName: string,
  ) { }

  public getFormControl(name: string): AbstractControl {
    return this.formsService.getFormControl(this.loginForm, name);
  }

  public onSubmit(): void {
    if (this.loginForm.invalid) { return; }

    this.isLoading = true;

    const { email, password } = this.loginForm.value;

    this.authService.login(email, password)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        }),
      ).subscribe((response: LoginResponse) => {
        this.loginError = false;
        this.localStorageService.set<string[]>(USER_ROLES_KEY, response.userRoles);
        this.router.navigate(['/admin']);
      }, () => {
        this.loginError = true;
      });
  }
}
