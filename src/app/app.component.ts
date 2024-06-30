import { ChangeDetectionStrategy, Component, Renderer2 } from "@angular/core";
import { Router } from "@angular/router";
import { CustomerService } from "./service/customer-service/customer.service";
import { GLOBAL_LIST } from "./constants/GlobalLists";
import { VendorService } from "./service/vendor-service/vendor.service";
import { TempPurchaseService } from "./service/tempPurchase-service/temp-purchase.service";
import { Location } from '@angular/common';
@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
    title = "FinalPro";
    isLoginPageAvail: boolean = true;
    showClose: boolean = false;
    isSwitched;
    currentYear: number = new Date().getFullYear();

    constructor(
        private router: Router,
        private renderer: Renderer2,
      
        private tempPurchaseInvoiceService: TempPurchaseService,
        private location: Location
    ) {
        this.isSwitched = true;
       

    }

    ShowSidebarAndNotifiBar(): any {
        const currentRoute = this.router.url; //login
        // if (['/login'].includes(currentRoute)) {
        if (currentRoute.includes("/login")) {
            this.isLoginPageAvail = true;
            return false;
        } else {
            this.isLoginPageAvail = false;
            return true;
        }
    }

    // goBack() {
    //     this.location.back();
    //   }
    showCloseIcon() {
        const currentRoute = this.router.url;
        if (["/login", "/dash-board"].includes(currentRoute)) {
            this.showClose = false;
            return false;
        } else {
            this.showClose = true;
            return true;
        }
    }

    toogleTheme() {
        document.documentElement.classList.toggle("dark");
    }

   

   
}
