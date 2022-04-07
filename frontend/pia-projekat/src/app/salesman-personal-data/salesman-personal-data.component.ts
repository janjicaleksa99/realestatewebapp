import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AgencyService } from '../agency.service';
import { Agency } from '../models/agency';
import { User } from '../models/user';
import { UserService } from '../user.service';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { AdvertisementService } from '../advertisement.service';
import { Advertisement } from '../models/advertisement';
import { LocationService } from '../location.service';
import { Microlocation } from '../models/microlocation';
import { City } from '../models/city';
import { Municipality } from '../models/municipality';
import { RealEstate } from '../models/real_estate';

export function matchValidator(
  matchTo: string, 
  reverse?: boolean
): ValidatorFn {
  return (control: AbstractControl): 
  ValidationErrors | null => {
    if (control.parent && reverse) {
      const c = (control.parent?.controls as any)[matchTo] as AbstractControl;
      if (c) {
        c.updateValueAndValidity();
      }
      return null;
    }
    return !!control.parent &&
      !!control.parent.value &&
      control.value === 
      (control.parent?.controls as any)[matchTo].value
      ? null
      : { matching: true };
  };
}

@Component({
  selector: 'app-salesman-personal-data',
  templateUrl: './salesman-personal-data.component.html',
  styleUrls: ['./salesman-personal-data.component.css']
})
export class SalesmanPersonalDataComponent implements OnInit {


  barChartOptions: ChartOptions = {
    responsive: true,
  };
  
  barChartLabels: Label[] = ['Januar', 'Februar', 'Mart', 'April', 'Maj', 'Jun', 'Jul', 'Avgust', 'Septembar', 'Oktobar', 'Novembar', 'Decembar'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];
  barChartData: ChartDataSets[] = [
    { data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Broj prodatih nekretnina po mesecima' }
  ];

  cities : City[];
  municipalities : Municipality[];
  microlocs : Microlocation[];

  salesman : User;

  agencies : Agency[];

  ad: Advertisement;

  ads : Advertisement[];

  employed : boolean = false;

  file : File;
  registerForm : FormGroup;
  fileName : String = '';
  pictureSizeOk : boolean = true;
  pictureFormatOk : boolean = true;
  imageSrc : String = '';
  userAlreadyExists : boolean = false;
  emailAlreadyExists : boolean = false;

  contactError : boolean = false;
  emailError : boolean = false;
  agencyError : boolean = false;
  licenseError : boolean = false;
  pictureError : boolean = false;

  constructor(private uservice : UserService, public formBuilder : FormBuilder, private aservice : AgencyService,
    private router : Router, private adservice : AdvertisementService, private lservice : LocationService) { }

  ngOnInit(): void {
    this.adservice.getAll().subscribe((advertisements : Advertisement[]) => {
      this.ads = advertisements;
    })
    this.salesman = this.uservice.getLoggedUser();
    this.uservice.login(this.salesman.username, this.salesman.password).subscribe((user : User) => {
      this.salesman = user;
      this.uservice.loadLoggedUser(this.salesman);
    });
    this.registerForm = new FormGroup({
      'contact' : new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*$')]),
      'email' : new FormControl(null, [Validators.required, Validators.email]),
      'agency' : new FormControl(null, Validators.required),
      'license' : new FormControl(null, Validators.required),
      'employed' : new FormControl(null, null)
    });

    this.ad = new Advertisement();
    this.ad.Realestate = new RealEstate();

    this.aservice.getAll().subscribe((agencies : Agency[]) => {
      this.agencies = agencies;
    });
    this.salesman.status = 'prihvacen';

    this.lservice.getAllMicroLocations().subscribe((microlocs : Microlocation[]) => {
      this.microlocs = microlocs;
    });
    
    this.lservice.getAll().subscribe((data : any) => {
      this.cities = data.cities;
      this.municipalities = data.municipalities;
    });
  }

  showGraph() {
    let data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    console.log(this.ads);
    if (this.salesman.type == 'prodavac') {
      for (let i = 0; i < this.ads.length; i++) {
        if (this.ads[i].Realestate.Microlocation == this.ad.Realestate.Microlocation &&
          this.ads[i].Realestate.Sold == "DA" &&
          this.ads[i].Advertiser.length == 1) {
          let month = parseInt(this.ads[i].Realestate.PublishDate.split("-")[1]);
          console.log(month);
          data[month-1] += 1;
        }
      }
    }
    else if (this.salesman.type == 'agent') {
      for (let i = 0; i < this.ads.length; i++) {
        if (this.ads[i].Realestate.Microlocation == this.ad.Realestate.Microlocation
          && this.ads[i].Advertiser.length == 2  &&
          this.ads[i].Realestate.Sold == "DA") {
          if (this.ads[i].Advertiser[0].name == this.salesman.agency) {
            let month = parseInt(this.ads[i].Realestate.PublishDate.split("-")[1]);
            console.log(month);
            data[month-1] += 1;
          }
        }
      }
    }
    this.barChartData[0].data = data;
  }

  onFileSelected(event) {

    this.file = event.target.files[0];

    if (this.file) {
      const allowed_types = ['image/png', 'image/jpeg'];
      const max_height = 300;
      const max_width = 300;
      const min_height = 100;
      const min_width = 100;

      this.fileName = this.file.name;

      this.pictureError = false;
      if (this.file.type != allowed_types[0] && this.file.type != allowed_types[1]) {
        this.pictureFormatOk = false;
      }

      const reader = new FileReader();
      reader.onload = (e: any) => {
          const image = new Image();
          image.src = e.target.result;
          console.log(image.src);
          this.salesman.profileImage = image.src;
          image.onload = rs => {
              const img_height = rs.currentTarget['height'];
              const img_width = rs.currentTarget['width'];

              if (img_height < min_height || img_height > max_height || img_width < min_width || img_width > max_width) {
                this.pictureSizeOk = false;
              }
          };
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  }

  edit() {
    if (this.salesman.type != 'agent' && !this.employed) {
      this.registerForm.removeControl('license');
      this.registerForm.removeControl('agency');
    }

    if (this.registerForm.invalid) {
      this.contactError = true;
      this.emailError = true;
      this.agencyError = true;
      this.licenseError = true;
    }
    else {
      this.salesman.birthDate = this.salesman.birthDate.split("T")[0];
      if (this.salesman.type == 'agent') {
        this.uservice.updateSalesman(this.salesman).subscribe((resp) => {
          if (resp['message'] == 'emailAlreadyExists')
            this.emailAlreadyExists = true;
          else
            window.location.reload();
        });
      }
      else {
        if (this.employed == true) {
          this.salesman.type = 'agent';
          this.uservice.updateSalesman(this.salesman).subscribe((resp) => {
            if (resp['message'] == 'emailAlreadyExists')
            this.emailAlreadyExists = true;
            else
              window.location.reload();
          });
        }
        else {
          this.uservice.updateSalesman(this.salesman).subscribe((resp) => {
            if (resp['message'] == 'emailAlreadyExists')
            this.emailAlreadyExists = true;
            else
              window.location.reload();
          });;
        }
      }
    }
  }

}
