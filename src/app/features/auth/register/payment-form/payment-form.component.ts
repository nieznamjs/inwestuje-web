import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

import { FormsService } from '@services/utils/forms.service';

@Component({
  selector: 'iw-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.scss']
})
export class PaymentFormComponent {
  @Input() public paymentForm: FormGroup;
  @Input() public isCheckingCardData: boolean;
  @Input() public hasCardCheckError: boolean;
  @Output() public formSubmit = new EventEmitter<void>();

  public readonly cardNumberMask = { mask: '0000 0000 0000 0000' };
  public readonly cvvMask = { mask: '000' };
  public readonly expMonthMask = { mask: Number, min: 1, max: 12 };
  public readonly expYearMask = { mask: Number, min: 19, max: 30 };

  constructor(
    private formsService: FormsService,
  ) { }

  public get agreementField(): AbstractControl {
    return this.getFormControl(this.paymentForm, 'agreement');
  }

  public getFormControl(form: FormGroup, name: string): AbstractControl {
    return this.formsService.getFormControl(form, name);
  }

  public onSubmit(): void {
    this.getFormControl(this.paymentForm, 'agreement').markAsDirty();

    if (this.paymentForm.invalid) { return; }

    this.formSubmit.emit();
  }
}
