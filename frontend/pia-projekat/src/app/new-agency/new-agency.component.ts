import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AgencyService } from '../agency.service';
import { Agency } from '../models/agency';

@Component({
  selector: 'app-new-agency',
  templateUrl: './new-agency.component.html',
  styleUrls: ['./new-agency.component.css']
})
export class NewAgencyComponent implements OnInit {

  agency : Agency = new Agency();

  agencyForm : FormGroup;

  nameError : boolean = false;
  addressError : boolean = false;
  cityError : boolean = false;
  contactError : boolean = false;
  pibError : boolean = false;

  constructor(private aservice : AgencyService,
    private router : Router) { }

  ngOnInit(): void {
    this.agencyForm = new FormGroup({
      'name' : new FormControl(null, Validators.required),
      'city' : new FormControl(null, Validators.required),
      'address' : new FormControl(null, Validators.required),
      'contact' : new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*$')]),
      'pib' : new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*$')])
    });
  }

  registerAgency() {
    if (this.agencyForm.invalid) {
      this.nameError = true;
      this.cityError = true;
      this.contactError = true;
      this.addressError = true;
      this.pibError = true;
    }
    else {
      this.aservice.registerAgency(this.agency).subscribe((resp) => {
          window.location.reload();
      });
    }
  }

}
