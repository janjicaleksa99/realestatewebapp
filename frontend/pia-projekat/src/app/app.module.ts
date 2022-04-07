import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { NgxCaptchaModule } from 'ngx-captcha'
import { NgxPaginationModule } from 'ngx-pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatStepperModule } from '@angular/material/stepper';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { KupacComponent } from './kupac/kupac.component';
import { ProdavacComponent } from './prodavac/prodavac.component';
import { AgentComponent } from './agent/agent.component';
import { RegisterComponent } from './register/register.component';
import { AdvertisementComponent } from './advertisement/advertisement.component';
import { FavoriteAdsComponent } from './favorite-ads/favorite-ads.component';
import { AdminComponent } from './admin/admin.component';
import { UpdateUsersComponent } from './update-users/update-users.component';
import { AddNewUserComponent } from './add-new-user/add-new-user.component';
import { NewAgencyComponent } from './new-agency/new-agency.component';
import { MicrolocComponent } from './microloc/microloc.component';
import { NewRealEstateComponent } from './new-real-estate/new-real-estate.component';
import { RealEstateViewComponent } from './real-estate-view/real-estate-view.component';
import { PasswordChangeComponent } from './password-change/password-change.component';
import { NewRealEstateJSONComponent } from './new-real-estate-json/new-real-estate-json.component';
import { SalesmanPersonalDataComponent } from './salesman-personal-data/salesman-personal-data.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    KupacComponent,
    ProdavacComponent,
    AgentComponent,
    RegisterComponent,
    AdvertisementComponent,
    FavoriteAdsComponent,
    AdminComponent,
    UpdateUsersComponent,
    AddNewUserComponent,
    NewAgencyComponent,
    MicrolocComponent,
    NewRealEstateComponent,
    RealEstateViewComponent,
    PasswordChangeComponent,
    NewRealEstateJSONComponent,
    SalesmanPersonalDataComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxCaptchaModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    MatStepperModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
