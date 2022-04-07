import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AgencyService } from '../agency.service';
import { Agency } from '../models/agency';
import { User } from '../models/user';
import { UserService } from '../user.service';

export function matchValidator(
  matchTo: string, 
  reverse?: boolean
): ValidatorFn {
  return (control: AbstractControl): 
  ValidationErrors | null => {
    if (control.parent && reverse) {
      const c = (control.parent?.controls as any)[matchTo] as AbstractControl;
      if (c) {
        c.updateValueAndValidity();
      }
      return null;
    }
    return !!control.parent &&
      !!control.parent.value &&
      control.value === 
      (control.parent?.controls as any)[matchTo].value
      ? null
      : { matching: true };
  };
}


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private uservice : UserService, public formBuilder : FormBuilder, private aservice : AgencyService,
    private router : Router) { }

  file : File;
  registerForm : FormGroup;
  siteKey : any;
  user : User = new User();
  fileName : String = '';
  pictureSizeOk : boolean = true;
  pictureFormatOk : boolean = true;
  imageSrc : String = '';
  userAlreadyExists : boolean = false;
  emailAlreadyExists : boolean = false;

  agencies : Agency[];

  nameError : boolean = false;
  surnameError : boolean = false;
  usernameError : boolean = false;
  passwordError : boolean = false;
  passwordConfirmError : boolean = false;
  cityError : boolean = false;
  dateError : boolean = false;
  contactError : boolean = false;
  emailError : boolean = false;
  typeError : boolean = false;
  agencyError : boolean = false;
  licenseError : boolean = false;
  pictureError : boolean = false;
  recaptchaError : boolean = false;

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      'name' : new FormControl(null, Validators.required),
      'surname' : new FormControl(null, Validators.required),
      'username' : new FormControl(null, Validators.required),
      'password' : new FormControl(null, [Validators.required, Validators.pattern('^(?=.*?[A-Z])([a-zA-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-.]).{7,}$'), matchValidator('passwordConfirm', true)]),
      'passwordConfirm' : new FormControl(null, [Validators.required, matchValidator('password')]),
      'city' : new FormControl(null, Validators.required),
      'date' : new FormControl(null, Validators.required),
      'contact' : new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*$')]),
      'email' : new FormControl(null, [Validators.required, Validators.email]),
      'type' : new FormControl(null, Validators.required),
      'agency' : new FormControl(null, Validators.required),
      'license' : new FormControl(null, Validators.required),
      'picture' : new FormControl(null, Validators.required),
      'recaptcha' : new FormControl(null, Validators.required)
    });
    this.siteKey = '6LfPy3IeAAAAADFkN99FjIDxFjTcYecC-CTdH2ib';

    this.aservice.getAll().subscribe((agencies : Agency[]) => {
      this.agencies = agencies;
    });

    this.user.status= 'novi';
  }

  onFileSelected(event) {

    this.file = event.target.files[0];

    if (this.file) {
      const allowed_types = ['image/png', 'image/jpeg'];
      const max_height = 300;
      const max_width = 300;
      const min_height = 100;
      const min_width = 100;

      this.fileName = this.file.name;

      this.pictureError = false;
      if (this.file.type != allowed_types[0] && this.file.type != allowed_types[1]) {
        this.pictureFormatOk = false;
      }

      const reader = new FileReader();
      reader.onload = (e: any) => {
          const image = new Image();
          image.src = e.target.result;
          console.log(image.src);
          this.user.profileImage = image.src;
          image.onload = rs => {
              const img_height = rs.currentTarget['height'];
              const img_width = rs.currentTarget['width'];

              if (img_height < min_height || img_height > max_height || img_width < min_width || img_width > max_width) {
                this.pictureSizeOk = false;
              }
          };
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  }

  register() {
    if (this.user.type != 'agent') {
      this.registerForm.removeControl('license');
      this.registerForm.removeControl('agency');
    }

    if (this.registerForm.invalid) {
      this.usernameError = true;
      this.passwordError = true;
      this.nameError = true;
      this.surnameError = true;
      this.usernameError = true;
      this.passwordError = true;
      this.passwordConfirmError = true;
      this.cityError = true;
      this.dateError = true;
      this.contactError = true;
      this.emailError = true;
      this.typeError = true;
      this.agencyError = true;
      this.licenseError = true;
      this.pictureError = true;
      this.recaptchaError = true;
    }
    else {
      this.uservice.register(this.user).subscribe((resp) => {
        if (resp['message'] == 'usernameExists')
          this.userAlreadyExists = true;
        else if (resp['message'] == 'emailExists')
          this.emailAlreadyExists = true;
        else if (resp['message'] == 'usernameExistsemailExists') {
          this.userAlreadyExists = true;
          this.emailAlreadyExists = true;
        }
        else {
          this.router.navigate(['/']);
        }
      });
    }
  }
}
