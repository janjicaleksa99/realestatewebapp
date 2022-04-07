import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdvertisementService } from '../advertisement.service';
import { Advertisement } from '../models/advertisement';

@Component({
  selector: 'app-kupac',
  templateUrl: './kupac.component.html',
  styleUrls: ['./kupac.component.css']
})
export class KupacComponent implements OnInit {

  searchForm : FormGroup;

  page = 1;
  count = 0;
  tableSize = 7;
  tableSizes = [3, 6, 9, 12];

  type : String;
  city : String;
  municipality : String;
  microloc : String;
  price;
  squareFoot;
  minNumOfRooms : Number;

  advertisements : Advertisement[];

  typeError : boolean = false;
  priceError : boolean = false;
  squareFootError : boolean = false;

  constructor(private adservice : AdvertisementService, private router : Router) { }

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      'type' : new FormControl(null, Validators.required),
      'city' : new FormControl(null, null),
      'municipality' : new FormControl(null, null),
      'microloc' : new FormControl(null, null),
      'minNumOfRooms' : new FormControl(null, null),
      'price' : new FormControl(null, Validators.pattern('^[0-9]*$')),
      'squareFoot' : new FormControl(null, Validators.pattern('^[0-9]*$'))
    });
  }

  search() {
    if (this.searchForm.invalid) {
      this.typeError = true;
      this.priceError = true;
      this.squareFootError = true;
    }
    else {
      let searchCriteria = {
        'Realestate.Type' : this.type,
        'Realestate.City' : this.city,
        'Realestate.Municipality' : this.municipality,
        'Realestate.Microlocation' : this.microloc,
      }
      searchCriteria = JSON.parse(JSON.stringify(searchCriteria));
      if (searchCriteria['Realestate.City'] == '')
        delete searchCriteria['Realestate.City'];
      if (searchCriteria['Realestate.Municipality'] == '')
        delete searchCriteria['Realestate.Municipality'];
      if (searchCriteria['Realestate.Microlocation'] == '')
        delete searchCriteria['Realestate.Microlocation'];

      this.adservice.search(searchCriteria).subscribe((advertisements : Advertisement[]) => {
        this.advertisements = advertisements.filter((advert : Advertisement) => {
          if (advert.Realestate.Price > this.price && this.price != "")
            return false;
          if (advert.Realestate.Area < this.squareFoot && this.squareFoot != "")
            return false;
          if (advert.Realestate.Rooms < this.minNumOfRooms)
            return false;
          else
            return true;
        })
      });
    }
  }

  onTableDataChange(event){
    this.page = event;
  }  
  onTableSizeChange(event): void {
    this.tableSize = event.target.value;
    this.page = 1;
  } 
  
  averagePrice(type, microloc) {
    let sum = 0;
    let num = 0;
    for (let i = 0; i < this.advertisements.length; i++) {
      if (this.advertisements[i].Realestate.Type == type && this.advertisements[i].Realestate
        .Microlocation == microloc) {
          sum = sum + this.advertisements[i].Realestate.Price / this.advertisements[i].Realestate.Area;
          num = num + 1;
        }
    }
    return (sum / this.advertisements.length).toFixed(2);
  }

  openAd(advertisement : Advertisement) {
    let avgPrice = this.averagePrice(advertisement.Realestate.Type, advertisement.Realestate.Microlocation);
    localStorage.setItem("averagePrice", avgPrice);
    localStorage.setItem("advertisement", JSON.stringify(advertisement));
    this.router.navigate(['/oglas']);
  }
}
