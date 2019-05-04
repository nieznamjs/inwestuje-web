import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FormsService } from '@services/forms.service';
import { AccountTypes } from '@constants/account-types';
import { PayuTokenCreateResponse } from '@interfaces/payu-token-create-response';
import { PAYU_MERCHANT_ID } from '@constants/payu-constants';

declare const OpenPayU;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public readonly rolesData = ['Inwestor', 'Deal Maker', 'Sourcer'];
  public isCheckingCardData = false;
  public cardCheckError = false;
  public nipMask = { mask: '000-000-00-00', };
  public cardNumberMask = { mask: '0000 0000 0000 0000', };
  public cvvMask = { mask: '000' };
  public expMonthMask = {
    mask: Number,
    min: 1,
    max: 12,
  };
  public expYearMask = {
    mask: Number,
    min: 19,
    max: 30,
  };

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

    this.isCheckingCardData = true;
    OpenPayU.merchantId = PAYU_MERCHANT_ID;
    const requestOk: boolean = OpenPayU.Token.create({}, (response: PayuTokenCreateResponse) => {
      if (response.status.statusCode === 'SUCCESS') {
        this.getFormControl(this.paymentForm, 'token').setValue(response.data.token);
      } else {
        this.getFormControl(this.paymentForm, 'token').setValue(null);
      }
    });

    if (requestOk) {
      this.isCheckingCardData = false;
      this.cardCheckError = false;
    } else {
      this.cardCheckError = true;
    }
  }
}
