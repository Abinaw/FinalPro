import { Component } from '@angular/core';
import { ICategoryEntity } from '../../interfaces/ICategoryEntity';
import { GLOBAL_LIST } from 'src/app/constants/GlobalLists';
import { IStockEntity } from '../../interfaces/IStockEntity';

@Component({
  selector: 'app-product-selection-to-cart',
  templateUrl: './product-selection-to-cart.component.html',
  styleUrls: ['./product-selection-to-cart.component.css']
})
export class ProductSelectionToCartComponent {
     products!: IStockEntity[];
     catData! :ICategoryEntity[] 
    
    constructor(){
        this.products = GLOBAL_LIST.STOCK_DATA;
        // this.catData = 
        // console.log("category data ",this.catData)
        console.log("stock data", this.products)
    }


}
