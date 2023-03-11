import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


// Components of the modules in the dashBoard
import { DashboardCardsComponent } from './dashboard-cards/dashboard-cards.component';
import { LoginCompoComponent } from './Template/LogIn/login-compo/login-compo.component';
import { CustomerComponent } from './Template/modules/customer/customer.component';
import { EmployeeComponent } from './Template/modules/employee/employee.component';
import { PurchaseComponent } from './Template/modules/purchase/purchase.component';
import { ReportComponent } from './Template/modules/report/report.component';
import { SalesComponent } from './Template/modules/sales/sales.component';
import { StockComponent } from './Template/modules/stock/stock.component';
import { UserComponent } from './Template/modules/user/user.component';
import { VendorComponent } from './Template/modules/vendor/vendor.component';
import { BackupComponent } from './Template/side-bar/nav-settings/backup/backup.component';
import { CompanyDetailsComponent } from './Template/side-bar/nav-settings/company-details/company-details.component';
import { PrintComponent } from './Template/side-bar/nav-settings/print/print.component';
import { SysInfoComponent } from './Template/side-bar/nav-settings/sys-info/sys-info.component';



const routes: Routes = [
  {
    path: '',
    component: DashboardCardsComponent
  },
 
  //----Modules Start-----
  
  {
    path: 'Customer',
    component: CustomerComponent
  },
  {
    path: 'Employee',
    component: EmployeeComponent
  },
  {
    path: 'Purchase',
    component: PurchaseComponent
  },
  {
    path: 'Report',
    component: ReportComponent
  },
  {
    path: 'Sales',
    component: SalesComponent
  },
  {
    path: 'Stock',
    component: StockComponent
  },
  {
    path: 'User',
    component: UserComponent
  },
  {
    path: 'Vendor',
    component: VendorComponent
  },
 
  //----Modules End-----


  {
    path: 'Login',
    component: LoginCompoComponent
  },


  //----Nav settings-----
  {
    path: 'Backup',
    component: BackupComponent
  },
  {
    path: 'Company-details',
    component: CompanyDetailsComponent
  },
  {
    path: 'Print',
    component: PrintComponent
  },
  {
    path: 'Sys-info',
    component: SysInfoComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
