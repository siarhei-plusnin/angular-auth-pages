import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  submitted = false;

  phoneNumberValidators = [
    Validators.required,
    Validators.pattern(/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g)
  ];

  languageValidators = [Validators.required];

  languageVariants: any = ['English', 'Russian', 'Chinese']

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      login: ['', [Validators.required, Validators.maxLength(25)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      phoneNumber: [],
      phoneNumberArray: this.formBuilder.array([]),
      language: [],
      languageArray: this.formBuilder.array([]),
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  get phoneNumbersValues(): string[] {
    return this.phoneNumbers.controls.map((number) => {
      let phoneNumbersFormGroup = number as FormGroup;
      return phoneNumbersFormGroup.controls['value'].value;
    });
  }

  get phoneNumbers(): FormArray<FormGroup> {
    return this.form.get('phoneNumberArray') as FormArray<FormGroup>;
  }

  get languagesValues(): string[] {
    return this.languages.controls.map((lang) => {
      let langFormGroup = lang as FormGroup;
      return langFormGroup.controls['value'].value;
    });
  }

  get languages(): FormArray<FormGroup> {
    return this.form.get('languageArray') as FormArray<FormGroup>;
  }

  newPhoneNumber(): FormGroup {
    return this.formBuilder.group({
      value: '',
    });
  }

  addPhoneNumber() {
    this.addPhoneNumberValidators();
    this.form.controls['phoneNumber'].markAsTouched();

    if (!this.form.controls['phoneNumber'].valid) {
      return;
    }

    this.phoneNumbers.push(this.newPhoneNumber());
    let phoneNumber = this.phoneNumbers.length - 1;
    this.phoneNumbers.controls[phoneNumber]
      .get('value')
      .setValue(this.form.get('phoneNumber').value);
  }

  deletePhoneNumber(index: number) {
    this.phoneNumbers.removeAt(index);
  }

  removePhoneNumberValidators() {
    this.form.controls['phoneNumber'].removeValidators(
      this.phoneNumberValidators
    );
    this.form.controls['phoneNumber'].updateValueAndValidity();
  }

  addPhoneNumberValidators() {
    this.form.controls['phoneNumber'].addValidators(this.phoneNumberValidators);
    this.form.controls['phoneNumber'].updateValueAndValidity();
  }

  newLanguage(): FormGroup {
    return this.formBuilder.group({
      value: '',
    });
  }

  addLanguage() {
    this.addlanguageValidators();
    this.form.controls['language'].markAsTouched();

    if (!this.form.controls['language'].valid) {
      return;
    }

    this.languages.push(this.newLanguage());
    let lang = this.languages.length - 1;
    this.languages.controls[lang]
      .get('value')
      .setValue(this.form.get('language').value);
  }

  deleteLanguage(index: number) {
    this.languages.removeAt(index);
  }

  removelanguageValidators() {
    this.form.controls['language'].removeValidators(
      this.languageValidators
    );
    this.form.controls['language'].updateValueAndValidity();
  }

  addlanguageValidators() {
    this.form.controls['language'].addValidators(this.languageValidators);
    this.form.controls['language'].updateValueAndValidity();
  }

  changeLang(e) {
    this.language.setValue(e.target.value, {
      onlySelf: true
    })
  }

  get language() {
    return this.form.get('language');
  }

  onSubmit(): void {
    this.removelanguageValidators();
    this.removePhoneNumberValidators();

    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    console.log(JSON.stringify(this.form.value));
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }
}
