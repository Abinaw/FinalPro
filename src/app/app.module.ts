import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { NgxPrintModule } from "ngx-print";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SideBarComponent } from "./Template/side-bar/side-bar.component";

// import {MatIconModule} from '@angular/material/icon';
import { HttpClientModule } from "@angular/common/http";
import { DashboardCardsComponent } from "./Template/dashboard-cards/dashboard-cards.component";
// Imports for Modules
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { ToastrModule } from "ngx-toastr";
import { MatDialogModule } from "@angular/material/dialog";

import { LoginCompoComponent } from "./Template/createData-forms/login-compo/login-compo.component";

// Routing Module
import { Routes, RouterModule } from "@angular/router";

import { UserDataComponent } from "./Template/modules/userData/userData.component";
import { UserDeatilsComponent } from "./Template/side-bar/user-deatils/user-deatils.component";
import { CustomerComponent } from "./Template/modules/customer/customer.component";
import { VendorComponent } from "./Template/modules/vendor/vendor.component";
import { EmployeeComponent } from "./Template/modules/employee/employee.component";
import { SalesComponent } from "./Template/modules/sales/sales.component";
import { StockComponent } from "./Template/modules/stock/stock.component";
import { PurchaseComponent } from "./Template/modules/purchase/purchase.component";
import { ReportComponent } from "./Template/modules/report/report.component";
import { SysInfoComponent } from "./Template/side-bar/nav-settings/sys-info/sys-info.component";
import { CompanyDetailsComponent } from "./Template/side-bar/nav-settings/company-details/company-details.component";
import { BackupComponent } from "./Template/side-bar/nav-settings/backup/backup.component";
import { PrintComponent } from "./Template/side-bar/nav-settings/print/print.component";

// Form Modules
import { ReactiveFormsModule } from "@angular/forms";
import { MatSelectModule } from "@angular/material/select";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatRadioModule } from "@angular/material/radio";
import { MatInputModule } from "@angular/material/input";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatIcon, MatIconModule } from "@angular/material/icon";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
// Table
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSortModule } from "@angular/material/sort";
import { FormsModule } from "@angular/forms";
import { UserRegistrationForm } from "./Template/createData-forms/registration-form/userRegistration-form.component";
import { AgGridModule } from "ag-grid-angular";
import { ActionCellComponent } from "./custom-components/action-cell/user-action/action-cell.component";
import { ActionPopComponent } from "./custom-components/action-cell/action-pop/action-pop.component";
import { CustomerFormComponent } from "./Template/createData-forms/customer-form/customer-form.component";
import { CustomerActionComponent } from "./custom-components/action-cell/customer-action/customer-action.component";
import { VendorActionComponent } from "./custom-components/action-cell/vendor-action/vendor-action.component";
import { VendorFormComponent } from "./Template/createData-forms/vendor-form/vendor-form.component";
import { StockFormComponent } from "./Template/createData-forms/stock-form/stock-form.component";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { StockActionComponent } from "./custom-components/action-cell/stock-action/stock-action.component";
import { CategoryComponent } from "./Template/modules/category/category.component";
import { InvoiceComponent } from "./Template/modules/invoice/invoice.component";
import { CategoryActionComponent } from "./custom-components/action-cell/category-action/category-action.component";
import { CategoryFormComponent } from "./Template/createData-forms/category-form/category-form.component";
import { InvoiceActionComponent } from "./custom-components/action-cell/invoice-action/invoice-action.component";
import { InvoiceFormComponent } from "./Template/createData-forms/invoice-form/invoice-form.component";
import { SelectedInvoiceComponent } from "./Template/expansion/selected-invoice/selected-invoice.component";
import { CommonModule, DatePipe } from "@angular/common";
import { InvoiceFinalizationComponent } from "./custom-components/invoice-finalization/invoice-finalization.component";
import { ProductSelectionToCartComponent } from "./Template/expansion/product-selection-to-cart/product-selection-to-cart.component";
import { ProductSelectionToCartFormComponent } from "./Template/expansion/product-selection-to-cart-form/product-selection-to-cart-form.component";
import { ProductCartActionComponent } from "./custom-components/action-cell/product-cart-action/product-cart-action.component";
import { InvoiceTemplateForCustomerComponent } from "./Template/expansion/invoice-template-for-customer/invoice-template-for-customer.component";
import { InvoicePaymentComponent } from "./Template/payments/invoice-payment/invoice-payment.component";
import { PurchasedProductFormComponent } from "./Template/createData-forms/purchased-product-form/purchased-product-form.component";
import { PurchaseInvoiceFormComponent } from "./Template/createData-forms/purchase-invoice-form/purchase-invoice-form.component";
import { PurchaseCartComponent } from "./Template/modules/purchase-cart/purchase-cart.component";
import { PurchaseCartActionComponent } from "./custom-components/action-cell/purchase-cart-action/purchase-cart-action.component";

@NgModule({
    declarations: [
        AppComponent,
        SideBarComponent,
        DashboardCardsComponent,
        UserDeatilsComponent, //(side bar property)
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
        UserDataComponent,
        UserRegistrationForm,
        ActionCellComponent,
        ActionPopComponent,
        CustomerFormComponent,
        CustomerActionComponent,
        VendorActionComponent,
        VendorFormComponent,
        StockFormComponent,
        StockActionComponent,
        CategoryComponent,
        InvoiceComponent,
        CategoryActionComponent,
        CategoryFormComponent,
        InvoiceActionComponent,
        InvoiceFormComponent,
        SelectedInvoiceComponent,
        InvoiceFinalizationComponent,
        ProductSelectionToCartComponent,
        ProductSelectionToCartFormComponent,
        ProductCartActionComponent,
        InvoiceTemplateForCustomerComponent,
        InvoicePaymentComponent,
        PurchasedProductFormComponent,
        PurchaseInvoiceFormComponent,
        PurchaseCartComponent,
        PurchaseCartActionComponent,
    ],
    imports: [
        BrowserModule,
        // CommonModule,
        AppRoutingModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatAutocompleteModule,

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
        BrowserAnimationsModule,
        MatSlideToggleModule,
        NgxPrintModule,
    ],
    //providers: [],
    providers: [DatePipe],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
