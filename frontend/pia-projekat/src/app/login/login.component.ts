import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdvertisementService } from '../advertisement.service';
import { Advertisement } from '../models/advertisement';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private uservice : UserService, private aservice : AdvertisementService, private router : Router) { }

  loginForm : FormGroup;
  usernameError : boolean = false;
  passwordError : boolean = false;

  latestAdverts : Advertisement[];

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'username' : new FormControl(null, Validators.required),
      'password' : new FormControl(null, [Validators.required, Validators.minLength(4)])
    });
    this.aservice.getAllByDateDescending().subscribe((latestAdverts : Advertisement[]) => {
      this.latestAdverts = latestAdverts;
      for (let i = 0; i < this.latestAdverts.length; i++) {
        this.latestAdverts[i].Realestate.RandPic = this.getRandomInt(0, this.latestAdverts[i].Realestate.Pictures.length);
      }
    });
  }

  username : String;
  password : String;
  error : String;

  invalidCredentials : boolean = false;

  login() {
    if (this.loginForm.invalid) {
      this.usernameError = true;
      this.passwordError = true;
    }
    else {
      this.uservice.login(this.username, this.password).subscribe((user : User) => {
        if (user) {
          this.uservice.loadLoggedUser(user);
          if (user.type == 'kupac')
            this.router.navigate(['/kupac']);
          else if (user.type == 'prodavac')
            this.router.navigate(['/uneseneNekretnine']);
          else if (user.type == 'agent')
            this.router.navigate(['/uneseneNekretnine']);
          else if (user.type == 'admin')
            this.router.navigate(['/admin']);
        }
        else {
          this.invalidCredentials = true;
        }
      });
    }
  }

  getRandomInt(min, max) {
    let randNum = Math.random();
    let picInd = Math.floor(randNum * max);
    return picInd;
  }

  getRandImage(advert : Advertisement) {
    return advert.Realestate.Pictures[advert.Realestate.RandPic];
  }

  registerPage() {
    this.router.navigate(['/register']);
  }

}
