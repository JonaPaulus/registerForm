import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SignUpFormComponent } from './sign-up-form.component';

describe('SignUpFormComponent', () => {
  let component: SignUpFormComponent;
  let fixture: ComponentFixture<SignUpFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule],
      declarations: [ SignUpFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be invalid on init', () => {
    expect(component.registerForm.valid).toBeFalsy();
  });

  it('should have all fields to be set to required', () => {
    Object.keys(component.registerForm.controls).forEach(key => {
      const errors = component.registerForm.controls[key].errors;
      expect(errors!['required']).toBeTruthy();
    });
  });

  it('should be invalid on wrong email format', () => {
    const validEmails = [
      'a@b.cd',
      'abc-abc.abc@abc-abc.uk.co'
    ];

    const invalidEmails = [
      'jan ree',
      'whatever-domain.nl'
    ];

    validEmails.forEach(mail => {
      component.registerForm.controls['email'].patchValue(mail);
      const errors = component.registerForm.controls['email'].errors;
      expect(errors).toBeNull();
    });

    invalidEmails.forEach(mail => {
      component.registerForm.controls['email'].patchValue(mail);
      const errors = component.registerForm.controls['email'].errors;
      expect(errors!['email']).toBeTruthy();
    });
  });

  it('should be invalid on wrong password format', () => {
    component.registerForm.controls['firstName'].patchValue('Jona');
    component.registerForm.controls['lastName'].patchValue('Pauw');

    const validPasswords = [
      'aaaaAAAA',
      '11aa$$AA',
      'aaaaaaaaaaaaaaaaAAAAAAAAAAAAAAAA'
    ];

    const invalidPasswords = [
      [ 'aaaaaaaa', 'pattern'],
      [ 'AAAAAAAA', 'pattern'],
      [ 'aaaAAA', 'minlength'],
      [ 'jonapauw', 'noName'],
      [ 'JonaPauw', 'noName'],
      [ 'JONAPAUW', 'noName'],
      [ 'aaaaJona', 'noName'],
      [ 'aaaaPauw', 'noName']
    ];

    validPasswords.forEach(pwd => {
      component.registerForm.controls['pw1'].patchValue(pwd);
      const errors = component.registerForm.controls['pw1'].errors;
      expect(errors).toBeNull();
    });

    invalidPasswords.forEach(pwd => {
      component.registerForm.controls['pw1'].patchValue(pwd[0]);
      const errors = component.registerForm.controls['pw1'].errors;
      expect(errors![pwd[1]]).not.toBeUndefined();
    });
  });

  it('should be invalid if pw repeat is not identical with password', () => {
    component.registerForm.controls['pw1'].patchValue('abcdABCD123$');

    const invalidPasswords = [
      'jan ree',
      ' abcdABCD123$',
      'abcdABCD123$ ',
      'abcdABCD123',
      'abcdabcd123$',
    ];

    invalidPasswords.forEach(pwd => {
      component.registerForm.controls['pw2'].patchValue(pwd);
      const errors = component.registerForm.controls['pw2'].errors;
      expect(errors!['noPwMatch']).toBeTruthy();
    });
  });

  it('should be valid if pw and pw repeat match', () => {
    component.registerForm.controls['pw1'].patchValue('abcdABCD123$');
    component.registerForm.controls['pw2'].patchValue('abcdABCD123$');

    const errors = component.registerForm.controls['pw2'].errors;
    expect(errors).toBeNull();
  });

});
