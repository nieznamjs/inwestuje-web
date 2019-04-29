import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FormsService } from '../../../core/services/forms.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  public readonly rolesData = ['Inwestor', 'Deal Maker', 'Sourcer'];

  public registerForm = this.fb.group({
    email: [ '', [ Validators.email, Validators.required ]],
    password: [ '', Validators.required ],
    confirmPassword: [ '', Validators.required ],
    roles: [ null, Validators.required ],
    accountType: [ 'private' ],
    name: [ '', Validators.required ],
    lastName: [ '', Validators.required ],
    companyName: [ '', Validators.required ],
    nip: [ '', [ Validators.required, Validators.pattern('^[0-9]{10}$') ]],
  });

  public paymentForm = this.fb.group({
    cardNumber: [ '', Validators.required ],
    cvv: [ '', Validators.required ],
    expMonth: [ '', Validators.required ],
    expYear: [ '', Validators.required ],
  });

  constructor(
    private fb: FormBuilder,
    private formsService: FormsService,
  ) { }

  public getFormControl(form: FormGroup, name: string): AbstractControl {
    return this.formsService.getFormControl(form, name);
  }

  public onSubmit(): void {
    const { email, password, confirmPassword, isCompany, roles } = this.registerForm.value;
  }
}
