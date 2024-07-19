import { Component, Inject, Injector, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CountryController } from 'base/APIs/CountryController';
import { LocationController } from 'base/APIs/LocationController';
import { UserController } from 'base/APIs/UserController';
import { Gender } from 'base/constants/Gender';
import { BaseService } from 'base/services/base.service';

@Component({
  selector: 'app-add-edit-location',
  templateUrl: './add-edit-location.component.html',
  styleUrls: ['./add-edit-location.component.scss']
})
export class AddEditLocationComponent extends BaseService implements OnInit {
  form: FormGroup;
  Genders = Gender;
  countries: any[] = [];
  stations: any[] = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<AddEditLocationComponent>,
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
      name: new FormControl<string>('', Validators.compose([Validators.required])),
    });
  }

  Submit() {
    var data: any = {};
    if (this.model === 'create') {
      data = {
        name: this.form?.value['name'],
      };
      this.Create(data);
    }
    if (this.model === 'update') {
      data = {
        id: this.form?.value['id'],
        name: this.form?.value['name'],
      };
      this.Update(data);
    }
  }

  setFormData() {
    this.form.patchValue({
      id: this.defaults['id'],
      name: this.defaults['name'],
    });
    this._ref.detectChanges();
  }

  Create(data: any) {
    this.spinnerService.show();
    this.httpService.POST(LocationController.AddLocation, data).subscribe({
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
    this.httpService.PUT(`${LocationController.UpdateLocation}/${data.id}`, data).subscribe({
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