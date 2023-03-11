import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideBarComponent } from './Template/side-bar/side-bar.component';

// import {MatIconModule} from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { DashboardCardsComponent } from './dashboard-cards/dashboard-cards.component';
// Imports for Modules
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button'
import {MatCardModule} from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { LoginCompoComponent } from './Template/LogIn/login-compo/login-compo.component';

// Roting Module

import { Routes, RouterModule } from '@angular/router';
import { UserDeatilsComponent } from './Template/side-bar/user-deatils/user-deatils.component';
import { CustomerComponent } from './Template/modules/customer/customer.component';
import { VendorComponent } from './Template/modules/vendor/vendor.component';
import { EmployeeComponent } from './Template/modules/employee/employee.component';
import { SalesComponent } from './Template/modules/sales/sales.component';
import { StockComponent } from './Template/modules/stock/stock.component';
import { PurchaseComponent } from './Template/modules/purchase/purchase.component';
import { ReportComponent } from './Template/modules/report/report.component';
import { SysInfoComponent } from './Template/side-bar/nav-settings/sys-info/sys-info.component';
import { CompanyDetailsComponent } from './Template/side-bar/nav-settings/company-details/company-details.component';
import { BackupComponent } from './Template/side-bar/nav-settings/backup/backup.component';
import { PrintComponent } from './Template/side-bar/nav-settings/print/print.component';
@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    DashboardCardsComponent,
    UserDeatilsComponent,//(side bar property)
    LoginCompoComponent,
    CustomerComponent,
    VendorComponent,
    EmployeeComponent,
    SalesComponent,
    StockComponent,
    PurchaseComponent,
    ReportComponent,
    SysInfoComponent,
    CompanyDetailsComponent,
    BackupComponent,
    PrintComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

     // Dash-Board-Purpose
     MatButtonModule,
     MatCardModule,
     MatIconModule,

     MatFormFieldModule
  ],
  //providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
