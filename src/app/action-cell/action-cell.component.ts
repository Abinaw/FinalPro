import { Component } from '@angular/core';
import { GridApi, ICellRendererParams } from 'ag-grid';

@Component({
  selector: 'app-action-cell',
  templateUrl: './action-cell.component.html',
  styleUrls: ['./action-cell.component.css'],
  template: '',
})
export class ActionCellComponent {

   

    agInit(params:ICellRendererParams): void {
      
    }
}
