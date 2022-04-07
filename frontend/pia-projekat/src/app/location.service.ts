import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Street } from './models/street';
import { Microlocation } from './models/microlocation';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  uri : String = 'http://localhost:4000';

  constructor(private http : HttpClient) { }

  getAll() {
    return this.http.get(`${this.uri}/location/getAll`);
  }

  addLocation(streets, microloc) {
    let data = {
      'microlocation' : microloc,
      'streets' : streets
    }
    return this.http.post(`${this.uri}/location/addLocation`, data);
  }

  getAllMicroLocations() {
    return this.http.get(`${this.uri}/location/getAllMicroLocations`);
  }

  getAllStreets() {
    return this.http.get(`${this.uri}/location/getAllStreets`);
  }

  deleteMicroLocation(microloc) {
    return this.http.get(`${this.uri}/location/deleteMicroLocation?microloc=${microloc}`);
  }

  getAllLinesForMicroLoc(microloc) {
    return this.http.get(`${this.uri}/location/getAllLinesForMicroLoc?microloc=${microloc}`);
  }
}
