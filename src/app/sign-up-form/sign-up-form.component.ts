import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss']
})
export class SignUpFormComponent implements OnInit {

  public registerForm: FormGroup = new FormGroup({
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    pw1: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern('(?=.*[a-z])(?=.*[A-Z]).*'), this.noNameValidator()]),
    pw2: new FormControl('', [Validators.required, this.repeatPasswordValidator()]),
  });

  ngOnInit(): void {
    
  }

  public getEmailErrorMessage(): string {
    if (this.registerForm.get('email')!.hasError('required')) {
      return 'Your e-mail is mandatory';
    }

    return this.registerForm.get('email')!.hasError('email') ? 'This is not a valid e-mail address' : '';
  }

  public getPwErrorMessage(): string {
    if (this.registerForm.get('pw1')!.hasError('required')) {
      return 'Please choose a password. It must contain small and capital letters, must not contain your name and must be at least 8 characters long.';
    }

    if (this.registerForm.get('pw1')!.hasError('minlength')) {
      return 'Your password must be at least 8 characters long.';
    }

    if (this.registerForm.get('pw1')!.hasError('pattern')) {
      return 'Your password must contain small and capital letters.';
    }

    if (this.registerForm.get('pw1')!.hasError('noName')) {
      return 'Your password must not contain your name.';
    }

    if (this.registerForm.get('pw2')!.hasError('noPwMatch')) {
      return 'The passwords do not match.';
    }

    return 'hase';
  }

  public validateAndSumit() {
    // as it might be possible to change the name after the validation of the password
    // has happened, revalidate that specific field on submit.
    this.registerForm.get('pw1')?.updateValueAndValidity();

    // validate the rest of the form just to make sure.
    this.registerForm.updateValueAndValidity();

    //submit the form if valid
    if (this.registerForm.valid) {
      
    }
  }  

  private noNameValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

      let error: ValidationErrors | null = null;

      if (this.registerForm) {
        const firstname = this.registerForm.get('firstname')!.value;
        const lastname = this.registerForm.get('lastname')!.value;

        if (firstname && control.value.includes(firstname)) {
          error = { noName: true };
        }

        if (lastname && control.value.includes(lastname)) {
          error = { noName: true };
        }
      }

      return error;
    }
  }

  private repeatPasswordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

      if (this.registerForm) {
        const pw = this.registerForm.get('pw1')!.value;

        return (this.registerForm.get('pw1')!.value !== control.value) ? { noPwMatch: true } : null;
      }

      return null;
    }
  }
}
