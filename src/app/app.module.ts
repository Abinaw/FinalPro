import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideBarComponent } from './Template/side-bar/side-bar.component';

// import {MatIconModule} from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { DashboardCardsComponent } from './Template/dashboard-cards/dashboard-cards.component';
// Imports for Modules
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button'
import {MatCardModule} from '@angular/material/card';
import { ToastrModule } from 'ngx-toastr';
import {MatDialogModule} from '@angular/material/dialog'

import { LoginCompoComponent } from './Template/auth-forms/login-compo/login-compo.component';

// Routing Module
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './Template/modules/user/user.component';
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
import { SignUpComponent } from './Template/auth-forms/sign-up/sign-up.component';
// Form Modules
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIcon, MatIconModule} from '@angular/material/icon';

// Table
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSortModule} from '@angular/material/sort';
import { FormsModule } from '@angular/forms';
import { UserRegistrationComponent } from './Template/auth-forms/user-registration/user-registration.component';
import {AgGridModule} from 'ag-grid-angular';
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
    PrintComponent,
    SignUpComponent,
    UserComponent,
    UserRegistrationComponent,

  ],
  imports: [
    BrowserModule,
    // CommonModule,
    AppRoutingModule,


     // Dash-Board-Purpose
     MatButtonModule,
     MatCardModule,
    MatIconModule,

    // Form
     MatFormFieldModule,
     ReactiveFormsModule,
     HttpClientModule,
     MatSelectModule,
     MatRadioModule,
     MatDialogModule,
    //  Table
     MatTableModule,
     MatInputModule,
     MatPaginatorModule,
     MatProgressSpinnerModule,
     MatSortModule,
     AgGridModule,

     ToastrModule.forRoot(),
     RouterModule,

     HttpClientModule,
     FormsModule,
     BrowserAnimationsModule

  ],
  //providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
