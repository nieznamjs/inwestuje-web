import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public loginForm = this.fb.group({
    login: ['', Validators.required ],
    password: ['', Validators.required ],
  });

  constructor(
    private fb: FormBuilder,
  ) { }

  get login(): AbstractControl {
    return this.loginForm.get('login');
  }

  get password(): AbstractControl {
    return this.loginForm.get('password');
  }

  public onSubmit(): void {
    const { login, password } = this.loginForm.value;

    alert(`${login}, ${password}`);
  }
}
