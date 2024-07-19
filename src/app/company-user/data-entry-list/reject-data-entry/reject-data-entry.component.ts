import { Component, Inject, Injector, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CompanyController } from 'base/APIs/CompanyController';
import { CountryController } from 'base/APIs/CountryController';
import { DataEntryController } from 'base/APIs/DataEntryController';
import { LocationController } from 'base/APIs/LocationController';
import { BaseService } from 'base/services/base.service';

@Component({
  selector: 'app-reject-data-entry',
  templateUrl: './reject-data-entry.component.html',
  styleUrls: ['./reject-data-entry.component.scss']
})
export class RejectDataEntryComponent extends BaseService implements OnInit {
  form: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<RejectDataEntryComponent>,
    public override injector: Injector,
  ) {
    super(injector);
  }


  ngOnInit() {
    this.initForm();
    this.setFormData();
  }

  initForm() {
    this.form = this.fb.group({
      dataEntryId: new FormControl<number>(0),
      rejectionReason: new FormControl<string>('', Validators.compose([Validators.required])),
    });
  }

  Submit() {
    var data: any = {};
      data = {
        dataEntryId: this.form?.value['dataEntryId'],
        rejectionReason: this.form?.value['rejectionReason'],
      };
      this.Create(data);
  }

  setFormData() {
    this.form.patchValue({
      dataEntryId: this.defaults['id']
    });
    this._ref.detectChanges();
  }

  Create(data: any) {
    this.spinnerService.show();
    this.httpService.POST(DataEntryController.RejectDataEntry, data).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          this.spinnerService.hide();
          this.swalService.alertWithSuccess(res.message ?? '');
          this.dialogRef.close(true);
        }
        else {
          this.swalService.alertWithError(res.message ?? '');
          this.dialogRef.close(false);
        }
        this.spinnerService.hide();
      }, error: (error: Error) => this.spinnerService.hide()
    });
  }
}