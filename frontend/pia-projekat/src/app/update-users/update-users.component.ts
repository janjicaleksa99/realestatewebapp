import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../user.service';


@Component({
  selector: 'app-update-users',
  templateUrl: './update-users.component.html',
  styleUrls: ['./update-users.component.css']
})
export class UpdateUsersComponent implements OnInit {

  users : User[];

  city : String;
  contact : number;
  email : String;

  editForm : FormGroup;
  
  emailAlreadyExists : boolean = false;
  contactError : boolean = false;
  emailError : boolean = false;

  constructor(private uservice : UserService, private router : Router) { }

  ngOnInit(): void {
    this.editForm = new FormGroup({
      'city' : new FormControl(null, null),
      'contact' : new FormControl(null, Validators.pattern('^[0-9]*$')),
      'email' : new FormControl(null, Validators.email)
    });

    this.uservice.getAll().subscribe((users : User[]) => {
      this.users = users;
    });
  }

  getDate(date : string) {
    return date.split("T")[0];
  }

  deleteUser(user) {
    this.uservice.deleteUser(user.username).subscribe((resp) => {
      this.uservice.getAll().subscribe((users : User[]) => {
        this.users = users;
      });
    })
  }

  edit(user) {
    localStorage.setItem("editUser", JSON.stringify(user));
  }

  saveChanges() {
    let user = JSON.parse(localStorage.getItem("editUser"));
    if (user.type != 'agent') {
      this.editForm.removeControl('license');
      this.editForm.removeControl('agency');
    }

    if (this.editForm.invalid) {
      this.contactError = true;
      this.emailError = true;
    }
    else {
      this.uservice.editUser(user.username, this.city, this.contact, this.email).subscribe((resp) => {
        if (resp['message'] == 'emailExists')
          this.emailAlreadyExists = true;
        else {
          // uspesno sacuvani
        }
      });
    }
  }
}
