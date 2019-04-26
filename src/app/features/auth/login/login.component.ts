import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { FormsService } from '../../../core/services/forms.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public loginForm = this.fb.group({
    login: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private formsService: FormsService,
  ) { }

  public getFormControl(name: string): AbstractControl {
    return this.formsService.getFormControl(this.loginForm, name);
  }

  public onSubmit(): void {
    const { login, password } = this.loginForm.value;

    alert(`${ login }, ${ password }`);
  }
}
