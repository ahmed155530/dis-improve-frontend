import { Component, Inject, Injector, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Gender } from 'base/constants/Gender';
import { BaseService } from 'base/services/base.service';

@Component({
  selector: 'app-add-edit-data',
  templateUrl: './add-edit-data.component.html',
  styleUrls: ['./add-edit-data.component.scss']
})
export class AddEditDataComponent extends BaseService implements OnInit {
  form: FormGroup;
  countries: any[] = [];
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
      username: new FormControl<string>('', Validators.compose([Validators.required])),
      companyId: new FormControl<number>(null, Validators.compose([Validators.required])),
      countryId: new FormControl<number>(null, Validators.compose([Validators.required])),
      nid: new FormControl<string>('', Validators.compose([Validators.required])),
      phoneNumber: new FormControl<string>('', Validators.compose([Validators.required])),
    });
  }

  Submit() {
    var data: any = {};
    if (this.model === 'create') {
      data = {
        name: this.form?.value['name'],
        username: this.form?.value['username'],
        nid: this.form?.value['nid'],
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
    // this.httpService.POST(AdminQualityControlUserController.AddQualityControlAppUser, data).subscribe({
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
    this.GetAllStations();
  }

  GetAllStations() {
    // this.spinnerService.show();
    // this.httpService.GET(LookupsController.GetAllStations).subscribe({
    //   next: (res) => {
    //     if (res.isSuccess) {
    //       this.stations = res.data;
    //       this.spinnerService.hide();
    //     }
    //   },
    //   error: (err: Error) => {
    //     this.spinnerService.hide();
    //   },
    //   complete: () => {
    //     this.spinnerService.hide();
    //   }
    // });
  }

}