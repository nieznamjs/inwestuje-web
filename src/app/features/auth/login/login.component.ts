import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { FormsService } from '@services/forms.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public loginForm = this.fb.group({
    email: [ '', [ Validators.required, Validators.email ]],
    password: [ '', Validators.required ],
  });

  constructor(
    private fb: FormBuilder,
    private formsService: FormsService,
  ) { }

  public getFormControl(name: string): AbstractControl {
    return this.formsService.getFormControl(this.loginForm, name);
  }

  public onSubmit(): void {
    const { email, password } = this.loginForm.value;

    alert(`${ email }, ${ password }`);
  }
}
