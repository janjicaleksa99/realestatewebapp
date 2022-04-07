import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private uservice : UserService) { }

  newUsers : User[];

  ngOnInit(): void {
    this.uservice.getAllForConfirmation().subscribe((users : User[]) => {
      this.newUsers = users;
    });
  }

  getDate(date : string) {
    return date.split("T")[0];
  }

  acceptUser(user) {
    this.uservice.acceptUser(user.username).subscribe((resp) => {
      this.uservice.getAllForConfirmation().subscribe((users : User[]) => {
        this.newUsers = users;
      });
    });
  }

  rejectUser(user) {
    this.uservice.rejectUser(user.username).subscribe((resp) => {
      this.uservice.getAllForConfirmation().subscribe((users : User[]) => {
        this.newUsers = users;
      });
    });
  }

}
