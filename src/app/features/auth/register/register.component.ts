import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material';

import { environment } from '@env/environment';
import { FormsService } from '@services/utils/forms.service';
import { ACCOUNT_TYPES, AccountTypes } from '@constants/account-types';
import { ACCOUNT_ROLES } from '@constants/account-roles';
import { AccountRoleOrType } from '@interfaces/account-role.interface';
import { PayuTokenCreateResponse } from '@interfaces/payu/payu-token-create-response';
import { PayUService } from '@services/data-integration/payu.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  @ViewChild('stepper') private stepper: MatStepper;

  public readonly rolesData = ACCOUNT_ROLES;
  public readonly accountTypes = ACCOUNT_TYPES;

  public isCheckingCardData = false;
  public hasCardCheckError = false;
  public registerForm: FormGroup;
  public paymentForm: FormGroup;
  public cardDataToken: string;

  constructor(
    private fb: FormBuilder,
    private formsService: FormsService,
    private cd: ChangeDetectorRef,
    private payUService: PayUService,
  ) { }

  public ngOnInit(): void {
    this.registerForm = this.createRegisterForm();
    this.paymentForm = this.createPaymentForm();

    this.togglePrivateAndCompanyFields();
  }

  public getFormControl(form: FormGroup, name: string): AbstractControl {
    return this.formsService.getFormControl(form, name);
  }

  public onSubmitCardData(): void {
    this.getFormControl(this.paymentForm, 'agreement').markAsDirty();

    // to chyba będziemy musieli jakoś wstrzykiwać
    // i powinno tutaj trafić z jakiegoś config serwisu
    this.payUService.setMerchantId(environment.payUMerchantId);

    this.isCheckingCardData = true;
    this.hasCardCheckError = false;
    this.cardDataToken = null;

    this.payUService.createToken()
      .subscribe((response: PayuTokenCreateResponse) => {
        this.isCheckingCardData = false;

        this.cardDataToken = response.data.token;

        if (this.paymentForm.valid && this.cardDataToken) {
          this.stepper.next();
        }

        this.cd.detectChanges();
      }, () => {
        this.hasCardCheckError = true;
        this.isCheckingCardData = false;
        this.cd.detectChanges();
      });
  }

  public register(): void {
    console.log('REGISTERING - Implement me');
  }

  private createRegisterForm(): FormGroup {
    return this.fb.group({
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
  }

  private createPaymentForm(): FormGroup {
    return this.fb.group({
      cardNumber: [ '', [ Validators.required, Validators.pattern('^[0-9]{16}$') ]],
      cvv: [ '', [ Validators.required, Validators.pattern('^[0-9]{3}$') ]],
      expMonth: [ '', [ Validators.required, Validators.min(1), Validators.max(12) ]],
      expYear: [ '', [ Validators.required, Validators.min(19), Validators.max(50) ]],
      agreement: [ null, Validators.requiredTrue ],
    });
  }

  private togglePrivateAndCompanyFields(): void {
    const nameField = this.getFormControl(this.registerForm, 'name');
    const lastNameField = this.getFormControl(this.registerForm, 'lastName');
    const companyNameField = this.getFormControl(this.registerForm, 'companyName');
    const nipField = this.getFormControl(this.registerForm, 'nip');

    this.formsService.disableFields([ companyNameField, nipField ]);

    this.getFormControl(this.registerForm, 'accountType').valueChanges
      .subscribe((accountType: AccountRoleOrType) => {
        if (accountType.value === AccountTypes.Private) {
          this.formsService.enableFields([ nameField, lastNameField ]);
          this.formsService.disableFields([ companyNameField, nipField ]);
        } else {
          this.formsService.enableFields([ companyNameField, nipField ]);
          this.formsService.disableFields([ nameField, lastNameField ]);
        }
      });
  }
}
