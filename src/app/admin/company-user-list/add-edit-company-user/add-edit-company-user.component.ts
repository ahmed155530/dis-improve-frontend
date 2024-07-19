import { Component, Inject, Injector, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AddEditAdminComponent } from 'app/admin/admin-list/add-edit-admin/add-edit-admin.component';
import { CompanyController } from 'base/APIs/CompanyController';
import { CountryController } from 'base/APIs/CountryController';
import { UserController } from 'base/APIs/UserController';
import { Gender } from 'base/constants/Gender';
import { BaseService } from 'base/services/base.service';

@Component({
  selector: 'app-add-edit-company-user',
  templateUrl: './add-edit-company-user.component.html',
  styleUrls: ['./add-edit-company-user.component.scss']
})
export class AddEditCompanyUserComponent extends BaseService implements OnInit {
  form: FormGroup;
  Genders = Gender;
  countries: any[] = [];
  companies: any[] = [];
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
      companyId: new FormControl<number>(null, Validators.compose([Validators.required])),
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
        companyId: this.form?.value['companyId'],
        phoneNumber: this.form?.value['phoneNumber'],
        userTypeId: 2,
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
        phoneNumber: this.form?.value['phoneNumber'],
        countryId: this.form?.value['countryId'],
        companyId: this.form?.value['companyId'],
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
      companyId: this.defaults['companyId'],
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
    this.GetAllCompanies();
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

  GetAllCompanies() {
    this.spinnerService.show();
    this.httpService.GET(CompanyController.GetAllCompanies).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          this.companies = res.data;
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