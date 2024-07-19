import { Component, Inject, Injector, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CountryController } from 'base/APIs/CountryController';
import { UserController } from 'base/APIs/UserController';
import { Gender } from 'base/constants/Gender';
import { BaseService } from 'base/services/base.service';

@Component({
  selector: 'app-add-edit-admin',
  templateUrl: './add-edit-admin.component.html',
  styleUrls: ['./add-edit-admin.component.scss']
})
export class AddEditAdminComponent extends BaseService implements OnInit {
  form: FormGroup;
  Genders = Gender;
  countries: any[] = [];
  stations: any[] = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<AddEditAdminComponent>,
    public override injector: Injector,
  ) {
    super(injector);
  }

  ngOnInit() {
    this.initForm();
    this.getLookups();
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
      idNumber: new FormControl<string>('', Validators.compose([Validators.required])),
      email: new FormControl<string>('', Validators.compose([Validators.required])),
      phoneNumber: new FormControl<string>('', Validators.compose([Validators.required])),
      countryId: new FormControl<number>(null, Validators.compose([Validators.required])),
    });
  }

  Submit() {
    var data: any = {};
    if (this.model === 'create') {
      data = {
        name: this.form?.value['name'],
        idNumber: this.form?.value['idNumber'],
        email: this.form?.value['email'],
        countryId: this.form?.value['countryId'],
        phoneNumber: this.form?.value['phoneNumber'],
        userTypeId: 3,
        password: '123456',
      };
      this.Create(data);
    }
    if (this.model === 'update') {
      data = {
        id: this.form?.value['id'],
        name: this.form?.value['name'],
        idNumber: this.form?.value['idNumber'],
        email: this.form?.value['email'],
        countryId: this.form?.value['countryId'],
        phoneNumber: this.form?.value['phoneNumber'],
        userTypeId: 3
      };
      this.Update(data);
    }
  }

  setFormData() {
    this.form.patchValue({
      id: this.defaults['id'],
      name: this.defaults['name'],
      idNumber: this.defaults['idNumber'],
      email: this.defaults['email'],
      countryId: this.defaults['countryId'],
      phoneNumber: this.defaults['phoneNumber'],
    });
    this._ref.detectChanges();
  }

  Create(data: any) {
    this.spinnerService.show();
    this.httpService.POST(UserController.RegisterUser, data).subscribe({
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
    this.httpService.PUT(UserController.UpdateUser, data).subscribe({
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

  getLookups() {
    this.GetAllCountries();
  }

  GetAllCountries() {
    this.spinnerService.show();
    this.httpService.GET(CountryController.GetAllCountries).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          this.countries = res.data;
          this.spinnerService.hide();
        }
      },
      error: (err: Error) => {
        this.spinnerService.hide();
      },
      complete: () => {
        this.spinnerService.hide();
      }
    });
  }

}