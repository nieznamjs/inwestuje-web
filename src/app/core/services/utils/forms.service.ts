import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormsService {
  public getFormControl(form: FormGroup, name: string): AbstractControl {
    return form.get(name);
  }

  public disableFields(fields: AbstractControl[]): void {
    fields.forEach((field: AbstractControl) => {
      field.disable();
    });
  }

  public enableFields(fields: AbstractControl[]): void {
    fields.forEach((field: AbstractControl) => {
      field.enable();
    });
  }
}
