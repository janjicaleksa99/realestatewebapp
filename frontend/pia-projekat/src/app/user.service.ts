import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  uri : String = 'http://localhost:4000';

  loggedUser : User;

  constructor(private http : HttpClient) { }

  loadLoggedUser(user) {
    if (localStorage.getItem("loggedUser") != null)
      localStorage.removeItem("loggedUser");
    localStorage.setItem("loggedUser", JSON.stringify(user));
    this.loggedUser = user;
  }

  logout() {
    if (localStorage.getItem("loggedUser") != null)
      localStorage.removeItem("loggedUser");
    this.loggedUser = null;
  }

  getLoggedUser() {
    if (this.loggedUser == null) {
      this.loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
    }
    return this.loggedUser;
  }

  login(username, password) {
    let data = {
      'username' : username,
      'password' : password
    }
    return this.http.post(`${this.uri}/user/login`, data);
  }

  register(user) {
    let data = {
        'user' : user,
    }
    return this.http.post(`${this.uri}/user/register`, data);
  }

  addToFavorites(user, adID) {
    let data = {
      'username' : user.username,
      'adID' : adID
    }
    return this.http.post(`${this.uri}/user/addAdForBuyer`, data);
  }

  deleteFromFavorites(user, adID) {
    let data = {
      'username' : user.username,
      'adID' : adID
    }
    return this.http.post(`${this.uri}/user/removeAdForBuyer`, data);
  }

  getAllForConfirmation() {
    return this.http.get(`${this.uri}/user/getAllForConfirmation`);
  }

  getAll() {
    return this.http.get(`${this.uri}/user/getAll`);
  }

  acceptUser(username) {
    return this.http.get(`${this.uri}/user/acceptUser?username=${username}`);
  }

  rejectUser(username) {
    return this.http.get(`${this.uri}/user/rejectUser?username=${username}`);
  }

  deleteUser(username) {
    return this.http.get(`${this.uri}/user/deleteUser?username=${username}`);
  }

  editUser(username, city, contact, email) {
    let data = {
      'username' : username,
      'city' : city,
      'contact' : contact,
      'email' : email
    }
    data = JSON.parse(JSON.stringify(data));
    if (data['city'] == '')
      delete data['city'];
    if (data['contact'] == '')
      delete data['contact'];
    if (data['email'] == '')
      delete data['email'];
    
    return this.http.post(`${this.uri}/user/editUser`, data);
  }

  passwordChange(username, oldPassword, newPassword) {
    let data = {
      'username' : username,
      'oldPassword' : oldPassword,
      'newPassword' : newPassword
    }
    return this.http.post(`${this.uri}/user/passwordChange`, data);
  }

  updateSalesman(user) {
    let data = {
      'salesman' : user
    }
    return this.http.post(`${this.uri}/user/updateSalesman`, data);
  }
}
