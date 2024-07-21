import { AfterContentInit, Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { CompanyController } from 'base/APIs/CompanyController';
import { CountryController } from 'base/APIs/CountryController';
import { DataEntryController } from 'base/APIs/DataEntryController';
import { LocationController } from 'base/APIs/LocationController';
import { UserTypes } from 'base/constants/UserTypes';
import { BaseService } from 'base/services/base.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-data-entries-characteristics-list',
  templateUrl: './data-entries-characteristics-list.component.html',
  styleUrls: ['./data-entries-characteristics-list.component.scss']
})
export class DataEntriesCharacteristicsListComponent extends BaseService implements OnInit, AfterContentInit {
  form: FormGroup = null;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  UserTypes = UserTypes;

  countries: any[] = [];
  locations: any[] = [];
  companies: any[] = [];

  displayedColumns: string[] = [
    'data.id',
    'data.name',
    'data.companyName',
    'data.nid',
    'data.phoneNumber',
    'data.country',
    'data.location',
    'data.notes',
    'data.rejectionReason',

    'data.createdBy',
    'data.registrationDate',

    'data.updatedBy',
    'data.updateDate',
    'data.updateReason',

    'data.deletedBy',
    'data.deleteDate',
    'data.isDeleted',
    'data.deletionReason',

    'data.status',

  ];
  dataSource: any = [];
  totalCount: number = 0;
  body: any = {};
  viewType: 'Grid' | 'Card' = 'Grid';
  base64Data: any;
  constructor(public override injector: Injector

  ) {
    super(injector);
    this.initForm();
    this.setForm();
    if (this.paginator) {
      console.log(this.paginator);
      this.paginator.pageIndex = 0;
      this.paginator.pageSize = 10;
      this.paginator.page.pipe(tap(() => {
      })).subscribe();
    }
    this.GetAll();
  }

  ngAfterContentInit() {

  }

  ngOnInit() {
    this.getLookups();
  }

  initForm() {
    this.form = this.fb.group({
      countryIds: new FormControl<number[]>([]),
      locationIds: new FormControl<number[]>([]),
      companyIds: new FormControl<number[]>([]),
      status: new FormControl<number[]>([]),
      searchKey: new FormControl<string>(''),
      registrationDateFrom: new FormControl<Date>(null),
      registrationDateTo: new FormControl<Date>(null),
    });
  }

  handlePaginator(paginator: MatPaginator) {
    console.log(paginator);
    this.GetAll();
  }

  GetAll() {
    this.spinnerService.show();
    var body = this.setForm();
    console.log(body);
    this.httpService.POST(`${DataEntryController.GetAll}`, body).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          this.dataSource = res.data.items;
          this.totalCount = res.data.totalCount;
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

  exportToExcel() {
    this.spinnerService.show();
    var body = this.setForm();
    this.httpService.POST(DataEntryController.ExportAllDataEntries, body).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          this.base64Data = res.data;
          this.downloadFile();
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

  setForm(): any {
    this.body = {
      paginatorModel: {
        pageNumber: this.paginator?.pageIndex ? this.paginator?.pageIndex + 1 : 1,
        pageSize: this.paginator?.pageSize ?? 10,
      },
      searchKey: this.form?.value['searchKey'],
      countryIds: this.form?.value['countryIds'],
      locationIds: this.form?.value['locationIds'],
      companyIds: this.form?.value['companyIds'],
      registrationDateFrom: this.datepipe.transform(this.form?.value['registrationDateFrom'], 'yyyy-MM-dd'),
      registrationDateTo: this.datepipe.transform(this.form?.value['registrationDateTo'], 'yyyy-MM-dd'),
    };
    return this.body;
  }

  downloadFile() {
    this.spinnerService.show();
    const src = `data:text/csv;base64,${this.base64Data}`;
    const link = document.createElement("a");
    link.href = src;
    link.download = `All data entries_${this.datepipe.transform(new Date(), 'yyyy-MM-dd hh:mm:ss')}`;
    link.click();
    this.spinnerService.hide();
  }

  getLookups() {
    this.GetAllLocations();
    this.GetAllCompanies();
    this.GetAllCountries();
  }

  GetAllLocations() {
    this.httpService.GET(LocationController.GetAllLocations).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          this.locations = res.data;
          this.spinnerService.hide();
        }
      },
      error: (err: Error) => {
      },
      complete: () => {
      }
    });
  }

  GetAllCompanies() {
    this.httpService.GET(CompanyController.GetAllCompanies).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          this.companies = res.data;
        }
      },
      error: (err: Error) => {
      },
      complete: () => {
      }
    });
  }

  GetAllCountries() {
    this.httpService.GET(CountryController.GetAllCountries).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          this.countries = res.data;
        }
      },
      error: (err: Error) => {
      },
      complete: () => {
      }
    });
  }

}
