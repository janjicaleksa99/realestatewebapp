import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdvertisementService } from '../advertisement.service';
import { AgencyService } from '../agency.service';
import { Advertisement } from '../models/advertisement';
import { RealEstate } from '../models/real_estate';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-new-real-estate-json',
  templateUrl: './new-real-estate-json.component.html',
  styleUrls: ['./new-real-estate-json.component.css']
})
export class NewRealEstateJSONComponent implements OnInit {

  realEstateForm : FormGroup;

  typeError : boolean = false;
  priceError : boolean = false;
  squareFootError : boolean = false;
  fileFormatOk : boolean = true;
  fieldsError : boolean = false;

  fileName : string;
  pictureName: string;
  file;
  fileStr : string;
  pictureFile : File;

  step1Elem : boolean = true;
  step2Elem : boolean = false;
  step3Elem : boolean = false;

  step2En : boolean = false;
  step3En : boolean = false;

  salesman : User;

  pictureError : boolean = false;

  fileNumberError : boolean = false;

  constructor(private uservice : UserService, private aservice : AdvertisementService, private router : Router, private agservice : AgencyService) { }

  ngOnInit(): void {
    this.salesman = this.uservice.getLoggedUser();
    this.advert = new Advertisement();
    this.advert.Realestate = new RealEstate();
    this.advert.Realestate.Characteristics = [];
    this.advert.Realestate.Pictures = [];
    this.advert.Advertiser = [];
    this.realEstateForm = new FormGroup({
      'picture' : new FormControl(null, Validators.required)
    });
  }

  onPictureSelected(event) {

    if (event.target.files.length < 3 || event.target.files.length > 6) {
      this.fileNumberError = true;
    }
    else
      this.fileNumberError = false;

    this.advert.Realestate.Pictures.splice(0, this.advert.Realestate.Pictures.length);
    for (let i = 0; i < event.target.files.length; i++) {
      this.pictureFile = event.target.files[0];

      if (this.pictureFile) {
        const allowed_types = ['image/png', 'image/jpeg'];
        const max_height = 300;
        const max_width = 300;
        const min_height = 100;
        const min_width = 100;

        this.pictureName = this.pictureFile.name;

        this.pictureError = false;

        const reader = new FileReader();
        reader.onload = (e: any) => {
            const image = new Image();
            image.src = e.target.result;
            //this.user.profileImage = image.src;
            this.advert.Realestate.Pictures.push(image.src);
            image.onload = rs => {
                const img_height = rs.currentTarget['height'];
                const img_width = rs.currentTarget['width'];
            };
        };

        reader.readAsDataURL(event.target.files[0]);
    }
  }
}

  onFileSelected(event) {

    this.file = event.target.files[0];

    if (this.file) {
      this.advert = new Advertisement();
      this.advert.Realestate = new RealEstate();
      this.advert.Realestate.Characteristics = [];
      this.advert.Realestate.Pictures = [];
      this.advert.Advertiser = [];

      const allowed_types = ['application/json'];

      this.fileName = this.file.name;

      if (this.file.type != allowed_types[0]) {
        this.fileFormatOk = false;
      }
      else
        this.fileFormatOk = true;

      const fileReader = new FileReader();
      fileReader.readAsText(this.file, "UTF-8");
      fileReader.onload = () => {
        this.file = fileReader.result;
        if (this.fileFormatOk) {
          // prelazak na step 2
          this.step2En = true;
          this.step2();
        }
      }
      fileReader.onerror = (error) => {
        console.log(error);
      }
    }
  }

