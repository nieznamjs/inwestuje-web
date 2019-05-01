import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FormsService } from '../../../core/services/forms.service';
import { AccountTypes } from '../../../shared/constants/account-types';
import { PayuTokenCreateResponse } from '../../../shared/interfaces/payu-token-create-response';
import { PAYU_MERCHANT_ID } from '../../../shared/constants/payu-constants';

declare const OpenPayU;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public readonly rolesData = ['Inwestor', 'Deal Maker', 'Sourcer'];
  public isCheckingCardData = false;

  public registerForm = this.fb.group({
    email: [ '', [ Validators.email, Validators.required ]],
    password: [ '', Validators.required ],
    confirmPassword: [ '', Validators.required ],
    roles: [[ 'Inwestor' ], Validators.required ],
    accountType: [ 'private' ],
    name: [ '', Validators.required ],
    lastName: [ '', Validators.required ],
    companyName: [ '', Validators.required ],
    nip: [ '', [ Validators.required, Validators.pattern('^[0-9]{10}$') ]],
  });

  public paymentForm = this.fb.group({
    cardNumber: [ '', [ Validators.required, Validators.pattern('^[0-9]{16}$') ]],
    cvv: [ '', [ Validators.required, Validators.pattern('^[0-9]{3}$') ]],
    expMonth: [ '', [ Validators.required, Validators.min(1), Validators.max(12) ]],
    expYear: [ '', [ Validators.required, Validators.min(19), Validators.max(50) ]],
    agreement: [ null, Validators.requiredTrue ],
    token: [ null, Validators.required ],
  });

  get agreementField(): AbstractControl {
    return this.getFormControl(this.paymentForm, 'agreement');
  }

  constructor(
    private fb: FormBuilder,
    private formsService: FormsService,
  ) { }

  public ngOnInit(): void {
    const nameField = this.getFormControl(this.registerForm, 'name');
    const lastNameField = this.getFormControl(this.registerForm, 'lastName');
    const companyNameField = this.getFormControl(this.registerForm, 'companyName');
    const nipField = this.getFormControl(this.registerForm, 'nip');

    this.disableFields([ companyNameField, nipField ]);

    this.getFormControl(this.registerForm, 'accountType').valueChanges
      .subscribe((accountType: AccountTypes.Private | AccountTypes.Company) => {
        if (accountType === AccountTypes.Private) {
          this.enableFields([ nameField, lastNameField ]);
          this.disableFields([ companyNameField, nipField ]);
        } else {
          this.enableFields([ companyNameField, nipField ]);
          this.disableFields([ nameField, lastNameField ]);
        }
      });
  }

  private enableFields(fields: AbstractControl[]): void {
    fields.forEach((field: AbstractControl) => {
      field.enable();
    });
  }

  private disableFields(fields: AbstractControl[]): void {
    fields.forEach((field: AbstractControl) => {
      field.disable();
    });
  }

  public getFormControl(form: FormGroup, name: string): AbstractControl {
    return this.formsService.getFormControl(form, name);
  }

  public onSubmit(): void {
    const { email, password, confirmPassword, isCompany, roles } = this.registerForm.value;
  }

  public onSubmitPaymentData(): void {
    this.getFormControl(this.paymentForm, 'agreement').markAsDirty();
    const { cardNumber, cvv, expMonth, expYear, agreement } = this.paymentForm.value;

    console.log(cardNumber, cvv, expMonth, expYear, agreement);
    console.log(this.getFormControl(this.paymentForm, 'agreement'));
    this.isCheckingCardData = true;
    OpenPayU.merchantId = PAYU_MERCHANT_ID;
    const requestOk: boolean = OpenPayU.Token.create({}, (response: PayuTokenCreateResponse) => {
      this.getFormControl(this.paymentForm, 'token').setValue(response.data.token);
    });

    if (requestOk) {
      this.isCheckingCardData = false;
    }
  }
}
