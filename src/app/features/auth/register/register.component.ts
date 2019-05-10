import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material';

import { environment } from '@env/environment';
import { FormsService } from '@services/forms.service';
import { ACCOUNT_TYPES, AccountTypes } from '@constants/account-types';
import { ACCOUNT_ROLES } from '@constants/account-roles';
import { AccountRoleOrType } from '@interfaces/account-role.interface';
import { PayuTokenCreateResponse } from '@interfaces/payu-token-create-response';

declare const OpenPayU; // to nie miejsce na to

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  public isCheckingCardData = false;
  public cardCheckError = false;
  public readonly rolesData: AccountRoleOrType[] = ACCOUNT_ROLES;
  public readonly accountTypes: AccountRoleOrType[] = ACCOUNT_TYPES;
  @ViewChild('stepper') private stepper: MatStepper;

  public registerForm = this.fb.group({
    email: [ '', [ Validators.email, Validators.required ]],
    password: [ '', Validators.required ],
    confirmPassword: [ '', Validators.required ],
    roles: [ [ this.rolesData[0] ], Validators.required ],
    accountType: [ this.accountTypes[0] ],
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
    // token: [ null, Validators.required ], // do usunięcia jak gadaliśmy
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
      .subscribe((accountType: AccountRoleOrType) => {
        if (accountType.value === AccountTypes.Private) {
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

    // if (this.paymentForm.invalid) {
    //   console.log(this.paymentForm)
    //   return;
    // }

    this.isCheckingCardData = true;
    this.cardCheckError = false;
    OpenPayU.merchantId = environment.payUMerchantId; // to chyba będziemy musieli jakoś wstrzykiwać

    // sprawdź czy nie ma oficjalnych types do tego payu gówna
    // a jak nie ma to napisz sam
    const isCardDataValid: boolean = OpenPayU.Token.create({}, (response: PayuTokenCreateResponse) => {
      if (response.status.statusCode !== 'SUCCESS') { // do stałej
        this.cardCheckError = true;
        this.getFormControl(this.paymentForm, 'token').setValue(null);

        return;
      }

      this.cardCheckError = false;
      this.getFormControl(this.paymentForm, 'token').setValue(response.data.token);
      this.isCheckingCardData = false;
    });

    if (isCardDataValid !== true) {
      this.cardCheckError = true;
    }
  }

  public register(): void {
    const { email, password, confirmPassword, accountType, roles } = this.registerForm.value;
  }
}
