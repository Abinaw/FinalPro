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
import { CategoryComponent } from './Template/modules/category/category.component';
import { InvoiceComponent } from './Template/modules/invoice/invoice.component';
import { SelectedInvoiceComponent } from './Template/expansion/selected-invoice/selected-invoice.component';
import { PurchaseCartComponent } from './Template/modules/purchase-cart/purchase-cart.component';
import { CommonPaymentsComponent } from './Template/modules/common-payments/common-payments.component';




const routes: Routes = [
  {
    path: '',
    redirectTo:'login',
    pathMatch:'full'
  },

  //----Modules Start-----
  {
    path: 'dash-board',
    component: DashboardCardsComponent,
  },
  {
    path: 'dash-board/invoice',
    component: InvoiceComponent
  },
  {
    path: 'dash-board/category',
    component: CategoryComponent
  },
  {
    path: 'dash-board/customer',
    component: CustomerComponent
  },
  {
    path: 'dash-board/return',
    component: EmployeeComponent
  },
  {
    path: 'dash-board/purchase',
    component: PurchaseComponent
  },
  {
    path: 'dash-board/report',
    component: ReportComponent
  },
  {
    path: 'dash-board/commonPayments',
    component: CommonPaymentsComponent
  },
  {
    path: 'dash-board/stock',
    component: StockComponent
  },
  {
    path: 'dash-board/user',
    component: UserDataComponent
  },
  {
    path: 'dash-board/vendor',
    component: VendorComponent
  },
  {
    path:'dash-board/purchase-cart',
    component:PurchaseCartComponent
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
  },

    //----others-----
  {
    path:'dash-board/invoice/selectedInvoice',
    component:SelectedInvoiceComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
