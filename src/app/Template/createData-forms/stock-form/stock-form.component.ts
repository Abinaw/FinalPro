import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActionPopComponent } from 'src/app/custom-components/action-cell/action-pop/action-pop.component';
import { StockService } from 'src/app/service/stock-service/stock.service';
import { ICategoryEntity } from '../../../constants/interfaces/ICategoryEntity';
import { Observable, map, startWith } from 'rxjs';
import { GLOBAL_LIST } from 'src/app/constants/GlobalLists';
import { ToastrService } from 'ngx-toastr';
import moment from 'moment';

@Component({
  selector: 'app-stock-form',
  templateUrl: './stock-form.component.html',
  styleUrls: ['./stock-form.component.css','../form-design.css']
})
export class StockFormComponent implements OnInit {
    stockForm: FormGroup;
    hide: boolean = true;
    allData: any;
    categoryControl = new FormControl('');
    categoryDataList: ICategoryEntity[];
    filterOptions!: Observable<ICategoryEntity[]>
    constructor(
        private toastr: ToastrService,
        private stockService:StockService,
        private matDialog: MatDialog,
        private matDialogRef: MatDialogRef<StockFormComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.categoryDataList = GLOBAL_LIST.CATEGORY_DATA
        this.stockForm=new FormGroup({
            stockId:new FormControl,
            categoryOBJ:new FormControl({},[Validators.required,]),
            itemName:new FormControl("6X",Validators.required),
            materialColour:new FormControl("Blue",Validators.required),
            quantity:new FormControl(null,Validators.required),
            arrivalDate:new FormControl(null,Validators.required),
            remarks:new FormControl("Latest",Validators.required),
            purchasePrice:new FormControl(null,Validators.required),
            sellingPrice:new FormControl(null,Validators.required),
            reorderQty: new FormControl(20,Validators.required)
        })
    }

   

    setDataIntoFormFields() {
        
        this.stockForm.patchValue({
            stockId:this.data.stockData.stockId,
            // categoryOBJ: this.data.stockData.categoryOBJ,
            itemName: this.data.stockData.itemName,
            materialColour: this.data.stockData.materialColour,
            arrivalDate: this.data.stockData.arrivalDate,
            remarks: this.data.stockData.remarks,
            purchasePrice: this.data.stockData.purchasePrice,
            sellingPrice: this.data.stockData.sellingPrice,
            reorderQty: this.data.stockData.reorderQty,
            quantity:this.data.stockData.quantity
        })
        this.categoryControl.patchValue(this.data.categoryData.categoryId)
    }

    ngOnInit(): void {
        if (this.data.title === "Update") {
            this.setDataIntoFormFields()
        }
        this.filterOptions = this.categoryControl.valueChanges.pipe(
            startWith(''),
            map(value => this.listFilter(value || '')
            )
        )
        
    }
    
    
    private listFilter(value: string): ICategoryEntity[] {
        const searchValue = value.toString().toLowerCase();
        return this.categoryDataList.filter(
            option => 
            option.categoryName.toLowerCase().includes(searchValue) ||
            option.categoryId.toString().toLowerCase().includes(searchValue)
        )
    }
   
    selectOperation() {
        if (this.data.title === "Insert" && this.stockForm.valid ) {
            this.insertPopTrigger();    
           
        } else if (this.data.title == "Update" && this.stockForm.valid){
            this.updatePopTrigger();
        }
        
    }

    insertPopTrigger() {
        let stockFormValue = this.stockForm.value;
        stockFormValue.categoryOBJ = {categoryId:this.categoryControl.value};
        this.stockForm.value.arrivalDate = moment(new Date(stockFormValue.arrivalDate)).toISOString();
        console.log("stockFormVal", stockFormValue)
        const extraData = {
            title: "Insert",
            subTitle: "are you sure you want to add this data?",
        }
        const openActionPop = this.matDialog.open(ActionPopComponent, { data: extraData })
        openActionPop.afterClosed().subscribe((state:boolean) => {
            if(!state)return;
            this.stockService.regiterReq(this.stockForm.value).subscribe(res=>{
            
            this.matDialogRef.close()
            this.toastr.success(res)
        })
           
        })
        

    }

    updatePopTrigger() {
        
        let newlySelectedCategoryId = this.categoryControl.value
        let stockFormValue = this.stockForm.value;
        stockFormValue.categoryOBJ = {categoryId:newlySelectedCategoryId}
        const extraData = {
            title: this.data.title,
            subTitle: "are you sure you want to update the selected data?",
        }
        const openActionPop = this.matDialog.open(ActionPopComponent, { data: extraData })
        openActionPop.afterClosed().subscribe((state:boolean) => {
            if(!state)return;
            this.stockService.update(this.stockForm.value).subscribe((res)=>{
                
                this.matDialogRef.close()
                this.toastr.success(res)
            
            })
        })

    }

    //--------------- Form Validation------------------

    // doNotAddSpace(control: FormControl) {
    //     if(control.value!= "" && control.value.indexOf(' ') != -1) {
    //         console.log( control)
    //         return control
    //         // return { noSpace: true };
    //     }else{
    //         return null;
    //     }
    // }
}
