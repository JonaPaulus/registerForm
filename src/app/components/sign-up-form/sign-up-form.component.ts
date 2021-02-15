import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators, ValidatorFn } from '@angular/forms';
import { UserApiService } from '@api/user.service';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss']
})
export class SignUpFormComponent implements OnInit {

  public showRegistrationForm: boolean = true;
  public showRegistrationSuccessMessage: boolean = false;
  public showRegistrationFailureMessage: boolean = false;

  public registerForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    pw1: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern('(?=.*[a-z])(?=.*[A-Z]).*'), this.noNameValidator()]),
    pw2: new FormControl('', [Validators.required, this.repeatPasswordValidator()]),
  });

  constructor(
    private userApiService: UserApiService
  ) { }

  ngOnInit(): void { }

  public getEmailErrorMessage(): string {
    if (this.registerForm.get('email')!.hasError('required')) {
      return 'Your e-mail is mandatory';
    }

    return this.registerForm.get('email')!.hasError('email') ? 'This is not a valid e-mail address' : '';
  }

  public getPwErrorMessage(): string | null {
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

    return null;
  }

  public validateAndSumit(): void {
    // as it might be possible to change the name after the validation of the password
    // has happened, revalidate that specific field on submit.
    this.registerForm.get('pw1')?.updateValueAndValidity();

    // validate the rest of the form just to make sure.
    this.registerForm.updateValueAndValidity();

    // submit the form if valid
    if (this.registerForm.valid) {
      const formObj: any = this.registerForm.getRawValue();
      const serializedForm: string = JSON.stringify(formObj);

      this.userApiService.registerUser(serializedForm)
        .then((responseCode: number) => {
          if (responseCode === 200) {
            this.showRegistrationForm = false;
            this.showRegistrationSuccessMessage = true;
            this.showRegistrationFailureMessage = false;
          } else {
            this.showRegistrationForm = true;
            this.showRegistrationSuccessMessage = false;
            this.showRegistrationFailureMessage = true;
          }
        });
    }
  }

  /**
   * Validates if the first and last name are not part of the password.
   * Returns ValidatorError on match
   */
  private noNameValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

      let error: ValidationErrors | null = null;

      if (this.registerForm) {
        const firstName: string = this.registerForm.get('firstName')!.value;
        const lastName: string = this.registerForm.get('lastName')!.value;

        if (firstName && control.value.toLowerCase().includes(firstName.toLowerCase())) {
          error = { noName: true };
        }

        if (lastName && control.value.toLowerCase().includes(lastName.toLowerCase())) {
          error = { noName: true };
        }
      }

      return error;
    };
  }

  /**
   * Validates if the value of the repeat password field is identical to the input of the password field
   * Returns ValidatorError if not
   */
  private repeatPasswordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

      if (this.registerForm) {
        return (this.registerForm.get('pw1')!.value !== control.value) ? { noPwMatch: true } : null;
      }

      return null;
    };
  }
}
