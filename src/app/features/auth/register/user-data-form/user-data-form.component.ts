import { Component, Input } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

import { FormsService } from '@services/forms.service';
import { AccountRole } from '@interfaces/account-role.interface';

@Component({
  selector: 'app-user-data-form',
  templateUrl: './user-data-form.component.html',
  styleUrls: ['./user-data-form.component.scss']
})
export class UserDataFormComponent {

  public readonly nipMask = { mask: '000-000-00-00' };
  @Input() registerForm: FormGroup;
  @Input() rolesData: AccountRole[];

  constructor(
    private formsService: FormsService,
  ) { }

  public getFormControl(form: FormGroup, name: string): AbstractControl {
    return this.formsService.getFormControl(form, name);
  }
}
