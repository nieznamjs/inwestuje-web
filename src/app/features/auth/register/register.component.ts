import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, Validators } from '@angular/forms';

import { FormsService } from '../../../core/services/forms.service';

interface RoleData {
  name: string;
  checked: boolean;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  public readonly rolesData: RoleData[] = [
    { name: 'Inwestor', checked: false },
    { name: 'Deal Maker', checked: false },
    { name: 'Sourcer', checked: false },
  ];

  public registerForm = this.fb.group({
    email: [ '', [ Validators.email, Validators.required ]],
    password: [ '', Validators.required ],
    confirmPassword: [ '', Validators.required ],
    roles: this.passRolesAsArray(),
    isCompany: [ false ],
    name: [ '', Validators.required ],
    lastName: [ '', Validators.required ],
    companyName: [ '', Validators.required ],
    nip: [ '', [ Validators.required, Validators.pattern('^[0-9]{10}$') ]],
  });

  constructor(
    private fb: FormBuilder,
    private formsService: FormsService,
  ) { }

  private passRolesAsArray(): FormArray {
    const roles = this.rolesData.map(role => {
      return this.fb.control(role.checked);
    });

    return this.fb.array(roles);
  }

  public getFormControl(name: string): AbstractControl {
    return this.formsService.getFormControl(this.registerForm, name);
  }

  public onSubmit(): void {
    const { email, password, confirmPassword, isCompany, roles } = this.registerForm.value;
    const rolesNames = roles.reduce((filteredRoles: string[], checked: boolean, i: number) => {
      if (checked) {
        filteredRoles.push(this.rolesData[i].name);
      }

      return filteredRoles;
    }, []);

    console.log(rolesNames);
  }
}
