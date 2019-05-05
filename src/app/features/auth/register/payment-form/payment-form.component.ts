import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

import { FormsService } from '@services/forms.service';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.scss']
})
export class PaymentFormComponent {

  public readonly cardNumberMask = { mask: '0000 0000 0000 0000' };
  public readonly cvvMask = { mask: '000' };
  public readonly expMonthMask = {
    mask: Number,
    min: 1,
    max: 12,
  };
  public readonly expYearMask = {
    mask: Number,
    min: 19,
    max: 30,
  };

  @Input() paymentForm: FormGroup;
  @Input() isCheckingCardData: boolean;
  @Input() cardCheckError: boolean;
  @Output() checkCardData = new EventEmitter<void>();

  constructor(
    private formsService: FormsService,
  ) { }

  get agreementField(): AbstractControl {
    return this.getFormControl(this.paymentForm, 'agreement');
  }

  public getFormControl(form: FormGroup, name: string): AbstractControl {
    return this.formsService.getFormControl(form, name);
  }

  public onSubmit(): void {
    this.checkCardData.emit();
  }
}
