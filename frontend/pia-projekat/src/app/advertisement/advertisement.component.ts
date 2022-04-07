import { Component, OnInit } from '@angular/core';
import { Advertisement } from '../models/advertisement';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-advertisement',
  templateUrl: './advertisement.component.html',
  styleUrls: ['./advertisement.component.css']
})
export class AdvertisementComponent implements OnInit {

  advertisement : Advertisement;
  advertiser : string;
  contactRequest : boolean = false;
  averagePrice : number;
  alreadyInFav : boolean = false;
  user : User;

  constructor(private uservice : UserService) { }

  ngOnInit(): void {
    this.advertisement = JSON.parse(localStorage.getItem("advertisement"));
    console.log(this.advertisement);
    this.averagePrice = parseFloat(localStorage.getItem("averagePrice"));
    this.user = this.uservice.getLoggedUser();
    this.uservice.login(this.user.username, this.user.password).subscribe((user : User) => {
      this.user = user;
    });
  }

  checkFor(characteristic) {
    let char = this.advertisement.Realestate.Characteristics.find((elem) => {
      if (elem == characteristic)
      return true;
      else return false;
    })
    if (char != null)
    return true;
    else return false;
  }

  avgPrice() {
    return localStorage.getItem("averagePrice");
  }

  showContact() {
    if (this.advertisement.Advertiser.length == 2) {
      // agencija
      this.advertiser = 'agencija';
    }
    else {
      // samostalni prodavac
      this.advertiser = 'prodavac';
    }
  }

  showPhone() {
    this.contactRequest = true;
  }

  priceRed() {
    if (this.advertisement.Realestate.Price / this.advertisement.Realestate.Area <= this.averagePrice)
      return false;
    else return true;
  }

  priceGreen() {
    if (this.advertisement.Realestate.Price / this.advertisement.Realestate.Area <= this.averagePrice)
      return true;
    else return false;
  }

  addToFavorites() {
    if (this.favorite()) {
      alert("Nekretnina je vec dodat medju omiljene");
    }
    else if (this.user.favoriteAds.length >= 5) {
      alert("Prekoracili ste broj omiljenih nekretnina");
    }
    else {
      this.uservice.addToFavorites(this.uservice.getLoggedUser(), this.advertisement._id).subscribe((resp) => {
        this.alreadyInFav = true;
        alert("Nekretnina uspesno dodata u omiljene");
      });
    }
  }

  favorite() {
    let isFavorite = false;
    for (let i = 0; i < this.user.favoriteAds.length; i++) {
      if (this.user.favoriteAds[i] == this.advertisement._id) {
        isFavorite = true;
        break;
      }
    }
    if (isFavorite == true || this.alreadyInFav == true) {
      return true
    }
    else 
      return false;
  }
}
