import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActionPopComponent } from 'src/app/custom-components/action-cell/action-pop/action-pop.component';
import { CategoryActionComponent } from 'src/app/custom-components/action-cell/category-action/category-action.component';
import { CetegoryService } from 'src/app/service/category-service/cetegory.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css','../form-design.css']
})
export class CategoryFormComponent {
    categoryForm!: FormGroup;
    hide: boolean = true;
    allData: any;
   
   
    constructor(
        private catService:CetegoryService,
        private matDialog: MatDialog,
        private matDialogRef: MatDialogRef<CategoryFormComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.categoryForm=new FormGroup({
            categoryId:new FormControl,
            categoryName:new FormControl(null,Validators.required),
            description:new FormControl(null,Validators.required)
           
        })
    }

   

    setDataIntoFormFields() {
    //    console.log(this.data)
        return this.categoryForm.setValue({
            categoryId:this.data.catData.categoryId,
            categoryName: this.data.catData.categoryName,
            description:this.data.catData.description,
           
        })
    }

    ngOnInit(): void {
       
        if (this.data.title === "Update") {
            this.setDataIntoFormFields()
        }
    }
    
    

    selectOperation() {
        if (this.data.title === "Insert" && this.categoryForm.valid) {
            this.insertPopTrigger();
           
        } else if (this.data.title == "Update" && this.categoryForm.valid){
            this.updatePopTrigger();
        }
        
    }
    insertPopTrigger() {
       
        const extraData = {
            title: "Insert",
            subTitle: "are you sure you want to add this data?",
        }
        const openActionPop = this.matDialog.open(ActionPopComponent, { data: extraData })
        openActionPop.afterClosed().subscribe((state:boolean) => {
            if(!state)return;
            this.catService.regiterReq(this.categoryForm.value).subscribe(res=>{
                console.log(res)
                this.matDialogRef.close()
        })
           
        })
        

    }

    updatePopTrigger() {
        const extraData = {
            title: this.data.title,
            subTitle: "are you sure you want to update the selected data?",
          
        }
        const openActionPop = this.matDialog.open(ActionPopComponent, { data: extraData })
        openActionPop.afterClosed().subscribe((state:boolean) => {
            if(!state)return;
            this.catService.update(this.categoryForm.value).subscribe((res)=>{
                this.matDialogRef.close()
                console.log(res)
            })
        })

    }
}
