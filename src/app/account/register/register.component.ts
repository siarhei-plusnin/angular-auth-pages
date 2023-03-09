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

  languageVariants: string[] = ['English', 'Russian', 'Chinese']

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      login: ['', [Validators.required, Validators.maxLength(25)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      phoneNumbers: this.formBuilder.array([]),
      languages: this.formBuilder.array([]),
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  get phoneNumbers(): FormArray<FormGroup> {
    return this.form.get('phoneNumbers') as FormArray;
  }

  get languages(): FormArray<FormGroup> {
    return this.form.get('languages') as FormArray;
  }

  newPhoneNumber(): FormGroup {
    return this.formBuilder.group({
      value: ['',[
        Validators.required,
        Validators.pattern(/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g)
      ]],
    });
  }

  addPhoneNumber() {
    this.phoneNumbers.push(this.newPhoneNumber());
  }

  deletePhoneNumber(index: number) {
    this.phoneNumbers.removeAt(index);
  }

  newLanguage(): FormGroup {
    return this.formBuilder.group({
      value: ['',[
        Validators.required
      ]],
    });
  }

  addLanguage() {
    this.languages.push(this.newLanguage());
  }

  deleteLanguage(index: number) {
    this.languages.removeAt(index);
  }

  changeLang(e: any, item: any) {
    item.controls["value"].setValue(e.target.value, {
      onlySelf: true
    })
  }

  onSubmit(): void {
    this.submitted = true;
    this.form.markAllAsTouched();
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
