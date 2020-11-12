import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTablesModule } from 'angular-datatables';


import { AppComponent } from './app.component';
import { MyFundsComponent } from './my-funds/my-funds.component';
import { FundHoldingsComponent } from './fund-holdings/fund-holdings.component';
import { MyPortfolioComponent } from './my-portfolio/my-portfolio.component';
import { FcmComponent } from './fcm/fcm.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { MyPortfolioCompareComponent } from './my-portfolio-compare/my-portfolio-compare.component';

@NgModule({
  declarations: [
    AppComponent,
    MyFundsComponent,
    FundHoldingsComponent,
    MyPortfolioComponent,
    FcmComponent,
    NavbarComponent,
    MyPortfolioCompareComponent
  ],
  imports: [
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    CommonModule,
    HttpClientModule, 
    DataTablesModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
