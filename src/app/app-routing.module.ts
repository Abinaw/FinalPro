import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


// Components of the modules in the dashBoard
import { DashboardCardsComponent } from './Template/dashboard-cards/dashboard-cards.component';
import { LoginCompoComponent } from './Template/createData-forms/login-compo/login-compo.component'; 
import { CustomerComponent } from './Template/modules/customer/customer.component';
import { EmployeeComponent } from './Template/modules/employee/employee.component';
import { PurchaseComponent } from './Template/modules/purchase/purchase.component';
import { ReportComponent } from './Template/modules/report/report.component';
import { SalesComponent } from './Template/modules/sales/sales.component';
import { StockComponent } from './Template/modules/stock/stock.component';
import { UserDataComponent } from './Template/modules/userData/userData.component';
import { VendorComponent } from './Template/modules/vendor/vendor.component';
import { BackupComponent } from './Template/side-bar/nav-settings/backup/backup.component';
import { CompanyDetailsComponent } from './Template/side-bar/nav-settings/company-details/company-details.component';
import { PrintComponent } from './Template/side-bar/nav-settings/print/print.component';
import { SysInfoComponent } from './Template/side-bar/nav-settings/sys-info/sys-info.component';




const routes: Routes = [
  {
    path: '',
    redirectTo:'login',
    pathMatch:'full'
  },

  //----Modules Start-----
  {
    path: 'dash-board',
    component: DashboardCardsComponent
  },
  {
    path: 'customer',
    component: CustomerComponent
  },
  {
    path: 'employee',
    component: EmployeeComponent
  },
  {
    path: 'purchase',
    component: PurchaseComponent
  },
  {
    path: 'report',
    component: ReportComponent
  },
  {
    path: 'sales',
    component: SalesComponent
  },
  {
    path: 'stock',
    component: StockComponent
  },
  {
    path: 'user',
    component: UserDataComponent
  },
  {
    path: 'vendor',
    component: VendorComponent
  },

  //----Modules End-----


  {
    path: 'login',
    component: LoginCompoComponent
  },
 


  //----Nav settings-----
  {
    path: 'backup',
    component: BackupComponent
  },
  {
    path: 'company-details',
    component: CompanyDetailsComponent
  },
  {
    path: 'print',
    component: PrintComponent
  },
  {
    path: 'sys-info',
    component: SysInfoComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
