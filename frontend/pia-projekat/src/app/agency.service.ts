import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Agency } from './models/agency';

@Injectable({
  providedIn: 'root'
})
export class AgencyService {

  uri : String = 'http://localhost:4000';

  constructor(private http : HttpClient) { }

  getAll() {
    return this.http.get(`${this.uri}/agency/getAll`);
  }

  registerAgency(agency : Agency) {
    let data = {
      'type' : 'Agencija',
      'name' : agency.name,
      'pib' : agency.pib,
      'city' : agency.city,
      'address' : agency.address,
      'phone' : agency.phone
    }
    return this.http.post(`${this.uri}/agency/registerAgency`, data);
  }

  getUserAgency(name) {
    let data = {
      'name' : name
    }
    return this.http.post(`${this.uri}/agency/getUserAgency`, data);
  }
}
