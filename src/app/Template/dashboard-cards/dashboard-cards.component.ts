import { Component, Input, OnInit } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { GLOBAL_LIST } from "src/app/constants/GlobalLists";
import { VendorService } from "src/app/service/vendor-service/vendor.service";
import { StockService } from "src/app/service/stock-service/stock.service";
import { CustomerService } from "src/app/service/customer-service/customer.service";
import { CurrentLoggedInUserService } from "src/app/service/current-logged-user-service/current-logged-in-user.service";

/**
 * @title Card with multiple sections
 */
@Component({
    selector: "app-dashboard-cards",
    templateUrl: "dashboard-cards.component.html",
    styleUrls: ["dashboard-cards.component.css"],
})
export class DashboardCardsComponent implements OnInit{
    @Input() isSwitched!: boolean;
    userRole :any =''

    constructor(private stockService: StockService,  private custService: CustomerService,private currentLoggedInUserService:CurrentLoggedInUserService) {
        this.loadAllStock();
        this.getAllToGlobalList();
    }
    
    ngOnInit(): void {
       this.getUserRole()
    }



    loadAllStock() {
        this.stockService.getAll().subscribe((res) => {
            GLOBAL_LIST.STOCK_DATA = res;
        });
    }

    Cards = [
        {
            name: "Customer",
            imageUrl: "../../assets/New Set/customer.png",
            route: "/dash-board/customer",
            access:'user'
        },
        {
            name: "User",
            imageUrl: "../../assets/New Set/user.png",
            route: "/dash-board/user",
            // access:'user'
        },
        {
            name: "Vendor",
            imageUrl: "../../assets/New Set/vendor.png",
            route: "/dash-board/vendor",
            access:'user'
        },
        {
            name: "Payments",
            imageUrl: "../../assets/New Set/sales.png",
            route: "/dash-board/commonPayments",
            access:'user'
        },
        {
            name: "Return",
            imageUrl: "../../assets/New Set/return.png",
            route: "/dash-board/return",
            access:'user'
        
        },
        {
            name: "Stock",
            imageUrl: "../../assets/New Set/stock.png",
            route: "/dash-board/stock",
        },
        {
            name: "Purchase",
            imageUrl: "../../assets/New Set/purchase.png",
            route: "/dash-board/purchase",
        },
        {
            name: "Category",
            imageUrl: "../../assets/New Set/category.png",
            route: "/dash-board/category",
        },
        {
            name: "Sales",
            imageUrl: "../../assets/New Set/invoice.png",
            route: "/dash-board/invoice",
            access:'user'
        },
        {
            name: "Report",
            imageUrl: "../../assets/New Set/report.png",
            route: "/dash-board/report",
        },
    ];
    filteredCards = this.Cards;

    getUserRole() {
        const token = localStorage.getItem('token');
        this.currentLoggedInUserService.userNameSplit(token);
        this.userRole = this.currentLoggedInUserService.getRole();
        this.filterCards();
    }

    filterCards() {
        if (this.userRole === 'admin') {
            this.filteredCards = this.Cards; // Show all cards for admin
        } else {
            this.filteredCards = this.Cards.filter(card => card.access && card.access.toLowerCase() === this.userRole);
        }
    }

    getAllToGlobalList() {
        this.custService
            .getAll()
            .subscribe((res) => (GLOBAL_LIST.CUSTOMER_DATA = res));
    }
}
