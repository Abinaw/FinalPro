import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from 'src/app/service/notification-service/notification.service';
import { RestoreService } from 'src/app/service/restore-service/restore.service';

@Component({
  selector: 'app-backup',
  templateUrl: './backup.component.html',
  styleUrls: ['./backup.component.css']
})
export class BackupComponent {
isLoading = false

    uploadForm: FormGroup;

  constructor(private fb: FormBuilder, private restoreService:RestoreService,
    private toastr:ToastrService,
    private cdr: ChangeDetectorRef,
    private notificationService:NotificationService) {
    this.uploadForm = this.fb.group({
      file: [null]
    });
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.uploadForm.patchValue({ file });
    }
  }

  onUpload(): void {
    const file: File | null = this.uploadForm.get('file')?.value;
    if (file) {
      console.log('File ready to upload:', file);
      this.isLoading = true;
        this.cdr.detectChanges()
      // Call your service to handle the upload
      this.restoreService.restoreDatabase(file).subscribe({
        next: (res) => {
          console.log(res);
          this.toastr.success('Restore successful');
        },
        error: (err) => {
          this.toastr.error('Restore failed');
          console.error(err);
        },
        complete: () => {
          this.isLoading = false;
          this.cdr.detectChanges()
          this.notificationService.fetchnotificationData()
        }
      });
    } else {
      console.log('No file selected.');
    }
  }
}
