import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GovernatesComponent } from './Components/governates/governates.component';
import { CitiesComponent } from './Components/cities/cities.component';
import { BranchesComponent } from './Components/branches/branches.component';
import { HttpClientModule } from '@angular/common/http';
import { AddGovernateComponent } from './Components/add-governate/add-governate.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddCityComponent } from './Components/add-city/add-city.component';
import { AddBranchComponent } from './Components/add-branch/add-branch.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
@NgModule({
  declarations: [
    AppComponent,
    GovernatesComponent,
    CitiesComponent,
    BranchesComponent,
    AddGovernateComponent,
    AddCityComponent,
    AddBranchComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
