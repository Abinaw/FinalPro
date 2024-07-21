import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { EmailService } from 'src/app/service/email-service/email.service';

@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.css']
})
export class EmailFormComponent {


emailForm:FormGroup;
isLoading:boolean = false; 



constructor( 
    @Inject(MAT_DIALOG_DATA) public data: { reportPic: HTMLElement },
    private matDialogRef:MatDialogRef<EmailFormComponent>,
    private emailService: EmailService,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef,
){
    this.emailForm = new FormGroup({
        emailId: new FormControl(('kabilankrishna5@gmail.com')),
        title:new FormControl,
        subject: new FormControl,
    })
}

    async sendEmail() {
        const generatedReport = this.data.reportPic;
        if (generatedReport) {
          this.isLoading = true;
          this.cdr.detectChanges();
          try {
            const { emailId, title, subject } = this.emailForm.value;
            await this.emailService.onClickSendMail(generatedReport, emailId, title, subject)
            this.toastr.success("Success");
            this.matDialogRef.close()
            return
          } catch (error) {
            this.toastr.error('Error occurred while sending email');
          } finally {
            this.isLoading = false;
            this.cdr.detectChanges();
          }
        } else {
          this.toastr.warning('Please generate report to send mail.', 'No PDF found');
        }
      }
}
