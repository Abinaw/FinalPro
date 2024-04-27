import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ProductSelectionToCartComponent } from '../product-selection-to-cart/product-selection-to-cart.component';
import { StockService } from 'src/app/service/stock-service/stock.service';
import { GLOBAL_LIST } from 'src/app/constants/GlobalLists';
import { CetegoryService } from 'src/app/service/category-service/cetegory.service';
import { ProductSelectionToCartFormComponent } from '../product-selection-to-cart-form/product-selection-to-cart-form.component';
import { AgGridAngular } from 'ag-grid-angular';
import { Observable } from 'rxjs';
import { CellClickedEvent, ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { ProductCartService } from 'src/app/service/productCart-service/product-cart.service';
import { InvoiceActionComponent } from 'src/app/custom-components/action-cell/invoice-action/invoice-action.component';
import { ProductCartActionComponent } from 'src/app/custom-components/product-cart-action/product-cart-action.component';

@Component({
  selector: 'app-selected-invoice',
  templateUrl: './selected-invoice.component.html',
  styleUrls: ['./selected-invoice.component.css']
})
export class SelectedInvoiceComponent {
    
    customerName!:string;
    custId!:number;
    custContact!:number;
    invoiceId!: number;
    invoiceNumber!: number 
    jusData!:any


    rowData$!: Observable<any[]>;
    @ViewChild(AgGridAngular)
    agGrid!: AgGridAngular
    gridApi: GridApi | any = {}
    public rowSelection: 'single' | 'multiple' = 'single';
    searchCharac : string=""

    constructor(
        private catService : CetegoryService,
        private stockService: StockService,
        private route:ActivatedRoute,
        private matDialog:MatDialog,
        private productCartService: ProductCartService,
    ){
        
        this.getAllStockData()
        this.route.queryParams.subscribe(params=>{
            let dataString = params['data']
            dataString = JSON.parse(dataString);
            this.invoiceId = dataString.tempInvoiceId;
            this.customerName = dataString.customerOBJ.custName
            this.custId = dataString.customerOBJ.custId
            this.custContact = dataString.customerOBJ.contact
            this.invoiceNumber = dataString.tempInvoiceNumber
        })
    }

   
    getAllStockData() {
        this.stockService.getAll().subscribe(res => {
            GLOBAL_LIST.STOCK_DATA = res
        })

        this.catService.getAll().subscribe(res => {
            GLOBAL_LIST.CATEGORY_DATA = res
        })
        
    }


    
    public columnDef: ColDef[] = [
        // 
        { 
            field: "proCartId",
            colId:"proCartId",
            headerName:"Cart Row ID",
            width: 90, 
            // hide: true
        },
        { 
            field: "stockOBJ",
            colId:"stockOBJ",
            headerName:"Product",
            valueFormatter:(params)=>{
                const combinedvalue = params.value.stockId+"-"+params.value.itemName
                
                return combinedvalue
            }
         },
         { 
            field: "quantity",
            colId:"quantity",
            headerName:"Qty"
         },
        { 
            field: "netAmount",
            colId:"netAmount",
            headerName:"Net amount"
        
        },
        { 
            field: "discount",
            colId:"discount",
            headerName:"Discount"
        
        },
        { 
            field: "total",
            colId:"total",
            headerName:"Total"
        
        },
        { 
            field: "tempInvoiceOBJ",
            colId:"tempInvoiceOBJ",
            headerName:"Invoice ID",
            valueFormatter:(params)=>{
                const combinedvalue = params.value.tempInvoiceNumber
                return combinedvalue
            },
            hide:true
            
        },{
            field:"action",
            headerName:"Action",
            cellRenderer:ProductCartActionComponent ,
             
        }
    ];

  
    onGridReady(param: GridReadyEvent) {
        
        this.rowData$ = this.getRowData();
        this.gridApi = param?.api
    }
    

    onCellClicked(cellClickedEvent: CellClickedEvent) {
       
    }

    private getRowData(): any {
        return new Promise((resolve) => {
            this.productCartService.getAll(this.invoiceId).subscribe((cartData) => {
                resolve(cartData.result[0]);
                console.log(cartData.result[0])
            }, (err) => {
                resolve([])
            })
        })
    }

  
    public setDataIntoRow() {       
        this.productCartService.getAll(this.invoiceId).subscribe((cartData) => {
            this.gridApi.setRowData(cartData.result[0]);
          }, (err) => {
          })
    }

    insertTrigger() {
        
     
        const extraData={
            title:"Add",
            selectedInvoiceId: this.invoiceId,
            customerId: this.custId
        }
       
        // const showAvailableProducts = this.matDialog.open(ProductSelectionToCartComponent,{height:"30%",width:"100%"})
        // showAvailableProducts.afterClosed().subscribe(res=>{
           
        // })
        const addProductsForm = this.matDialog.open(ProductSelectionToCartFormComponent,{
            data:extraData})
            addProductsForm.afterClosed().subscribe(res=>{
            this.setDataIntoRow();
        })
    }
    // insertTrigger() {
        
       
    //     const extraData={
    //         title:"Insert"
    //     }
    //     const openForm = this.dialog.open(InvoiceFormComponent,{data:extraData})
    //     openForm.afterClosed().subscribe(res=>{
    //         this.setDataIntoRow();
    //     })
      
    // }

    searchDataInRows()
    {
        // this.gridApi.setQuickFilter(this.searchCharac)
        // if(this.searchCharac!==""){
        // this.productCartService.findData(this.searchCharac).subscribe(res=>{
        //   this.gridApi.setRowData(res) 
        //    });   
        // }else if(this.searchCharac===""){
        //    this.setDataIntoRow()
        // }
    }

}
