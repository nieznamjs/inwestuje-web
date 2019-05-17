import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { FormsService } from '@services/utils/forms.service';
import { AuthService } from '@services/data-integration/auth.service';
import { LoginResponse } from '@interfaces/http/login-response.interface';
import { finalize } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public isLoading = false;
  public loginError = false;
  public loginForm = this.fb.group({
    email: [ null, [ Validators.required, Validators.email ]],
    password: [ null, [
      Validators.required,
      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{6,24}$'),
    ]],
  });

  constructor(
    private fb: FormBuilder,
    private formsService: FormsService,
    private authService: AuthService,
    private router: Router,
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
        this.router.navigate(['/admin']);
      }, (err: HttpErrorResponse) => {
        if (err.error.message) {
          this.loginError = true;
        }
      });
  }
}
