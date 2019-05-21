import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FormsService } from '@services/utils/forms.service';

describe('FormsService', () => {
  const fb = new FormBuilder();

  let service: FormsService;
  let form: FormGroup;

  beforeEach(() => {
    service = new FormsService();

    form = fb.group({
      name: [ 'Grzegorz', Validators.required ],
      lastName: [ null ],
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getFormControl should return proper FormControl', () => {
    expect(service.getFormControl(form, 'name')).toEqual(form.get('name'));

    expect(service.getFormControl(form, 'name').value).toEqual('Grzegorz');
  });

  it('enableField should enable fields', () => {
    service.enableFields(form, [ 'name', 'lastName' ]);

    expect(form.get('name').enabled).toBeTruthy();
    expect(form.get('lastName').enabled).toBeTruthy();
  });

  it('disableField should disable fields', () => {
    service.disableFields(form, [ 'name', 'lastName' ]);

    expect(form.get('name').disabled).toBeTruthy();
    expect(form.get('lastName').disabled).toBeTruthy();
  });
});
