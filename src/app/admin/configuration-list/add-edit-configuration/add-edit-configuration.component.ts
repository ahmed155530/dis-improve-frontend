import { Component, Inject, Injector, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConfigurationController } from 'base/APIs/ConfigurationController';
import { Gender } from 'base/constants/Gender';
import { BaseService } from 'base/services/base.service';

@Component({
  selector: 'app-add-edit-configuration',
  templateUrl: './add-edit-configuration.component.html',
  styleUrls: ['./add-edit-configuration.component.scss']
})
export class AddEditConfigurationComponent extends BaseService implements OnInit {
  form: FormGroup;
  Genders = Gender;
  countries: any[] = [];
  stations: any[] = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<AddEditConfigurationComponent>,
    public override injector: Injector,
  ) {
    super(injector);
  }

  ngOnInit() {
    this.initForm();
    if (this.defaults) {
      this.model = 'update';
      this.setFormData();
    }
    else {
      this.model = 'create';
    }
  }

  initForm() {
    this.form = this.fb.group({
      id: new FormControl<number>(0),
      name: new FormControl<string>(''),
      value: new FormControl<number>(null, Validators.compose([Validators.required, Validators.min(1)])),
    });
  }

  Submit() {
    var data: any = {};
    if (this.model === 'create') {
      data = {
        name: this.form?.value['name'],
        value: this.form?.value['value'],
      };
      this.Create(data);
    }
    if (this.model === 'update') {
      data = {
        id: this.form?.value['id'],
        name: this.form?.value['name'],
        value: this.form?.value['value'],
      };
      this.Update(data);
    }
  }

  setFormData() {
    this.form.patchValue({
      id: this.defaults['id'],
      name: this.defaults['name'],
      value: this.defaults['value'],
    });
    this._ref.detectChanges();
  }

  Create(data: any) {
    this.spinnerService.show();
    this.httpService.POST(ConfigurationController.AddConfiguration, data).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          this.spinnerService.hide();
          this.swalService.alertWithSuccess(res.message ?? '');
          this.dialogRef.close(true);
        }
        else
          this.swalService.alertWithError(res.message ?? '');
        this.spinnerService.hide();
      }, error: (error: Error) => this.spinnerService.hide()
    });
  }

  Update(data: any) {
    this.spinnerService.show();
    this.httpService.PUT(ConfigurationController.UpdateConfiguration, data).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          this.spinnerService.hide();
          this.swalService.alertWithSuccess(res.message ?? '');
          this.dialogRef.close(true);
        }
        else
          this.swalService.alertWithError(res.message ?? '');
        this.spinnerService.hide();
      }, error: (error: Error) => this.spinnerService.hide()
    });
  }

  isCreateMode() {
    return this.model === 'create';
  }

  isUpdateMode() {
    return this.model === 'update';
  }

}