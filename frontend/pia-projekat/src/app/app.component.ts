import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pia-projekat';

  constructor (public uservice : UserService, public router : Router) {}

  logout() {
    this.uservice.logout();
    this.router.navigate(['/']);
  }

  loginHead() {
    if (this.uservice.getLoggedUser() == null)
      return true;
    else
      return false;
  }

  buyerHead() {
    if (this.uservice.getLoggedUser() != null) {
      if (this.uservice.getLoggedUser().type == 'kupac')
      return true;
    }
    return false;
  }

  adminHead() {
    if (this.uservice.getLoggedUser() != null) {
      if (this.uservice.getLoggedUser().type == 'admin')
      return true;
    }
    return false;
  }

  agentHead() {
    if (this.uservice.getLoggedUser() != null) {
      if (this.uservice.getLoggedUser().type == 'agent')
      return true;
    }
    return false;
  }

  salesmanHead() {
    if (this.uservice.getLoggedUser() != null) {
      if (this.uservice.getLoggedUser().type == 'prodavac')
      return true;
    }
    return false;
  }
}
