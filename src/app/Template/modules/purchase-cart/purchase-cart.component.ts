import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import {
    MAT_DIALOG_DATA,
    MatDialog,
    MatDialogRef,
} from "@angular/material/dialog";
import { AgGridAngular } from "ag-grid-angular";
import {
    CellClickedEvent,
    ColDef,
    GridApi,
    GridReadyEvent,
} from "ag-grid-community";
import { Observable } from "rxjs";
import { PurchaseCartActionComponent } from "src/app/custom-components/action-cell/purchase-cart-action/purchase-cart-action.component";
import { TempPurchaseCartService } from "src/app/service/tempPurchaseCart-service/temp-purchase-cart.service";
import { PurchaseInvoiceFormComponent } from "../../createData-forms/purchase-invoice-form/purchase-invoice-form.component";
import { PurchasedProductFormComponent } from "../../createData-forms/purchased-product-form/purchased-product-form.component";
import { TempPurchaseService } from "src/app/service/tempPurchase-service/temp-purchase.service";
import { GLOBAL_LIST } from "src/app/constants/GlobalLists";
import { ITempPurchaseInvoice } from "src/app/constants/interfaces/ITempPurchaseInvoiceEntity";
import { ActionPopComponent } from "src/app/custom-components/action-cell/action-pop/action-pop.component";
import { state } from "@angular/animations";
import { ConfirmPurchaseAndCartServiceService } from "src/app/service/confirmPurchase-service/confirm-purchase-and-cart-service.service";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";

@Component({
    selector: "app-purchase-cart",
    templateUrl: "./purchase-cart.component.html",
    styleUrls: ["./purchase-cart.component.css"],
})
export class PurchaseCartComponent implements OnInit {
    purchaseInvoiceNum!: number;
    vendorList!: any;
    rowData$!: Observable<any[]>;
    @ViewChild(AgGridAngular)
    agGrid!: AgGridAngular;
    gridApi: GridApi | any = {};
    public rowSelection: "single" | "multiple" = "single";
    searchCharac: string = "";
    purchaseId!: number;
    purchaseList: ITempPurchaseInvoice[] = [];
    public columnDef: ColDef[] = [
        //
        {
            field: "productCartId",
            colId: "productCartId",
            headerName: "productCartId",
            width: 90,
            hide: true,
        },
        {
            field: "quantity",
            colId: "quantity",
            headerName: "Quantity",
        },
        {
            field: "discount",
            colId: "discount",
            headerName: "Discount",
        },
        {
            field: "grossAmount",
            colId: "grossAmount",
            headerName: "Gross amount",
        },
        {
            field: "stockOBJ",
            colId: "stockOBJ",
            headerName: "Stock",
            valueFormatter: (params) => {
                const combinedvalue =
                    params.value.stockId + "-" + params.value.itemName;
                return combinedvalue;
            },
        },
        {
            field: "tempPurchaseOBJ",
            colId: "tempPurchaseOBJ",
            headerName: "Temp Purchase",
            valueFormatter: (params) => {
                const combinedvalue =
                    params.value.purchaseId +
                    "-" +
                    params.value.vendorOBJ.vendorName;
                return combinedvalue;
            },
        },
        {
            field: "netAmount",
            colId: "netAmount",
            headerName: "Net amount",
        },
        {
            field: "action",
            headerName: "Action",
            cellRenderer: PurchaseCartActionComponent,
        },
    ];

    onCellClicked(cellClickedEvent: CellClickedEvent) {}

    constructor(
        private dialog: MatDialog,
        private tempPurchaseCartService: TempPurchaseCartService,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private tempPurchaseInvoiceService: TempPurchaseService,
        private matDialog: MatDialog,
        private confirmPurchaseAndCartService: ConfirmPurchaseAndCartServiceService,
        private toastr: ToastrService,
        private router: Router
    ) {
        this.loadAllTempPurchase();
        this.purchaseList = GLOBAL_LIST.TEMPPURCHASE_DATA;
        this.getTempPurchaseId();
    }
    
    ngOnInit(): void {
        this.purchaseInvoiceNum = this.purchaseList?.[0].purchaseInvoiceNO;
        this.vendorList = this.purchaseList?.[0].vendorOBJ;
    }

    onGridReady(param: GridReadyEvent) {
        this.rowData$ = this.getRowData();
        this.gridApi = param?.api;
    }

    getTempPurchaseId() {
        this.purchaseId = this.purchaseList?.[0]?.purchaseId;
    }

    private getRowData(): any {
        return new Promise((resolve) => {
            this.tempPurchaseCartService
                .getAllTempPurchaseCartItems(this.purchaseId)
                .subscribe(
                    (purchaseCartData) => {
                        resolve(purchaseCartData?.result);
                    },
                    (err) => {
                        resolve([]);
                    }
                );
        });
    }

    public setDataIntoRow() {
        this.tempPurchaseCartService
            .getAllTempPurchaseCartItems(this.purchaseId)
            .subscribe(
                (purchaseCartData?) => {
                    this.gridApi.setRowData(purchaseCartData?.result);
                 
                },
                (err) => {}
            );
    }

    insertTrigger() {
        const extraData = {
            title: "Insert",
        };
        const openForm = this.dialog.open(PurchasedProductFormComponent, {
            data: extraData,
            panelClass: "custom-dialog-container",
        });
        openForm.afterClosed().subscribe((res) => {
            this.setDataIntoRow();
            this.loadAllTempPurchase()
        });
    }

    searchDataInRows() {
        if (this.searchCharac !== "") {
            this.tempPurchaseCartService
                .selectTempPurchaseCartRecords(
                    this.purchaseId,
                    this.searchCharac
                )
                .subscribe((purchaseCartData) => {
                    this.gridApi.setRowData(purchaseCartData?.result);
                });
        } else if (this.searchCharac === "") {
            this.setDataIntoRow();
        }
    }

    loadAllTempPurchase() {
        this.tempPurchaseInvoiceService
            .getAllTempPurchase()
            .subscribe((response) => {
                GLOBAL_LIST.TEMPPURCHASE_DATA = response?.result;
                this.purchaseId = response?.result?.[0].purchaseId;
            });
    }

    completeInvoice() {
        const extraData = {
            title: "Confirm Purchase?",
            subTitle: "Do you want to confirm the invoice?",
        };
        let openActionPop = this.matDialog.open(ActionPopComponent, {
            data: extraData,
            panelClass: ["custom-dialog-container"],
        });
        openActionPop.afterClosed().subscribe((state: boolean) => {
            if (!state) return;
            this.confirmPurchaseAndCartService
                .addToConfirmPurchase(this.purchaseId)
                .subscribe((res) => {
                    this.toastr.clear();
                    this.toastr.success(res.successMessage);
                    // this.loadAllTempPurchase()
                    this.router.navigate(["/dash-board"]);

                });

        });
    }
}
