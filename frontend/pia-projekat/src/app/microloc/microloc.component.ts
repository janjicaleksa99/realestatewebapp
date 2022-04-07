import { Component, OnInit } from '@angular/core';
import { AdvertisementService } from '../advertisement.service';
import { LocationService } from '../location.service';
import { Advertisement } from '../models/advertisement';
import { City } from '../models/city';
import { Microlocation } from '../models/microlocation';
import { Municipality } from '../models/municipality';
import { Street } from '../models/street';

@Component({
  selector: 'app-microloc',
  templateUrl: './microloc.component.html',
  styleUrls: ['./microloc.component.css']
})
export class MicrolocComponent implements OnInit {

  
  cities : City[];
  municipalities : Municipality[];

  municipalityEn : boolean = false;
  locAndStrEn : boolean = false;
  selectedCity : string;
  selectedMunicipality : string;
  streetNum : number;
  numbers2 : number[] = [];
  munEn : boolean = true;
  microLocation : string;
  streets : Street[] = [];
  allMicroLoc : Microlocation[] = [];

  advertisements : Advertisement[] = [];

  constructor(private lservice : LocationService, private aservice : AdvertisementService) { }

  ngOnInit(): void {
    this.aservice.getAllByDateDescending().subscribe((ads : Advertisement[]) => {
      this.advertisements = ads;
    })

    this.lservice.getAllMicroLocations().subscribe((microlocs : Microlocation[]) => {
      this.allMicroLoc = microlocs;
    });
    
    this.lservice.getAll().subscribe((data : any) => {
      this.cities = data.cities;
      this.municipalities = data.municipalities;
    })
  }

  enableMunicipality() {
    this.municipalityEn = true;
  }

  enableLocAndStr() {
    this.locAndStrEn = true;
  }

  addLocation() {
    for (let i = 0; i < this.streetNum; i++) {
      this.streets.push(new Street());
      this.streets[i].name = (<HTMLInputElement>document.getElementById("street" + i)).value;
      this.streets[i].lines = [];
      this.streets[i].microlocation = this.microLocation;
    }
    let microloc = new Microlocation();
    microloc.name = this.microLocation;
    microloc.municipality = this.selectedMunicipality;
    this.lservice.addLocation(this.streets, microloc).subscribe(() => {

    })
  }

  makeNumbers2() {
    this.munEn = false;
    for (let i = 0; i < this.streetNum; i++)
      this.numbers2.push(i);
  }

  deleteEn(microloc : Microlocation) {
    let flag = true;
    for (let i = 0; i < this.advertisements.length; i++) {
      if (microloc.name == this.advertisements[i].Realestate.Microlocation)
        flag = false;
    }
    return flag;
  }

  deleteMicroLoc(microloc) {
    this.lservice.deleteMicroLocation(microloc.name).subscribe(() => {
      this.lservice.getAllMicroLocations().subscribe((microlocs : Microlocation[]) => {
        this.allMicroLoc = microlocs;
      });
    });
  }
}
