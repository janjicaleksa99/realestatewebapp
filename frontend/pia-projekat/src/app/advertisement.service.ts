import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Advertisement } from './models/advertisement';

@Injectable({
  providedIn: 'root'
})
export class AdvertisementService {

  uri : String = 'http://localhost:4000';

  constructor(private http : HttpClient) { }

  search(searchCriteria) {
    return this.http.post(`${this.uri}/advertisement/search`, searchCriteria);
  }

  getFavorites(favoriteAds, length) {
    let data = {
      favoriteAds : favoriteAds,
      length : length
    }
    return this.http.post(`${this.uri}/advertisement/getFavoriteAds`, data);
  }

  getAllByDateDescending() {
    return this.http.get(`${this.uri}/advertisement/getAllByDateDesc`)
  }

  getAllForSalesMan (firstname, lastname, phone, type) {
    let data = {
      'firstname' : firstname,
      'lastname' : lastname,
      'phone' : phone,
      'type' : type
    }
    return this.http.post(`${this.uri}/advertisement/getAllForSalesMan`, data);
  }

  sellRealestate(advertisement : Advertisement) {
    let data = {
      'id' : advertisement._id
    }
    return this.http.post(`${this.uri}/advertisement/sellRealestate`, data);
  }

  updateAdvert(advertisement : Advertisement) {
    let data = {
      'advert' : advertisement
    }
    return this.http.post(`${this.uri}/advertisement/updateAdvert`, data);
  }

  addAdvert(ad : Advertisement) {
    let data = {
      'ad' : ad
    }
    return this.http.post(`${this.uri}/advertisement/addAdvert`, data);
  }

  getAll() {
    return this.http.get(`${this.uri}/advertisement/getAll`);
  }
}
