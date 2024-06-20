import { Component } from '@angular/core';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css','../../../../assets/CSS/ComponentCommDesign.css']
})
export class ReportComponent {

  
    Cards = [
        {
            name: " Stock Report ",
            route: "/dash-board/customer",
        },
        {
            name: "Sales Report",
            route: "/dash-board/user",
        },
        {
            name: "Purchase Report",
            route: "/dash-board/vendor",
        },
        {
            name: "Payments Report",
            route: "/dash-board/commonPayments",
        },
        {
            name: "Vendor Report",
            route: "/dash-board/return",
        },
        // {
        //     name: "Stock",
        //     imageUrl: "../../assets/New Set/stock.png",
        //     route: "/dash-board/stock",
        // },
        // {
        //     name: "Purchase",
        //     imageUrl: "../../assets/New Set/purchase.png",
        //     route: "/dash-board/purchase",
        // },
        // {
        //     name: "Category",
        //     imageUrl: "../../assets/New Set/category.png",
        //     route: "/dash-board/category",
        // },
        // {
        //     name: "Invoice",
        //     imageUrl: "../../assets/New Set/invoice.png",
        //     route: "/dash-board/invoice",
        // },
        // {
        //     name: "Report",
        //     imageUrl: "../../assets/New Set/report.png",
        //     route: "/dash-board/report",
        // },
    ];
}
