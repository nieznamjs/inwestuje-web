import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material';
import { Router } from '@angular/router';

import { FormsService } from '@services/utils/forms.service';
import { ACCOUNT_TYPES, AccountTypes } from '@constants/account-types';
import { ACCOUNT_ROLES } from '@constants/account-roles';
import { PayuTokenCreateResponse } from '@interfaces/payu/payu-token-create-response';
import { PayuDataService } from '@services/data-integration/payu-data.service';
import { AccountType } from '@interfaces/account-type.interface';
import { AccountRole } from '@interfaces/account-role.interface';
import { AuthDataService } from '@services/data-integration/auth-data.service';
import { SnackbarService } from '@services/utils/snackbar.service';
import { NIP_REQUIREMENT_REGEX_STRING, PASSWORD_REQUIREMENT_REGEX_STRING } from '@constants/regexes';
import { SnackbarMessages } from '@constants/snackbar-messages';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  @ViewChild('stepper', { static: true }) private stepper: MatStepper;

  public readonly rolesData: AccountRole[] = ACCOUNT_ROLES;
  public readonly accountTypes: AccountType[] = ACCOUNT_TYPES;

  public isCheckingCardData = false;
  public hasCardCheckError = false;
  public registerForm: FormGroup;
  public paymentForm: FormGroup;
  public cardDataToken: string;

  constructor(
    private fb: FormBuilder,
    private formsService: FormsService,
    private cd: ChangeDetectorRef,
    private payuService: PayuDataService,
    private authService: AuthDataService,
    private snackbarService: SnackbarService,
    private router: Router,
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

    this.payuService.setMerchantId();

    this.isCheckingCardData = true;
    this.hasCardCheckError = false;
    this.cardDataToken = null;

    this.payuService.createToken()
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
    const { email, password, roles, type, firstName, lastName, companyName, nip } = this.registerForm.value;
    const { cardNumber } = this.paymentForm.value;
    const rolesValues = roles.map((role: AccountRole) => role.value);

    this.authService.register({
      email, password, firstName, lastName, companyName,
      nip: parseInt(nip, 10),
      roles: rolesValues,
      type: type.value,
    }).subscribe(() => {
      this.snackbarService.showSuccess(SnackbarMessages.AccountCreated);
      this.router.navigate(['/login']);
    });
  }

  private createRegisterForm(): FormGroup {
    return this.fb.group({
      email: [ '', [ Validators.email, Validators.required ]],
      password: [ '', [
        Validators.required,
        Validators.pattern(PASSWORD_REQUIREMENT_REGEX_STRING),
      ]],
      confirmPassword: [ '', Validators.required ],
      roles: [ [ this.rolesData[0] ], Validators.required ],
      type: [ this.accountTypes[0] ],
      firstName: [ null, Validators.required ],
      lastName: [ null, Validators.required ],
      companyName: [ null, Validators.required ],
      nip: [ null, [ Validators.required, Validators.pattern(NIP_REQUIREMENT_REGEX_STRING) ]],
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
    this.formsService.disableFields(this.registerForm, [ 'companyName', 'nip' ]);

    this.getFormControl(this.registerForm, 'type').valueChanges
      .subscribe((accountType: AccountType) => {
        if (accountType.value === AccountTypes.Private) {
          this.formsService.enableFields(this.registerForm, [ 'firstName', 'lastName' ]);
          this.formsService.disableFields(this.registerForm, [ 'companyName', 'nip' ]);
        } else {
          this.formsService.enableFields(this.registerForm, [ 'companyName', 'nip' ]);
          this.formsService.disableFields(this.registerForm, [ 'firstName', 'lastName' ]);
        }
      });
  }
}
