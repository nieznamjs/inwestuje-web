import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material';

import { FormsService } from '@services/forms.service';
import { AccountTypes } from '@constants/account-types';
import { ACCOUNT_ROLES } from '@constants/account-roles';
import { AccountRole } from '@interfaces/account-role.interface';
import { PAYU_MERCHANT_ID } from '@constants/payu-constants';
import { PayuTokenCreateResponse } from '@interfaces/payu-token-create-response';

declare const OpenPayU;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public isCheckingCardData = false;
  public cardCheckError = false;
  public readonly rolesData: AccountRole[] = ACCOUNT_ROLES;
  @ViewChild(MatStepper) stepper: MatStepper;

  public registerForm = this.fb.group({
    email: [ '', [ Validators.email, Validators.required ]],
    password: [ '', Validators.required ],
    confirmPassword: [ '', Validators.required ],
    roles: [ this.rolesData[0], Validators.required ],
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

    this.isCheckingCardData = false;
    this.cardCheckError = !requestOk;
  }

  public onSubmit(): void {
    const { email, password, confirmPassword, isCompany, roles } = this.registerForm.value;
  }
}
