import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdvertisementService } from '../advertisement.service';
import { LocationService } from '../location.service';
import { Advertisement } from '../models/advertisement';
import { City } from '../models/city';
import { Microlocation } from '../models/microlocation';
import { Municipality } from '../models/municipality';
import { Street } from '../models/street';
import { User } from '../models/user';
import { UserService } from '../user.service';
import { RealEstate } from '../models/real_estate'
import { AgencyService } from '../agency.service';
import { Agency } from '../models/agency';

@Component({
  selector: 'app-new-real-estate',
  templateUrl: './new-real-estate.component.html',
  styleUrls: ['./new-real-estate.component.css']
})
export class NewRealEstateComponent implements OnInit {

  cities : City[];
  municipalities : Municipality[];
  microlocs : Microlocation[];
  streets : Street[];
  lines : number[];

  file : File;
  fileName : String = '';

  realEstateForm : FormGroup;
  advertisements : Advertisement[];
  salesman : User;

  ad : Advertisement;
  characSelected : boolean[] = [];

  type : String;
  city : String;
  municipality : String;
  microloc : String;
  price : number;
  squareFoot : number;
  minNumOfRooms : Number;

  typeError : boolean = false;
  priceError : boolean = false;
  pictureError : boolean = false;

  fileNumberError : boolean = false;

  constructor(private uservice : UserService, private aservice : AdvertisementService, private lservice : LocationService, private agservice : AgencyService) { }

  ngOnInit(): void {
    for (let i = 0; i < 11; i++)
      this.characSelected.push(false);
    this.ad = new Advertisement();
    this.ad.Realestate = new RealEstate();
    this.ad.Realestate.Characteristics = [];
    this.ad.Realestate.Pictures = [];
    this.ad.Realestate.Lines = [];
    this.ad.Advertiser = [];
    this.salesman = this.uservice.getLoggedUser();
    this.aservice.getAllForSalesMan(this.salesman.name, this.salesman.surname, this.salesman.contact, this.salesman.type).subscribe((ads : Advertisement[]) => {
      this.advertisements = ads;
    })

    this.lservice.getAllMicroLocations().subscribe((microlocs : Microlocation[]) => {
      this.microlocs = microlocs;
    });

    this.lservice.getAllStreets().subscribe((streets : Street[]) => {
      this.streets = streets;
    });
    
    this.lservice.getAll().subscribe((data : any) => {
      this.cities = data.cities;
      this.municipalities = data.municipalities;
    });

    this.realEstateForm = new FormGroup({
      'name' : new FormControl(null, Validators.required),
      'type' : new FormControl(null, Validators.required),
      'city' : new FormControl(null, Validators.required),
      'municipality' : new FormControl(null, Validators.required),
      'microloc' : new FormControl(null, Validators.required),
      'street' : new FormControl(null, Validators.required),
      'lines' : new FormControl(null, Validators.required),
      'area' : new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*$')]),
      'rooms' : new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*$')]),
      'constructionYear' : new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*$')]),
      'state' : new FormControl(null, Validators.required),
      'heating' : new FormControl(null, Validators.required),
      'floor' : new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*$')]),
      'totalFloors' : new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*$')]),
      'parking' : new FormControl(null, Validators.required),
      'monthlyUtilities' : new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*$')]),
      'price' : new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*$')]),
      'about' : new FormControl(null, Validators.required),
      'picture' : new FormControl(null, Validators.required)
    });
  }

  getLines() {
    this.lservice.getAllLinesForMicroLoc(this.ad.Realestate.Microlocation).subscribe((lines : number[]) => {
      this.lines = lines;
    });
  }

  sell(ad : Advertisement) {
   ad.Realestate.Sold = "DA";
   this.aservice.sellRealestate(ad).subscribe(() => {

   });
  }

  onFileSelected(event) {

    console.log(event.target.files);
    if (event.target.files.length < 3 || event.target.files.length > 6) {
      this.fileNumberError = true;
    }
    else
      this.fileNumberError = false;

    this.ad.Realestate.Pictures.splice(0, this.ad.Realestate.Pictures.length);
    for (let i = 0; i < event.target.files.length; i++) {
      this.file = event.target.files[0];

      if (this.file) {
        const allowed_types = ['image/png', 'image/jpeg'];
        const max_height = 300;
        const max_width = 300;
        const min_height = 100;
        const min_width = 100;

        this.fileName = this.file.name;

        this.pictureError = false;

        const reader = new FileReader();
        reader.onload = (e: any) => {
            const image = new Image();
            image.src = e.target.result;
            //this.user.profileImage = image.src;
            this.ad.Realestate.Pictures.push(image.src);
            image.onload = rs => {
                const img_height = rs.currentTarget['height'];
                const img_width = rs.currentTarget['width'];
            };
        };

        reader.readAsDataURL(event.target.files[0]);
    }
  }
}

  addCharac(characteristic : string, num : number) {
    if (this.characSelected[num] == false) {
      this.ad.Realestate.Characteristics.push(characteristic);
      this.characSelected[num] = true;
    }
    else {
      this.ad.Realestate.Characteristics = this.ad.Realestate.Characteristics.filter((elem) => {
        if (elem == characteristic)
        return false;
        else
        return true;
      })
      this.characSelected[num] = false;
    }
    console.log(this.ad.Realestate.Characteristics);
  }

  addAd() {
    this.ad.Realestate.Sold = "NE";
    if (this.realEstateForm.invalid) {
      this.typeError = true;
      this.pictureError = true;
    }
    else {
      if (this.salesman.type == 'agent') {
        this.agservice.getUserAgency(this.salesman.agency).subscribe((agency : Agency) => {
          this.ad.Advertiser.push(agency);
          let agent = {
            'FirstName' : this.salesman.name,
            'LastName' : this.salesman.surname,
            'Phone' : this.salesman.contact
          }
          this.ad.LastEdited = "0";
          let date : Date = new Date();
          this.ad.Realestate.PublishDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
          this.ad.Advertiser.push(agent);
          this.aservice.addAdvert(this.ad).subscribe((resp) => {
            window.location.reload();
          });
        });
      }
      else if (this.salesman.type == 'prodavac') {
        let prodavac = {
          'FirstName' : this.salesman.name,
          'LastName' : this.salesman.surname,
          'Phone' : this.salesman.contact
        }
        this.ad.LastEdited = "0";
        let date : Date = new Date();
        this.ad.Realestate.PublishDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
        this.ad.Advertiser.push(prodavac);
        this.aservice.addAdvert(this.ad).subscribe((resp) => {
          window.location.reload();
        });
      }
    }
  }
}
