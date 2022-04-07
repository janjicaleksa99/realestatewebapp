import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.css']
})
export class PasswordChangeComponent implements OnInit {

  constructor(private uservice : UserService, private router : Router) { }

  user : User;

  passChangeForm : FormGroup;
  usernameError : boolean = false;
  passwordError : boolean = false;
  wrongOldPassword : boolean = false;

  ngOnInit(): void {
    this.user = this.uservice.getLoggedUser();
    this.passChangeForm = new FormGroup({
      'oldPassword' : new FormControl(null, Validators.required),
      'password' : new FormControl(null, [Validators.required, Validators.pattern('^(?=.*?[A-Z])([a-zA-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-.]).{7,}$'), matchValidator('passwordConfirm', true)]),
      'passwordConfirm' : new FormControl(null, [Validators.required, matchValidator('password')])
    });
  }

  oldPassword : String;
  newPassword : String;
  error : String;

  passwordChange() {
    if (this.passChangeForm.invalid) {
      this.usernameError = true;
      this.passwordError = true;
    }
    else {
      this.uservice.passwordChange(this.user.username, this.oldPassword, this.newPassword).subscribe((response) => {
        if (response['message'] == 'wrong old password') {
          this.wrongOldPassword = true;
        }
        else {
          localStorage.removeItem("loggedUser");
          this.uservice.logout();
          this.router.navigate(['']);
        }
      })
    }
  }
}