  checkFormat() {
    let ad = JSON.parse(this.file);
    let RealEstate : RealEstate = JSON.parse(JSON.stringify(ad["Realestate"]));
    let Advertiser : any[] = JSON.parse(JSON.stringify(ad["Advertiser"]));

    if (RealEstate.Name == null)
      this.fieldsError = true;
    if (RealEstate.Type == null)
      this.fieldsError = true;
    if (RealEstate.City == null)
    this.fieldsError = true;
    if (RealEstate.Municipality == null)
    this.fieldsError = true;
    if (RealEstate.Microlocation == null)
    this.fieldsError = true;
    if (RealEstate.Street == null)
    this.fieldsError = true;
    if (RealEstate.Lines == null)
    this.fieldsError = true;
    if (RealEstate.Area == null)
    this.fieldsError = true;
    if (RealEstate.Rooms == null)
    this.fieldsError = true;
    if (RealEstate.ConstructionYear == null)
    this.fieldsError = true;
    if (RealEstate.State == null)
    this.fieldsError = true;
    if (RealEstate.Heating == null)
    this.fieldsError = true;
    if (RealEstate.Floor == null)
    this.fieldsError = true;
    if (RealEstate.TotalFloors == null)
    this.fieldsError = true;
    if (RealEstate.MonthlyUtilities == null)
    this.fieldsError = true;
    if (RealEstate.Price == null)
    this.fieldsError = true;
    if (RealEstate.About == null)
    this.fieldsError = true;
    if (RealEstate.Characteristics == null)
    this.fieldsError = true;
    if (Advertiser == null)
    this.fieldsError = true;

    if (!this.fieldsError) {
      // prelazak na step 3
      this.step3En = true;
      this.step3();
    }
  }

  step1() {
    this.step1Elem = true;
    this.step2Elem = false;
    this.step3Elem = false;
  }

  step2() {
    if (this.step2En) {
      this.step1Elem = false;
      this.step2Elem = true;
      this.step3Elem = false;
    }
  }

  step3() {
    if (this.step3En) {
      this.step1Elem = false;
      this.step2Elem = false;
      this.step3Elem = true;
    }
  }

  advert : Advertisement;

  addAd() {
    this.advert.Realestate.Sold = "NE";
    if (this.realEstateForm.invalid || this.fileNumberError) {
      this.typeError = true;
      this.pictureError = true;
    }
    else {
      let ad = JSON.parse(this.file);
      let RealEstate : RealEstate = JSON.parse(JSON.stringify(ad["Realestate"]));
      let Advertiser : any[] = JSON.parse(JSON.stringify(ad["Advertiser"]));

      this.advert.Realestate.Name = RealEstate.Name;
      let date : Date = new Date();
      this.advert.Realestate.PublishDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
      this.advert.Realestate.Type = RealEstate.Type;
      this.advert.Realestate.City = RealEstate.City;
      this.advert.Realestate.Municipality = RealEstate.Municipality;
      this.advert.Realestate.Microlocation = RealEstate.Microlocation;
      this.advert.Realestate.Street = RealEstate.Street;
      this.advert.Realestate.Lines = RealEstate.Lines;
      this.advert.Realestate.Area = RealEstate.Area;
      this.advert.Realestate.Rooms = RealEstate.Rooms;
      this.advert.Realestate.ConstructionYear = RealEstate.ConstructionYear;
      this.advert.Realestate.State = RealEstate.State;
      this.advert.Realestate.Heating = RealEstate.Heating;
      this.advert.Realestate.Floor = RealEstate.Floor;
      this.advert.Realestate.TotalFloors = RealEstate.TotalFloors;
      this.advert.Realestate.Parking = RealEstate.Parking;
      this.advert.Realestate.MonthlyUtilities = RealEstate.MonthlyUtilities;
      this.advert.Realestate.Price = RealEstate.Price;
      this.advert.Realestate.About = RealEstate.About;
      this.advert.Realestate.Characteristics = RealEstate.Characteristics;
      this.advert.Realestate.Sold = "NE";

      this.advert.Advertiser = Advertiser;
      this.advert.LastEdited = "0";
      this.aservice.addAdvert(this.advert).subscribe((resp) => {
        window.location.reload();
      });
    }
  }

}
