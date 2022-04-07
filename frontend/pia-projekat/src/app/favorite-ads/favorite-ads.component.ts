import { Component, OnInit } from '@angular/core';
import { AdvertisementService } from '../advertisement.service';
import { Advertisement } from '../models/advertisement';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-favorite-ads',
  templateUrl: './favorite-ads.component.html',
  styleUrls: ['./favorite-ads.component.css']
})
export class FavoriteAdsComponent implements OnInit {

  buyer : User;
  advertisements : Advertisement[];

  constructor(private uservice : UserService, private adservice : AdvertisementService) { }

  ngOnInit(): void {
    this.buyer = this.uservice.getLoggedUser();
    this.uservice.login(this.buyer.username, this.buyer.password).subscribe((user : User) => {
      this.uservice.loadLoggedUser(user);
      this.buyer = user;
      this.adservice.getFavorites(this.buyer.favoriteAds, this.buyer.favoriteAds.length).subscribe((advertisements : Advertisement[]) => {
        this.advertisements = advertisements;
      })
    })
  }

  deleteFromFavorites(advert) {
    this.buyer.favoriteAds = this.buyer.favoriteAds.filter((ad) => {
      if (ad == advert._id)
        return false;
      else
        return true;
    })
    this.uservice.loadLoggedUser(this.buyer);
    this.uservice.deleteFromFavorites(this.buyer, advert._id).subscribe((resp) => {
      this.adservice.getFavorites(this.buyer.favoriteAds, this.buyer.favoriteAds.length).subscribe((advertisements : Advertisement[]) => {
        this.advertisements = advertisements;
      })
    });
  }
}
