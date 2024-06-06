import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import {  ToastrService } from 'ngx-toastr';
import { GLOBAL_LIST } from 'src/app/constants/GlobalLists';
import { IPaymentEntity } from 'src/app/constants/interfaces/IPaymentEntity';
import { ActionPopComponent } from 'src/app/custom-components/action-cell/action-pop/action-pop.component';
import { PaymentsService } from 'src/app/service/payments-service/payments.service';

@Component({
  selector: 'app-invoice-payment',
  templateUrl: './invoice-payment.component.html',
  styleUrls: ['./invoice-payment.component.css']
})
export class InvoicePaymentComponent {


    paymentOptions: any[] = [
        {value: 'cash', viewValue: 'Cash'},
        {value: 'cheque', viewValue: 'Cheque'},
        {value: 'card', viewValue: 'Debit/Credit Card'}
      ];
    selectedOption!: String;
    invoicePaymentForm!: FormGroup<any>;
    isValid!:Boolean
    paymentsList :IPaymentEntity[] = []
    constructor(
        private dialogRef:MatDialogRef<InvoicePaymentComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private toastr : ToastrService,
        private paymentService: PaymentsService,
        private matDialog : MatDialog)
    {
        this.isValid = false
        this.invoicePaymentForm = new FormGroup({
            paymentType: new FormControl(null,Validators.required),
            cardRefNo: new FormControl(0,Validators.required),
            paidAmount: new FormControl(0.00, Validators.required),
            chequeRefNo: new FormControl(null, Validators.required),
            chequeDueDate:new FormControl( new Date().toISOString().substring(0, 10),Validators.required),
            paidDate:new FormControl( new Date().toISOString().substring(0, 10)),
        })
    }

    payableAmountValidate() {
       
        const amountInput = this.invoicePaymentForm.get('paidAmount')
        amountInput?.valueChanges.subscribe((enteredAmount)=>{
            this.loadAllPayment()
            if (enteredAmount && (enteredAmount) > this.data.balanceAmount){
                if (this.paymentsList.length >0){
                    this.toastr.clear()
                    this.toastr.warning("The amount exceeds the Balance Amount "+this.data.balanceAmount)
                    this.isValid = false
                    return
                }else{
                    this.toastr.clear()
                    this.toastr.warning("The amount exceeds the Total "+this.data.balanceAmount)
                    this.isValid = false
                    return
                }
            }else if (enteredAmount && enteredAmount<=0){
                this.toastr.clear()
                this.toastr.warning("Amount can't be less or equal to 0")
                this.isValid = false
                amountInput?.setValue(null) 
            }else if(enteredAmount == null){
                this.isValid = false
            }else if(enteredAmount && enteredAmount > 0 && enteredAmount <= this.data.balanceAmount){
                this.isValid = true
            }
        })

      
    }


    getTotalPaidAmount(){
        let totalPaidAmount = 0;
        console.log("PaymentList ", this.paymentsList)
        if(this.paymentsList.length > 0 ){
              totalPaidAmount = this.paymentsList.reduce((accumulator,currentValue)=>accumulator+currentValue.paidAmount,0)
             console.log("totalPaidAmount ",totalPaidAmount)
        }
        return totalPaidAmount
    }

    payAdvance() {
        let paymentData = this.invoicePaymentForm.value;
        paymentData.salesInvoice = this.data.invoiceData;
        console.log("paymentData: ",paymentData)
        const extraData = {
            title: "Make a Payment",
            subTitle: "are you sure you want to make a payment?",
        }
        const openAction = this.matDialog.open(ActionPopComponent,{data: extraData,panelClass:['custom-dialog-container']})
        openAction.afterClosed().subscribe((state)=>{
            if(!state) return 
            this.paymentService.addPayment(paymentData).subscribe((paymentRes) => {
                // console.log(paymentRes);
                this.dialogRef.close()
                this.loadAllPayment()
            },(err) => {
    
            })
        })
       
    }


    loadAllPayment(){
        this.paymentService.getAllPayments(this.data.invoiceData.tempInvoiceId).subscribe(retivedData=>{
            GLOBAL_LIST.PAYMENTS_DATA = retivedData?.result
            this.paymentsList = retivedData?.result
            console.log("PaymentsList ", this.paymentsList)
        })
    }

    onNoClick() {
        this.dialogRef.close()
    }
            
}
