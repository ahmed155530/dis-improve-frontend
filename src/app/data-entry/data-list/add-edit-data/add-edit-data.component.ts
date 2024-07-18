import { Component, Inject, Injector, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CompanyController } from 'base/APIs/CompanyController';
import { CountryController } from 'base/APIs/CountryController';
import { DataEntryController } from 'base/APIs/DataEntryController';
import { Gender } from 'base/constants/Gender';
import { BaseService } from 'base/services/base.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-edit-data',
  templateUrl: './add-edit-data.component.html',
  styleUrls: ['./add-edit-data.component.scss']
})
export class AddEditDataComponent extends BaseService implements OnInit {
  form: FormGroup;
  countries: any[] = [];
  selectedCountries: any[] = [];
  companies: any[] = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<AddEditDataComponent>,
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
      userName: new FormControl<string>('', Validators.compose([Validators.required])),
      companyId: new FormControl<number>(null, Validators.compose([Validators.required])),
      countryId: new FormControl<number>(null, Validators.compose([Validators.required])),
      iDNumber: new FormControl<string>('', Validators.compose([Validators.required])),
      phoneNumber: new FormControl<string>('', Validators.compose([Validators.required])),
      //searchCountry: new FormControl<string>(''),
    });
  }

  Submit() {
    var data: any = {};
    if (this.model === 'create') {
      data = {
        name: this.form?.value['name'],
        userName: this.form?.value['userName'],
        iDNumber: this.form?.value['iDNumber'],
        companyId: this.form?.value['companyId'],
        countryId: this.form?.value['countryId'],
        phoneNumber: this.form?.value['phoneNumber'],
      };
      this.Create(data);
    }
    if (this.model === 'update') {
      data = {
        id: this.form?.value['id'],
        name: this.form?.value['name'],
        username: this.form?.value['username'],
        nid: this.form?.value['nid'],
        companyId: this.form?.value['companyId'],
        countryId: this.form?.value['countryId'],
        phoneNumber: this.form?.value['phoneNumber'],
      };
      this.Update(data);
    }
  }

  setFormData() {
    this.form.patchValue({
      id: this.defaults['id'],
      name: this.form?.value['name'],
      username: this.form?.value['username'],
      nid: this.form?.value['nid'],
      companyId: this.form?.value['companyId'],
      countryId: this.form?.value['countryId'],
      phoneNumber: this.form?.value['phoneNumber'],
    });
    this._ref.detectChanges();
  }

  Create(data: any) {
    this.spinnerService.show();
    this.httpService.POST(DataEntryController.AddDataEntry, data).subscribe({
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
    // this.spinnerService.show();
    // this.httpService.PUT(AdminQualityControlUserController.UpdateQualityControlAppUser, data).subscribe({
    //   next: (res) => {
    //     if (res.isSuccess) {
    //       this.spinnerService.hide();
    //       this.swalService.alertWithSuccess(res.message ?? '');
    //       this.dialogRef.close(true);
    //     }
    //     else
    //       this.swalService.alertWithError(res.message ?? '');
    //     this.spinnerService.hide();
    //   }, error: (error: Error) => this.spinnerService.hide()
    // });
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
          this.selectedCountries = res.data;
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


  searchCountry(event: any) {
    console.log(event);
    console.log(event.key);
    this.form?.patchValue({ searchCountry: this.form?.value.searchCountry + event.key });
    console.log(this.form?.value.searchCountry);
    this.selectedCountries = [];
    if (this.form?.value.searchCountry !== '') {
      this.countries.forEach((element: any) => {
        if (element.name.includes(this.form?.value.searchCountry)) {
          this.selectedCountries.push(element);
        }
      });
    }
    if (this.form.value.searchCountry === '') {
      this.selectedCountries = this.countries;
    }
  }

}