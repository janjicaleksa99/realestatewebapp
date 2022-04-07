import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddNewUserComponent } from './add-new-user/add-new-user.component';
import { AdminComponent } from './admin/admin.component';
import { AdvertisementComponent } from './advertisement/advertisement.component';
import { AgentComponent } from './agent/agent.component';
import { FavoriteAdsComponent } from './favorite-ads/favorite-ads.component';
import { KupacComponent } from './kupac/kupac.component';
import { LoginComponent } from './login/login.component';
import { MicrolocComponent } from './microloc/microloc.component';
import { NewAgencyComponent } from './new-agency/new-agency.component';
import { NewRealEstateJSONComponent } from './new-real-estate-json/new-real-estate-json.component';
import { NewRealEstateComponent } from './new-real-estate/new-real-estate.component';
import { PasswordChangeComponent } from './password-change/password-change.component';
import { ProdavacComponent } from './prodavac/prodavac.component';
import { RealEstateViewComponent } from './real-estate-view/real-estate-view.component';
import { RegisterComponent } from './register/register.component';
import { SalesmanPersonalDataComponent } from './salesman-personal-data/salesman-personal-data.component';
import { UpdateUsersComponent } from './update-users/update-users.component';

const routes: Routes = [
  {path : '', component : LoginComponent},
  {path : 'register', component : RegisterComponent},
  {path : 'kupac', component : KupacComponent},
  {path : 'prodavac', component : ProdavacComponent},
  {path : 'agent', component : AgentComponent},
  {path : 'oglas', component : AdvertisementComponent},
  {path : 'omiljene', component : FavoriteAdsComponent},
  {path : 'admin', component : AdminComponent},
  {path : 'azuriraj', component : UpdateUsersComponent},
  {path : 'dodajKorisnika', component : AddNewUserComponent},
  {path : 'dodajAgenciju', component : NewAgencyComponent},
  {path : 'mikroLokacija', component : MicrolocComponent},
  {path : 'uneseneNekretnine', component : RealEstateViewComponent},
  {path : 'promenaLozinke', component : PasswordChangeComponent},
  {path : 'novaNekretnina', component : NewRealEstateComponent},
  {path : 'novaNekretninaJSON', component : NewRealEstateJSONComponent},
  {path : 'licniPodaci', component : SalesmanPersonalDataComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
