import { AfterContentInit, Component, Injector, OnInit, ViewChild } from '@angular/core';
import { takeUntil, tap } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { Gender } from 'base/constants/Gender';
import { UserTypes } from 'base/constants/UserTypes';
import { Stations } from 'base/Data/Stations';
import { BaseService } from 'base/services/base.service';
import { DataEntryController } from 'base/APIs/DataEntryController';
import { LocalStorageEnum } from 'base/enums/LocalStorageEnum.enum';
import { RejectDataEntryComponent } from './reject-data-entry/reject-data-entry.component';
import { LocationController } from 'base/APIs/LocationController';
import { CountryController } from 'base/APIs/CountryController';

@Component({
  selector: 'app-data-entry-list',
  templateUrl: './data-entry-list.component.html',
  styleUrls: ['./data-entry-list.component.scss']
})
export class DataEntryListComponent extends BaseService implements OnInit, AfterContentInit {
  form: FormGroup = null;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  countries: any[] = [];
  locations: any[] = [];

  displayedColumns: string[] = [
    'data.id',
    'data.name',
    'data.companyName',
    'data.nid',
    'data.phoneNumber',
    'data.country',
    'data.location',
    'data.registrationDate',
    'data.companyRejectionReason',
    'data.dataEntryRejectionReason',
    'data.status',
    'data.actions',
  ];
  dataSource: any = [];
  totalCount: number = 0;
  body: any = {};
  viewType: 'Grid' | 'Card' = 'Grid';
  dialog: any;
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
    this.GetAllByCompanyId();
  }
  ngAfterContentInit(): void {
  }

  ngOnInit() {
    this.getLookups();
  }

  initForm() {
    this.form = this.fb.group({
      countryIds: new FormControl<number[]>([]),
      locationIds: new FormControl<number[]>([]),
      status: new FormControl<number[]>([]),
      searchKey: new FormControl<string>(''),
      registrationDateFrom: new FormControl<Date>(null),
      registrationDateTo: new FormControl<Date>(null),
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
      companyId: this.GetCompanyID(),
      registrationDateFrom: this.datepipe.transform(this.form?.value['registrationDateFrom'], 'yyyy-MM-dd'),
      registrationDateTo: this.datepipe.transform(this.form?.value['registrationDateTo'], 'yyyy-MM-dd'),
    };
    return this.body;
  }

  GetAllByCompanyId() {
    this.spinnerService.show();
    var body = this.setForm();
    console.log(body);
    this.httpService.POST(`${DataEntryController.GetAllByCompanyId}`, body).subscribe({
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

  getLookups() {
    this.GetAllLocations();
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

  approve(record: any) {
    this.spinnerService.show();
    this.httpService.POST(`${DataEntryController.AcceptDataEntry}/${record.id}`).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          this.dataSource = res.data;
          this.GetAllByCompanyId();
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

  submitApprove(record: any) {
    this.swalService.alertApproval(() => {
      this.approve(record);
    });
  }


  reject(data: any) {
    this.dialog.open(RejectDataEntryComponent, { data: data })
      .afterClosed()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data: any) => {
        if (data) {
          this.GetAllByCompanyId();
        }
      });
  }

  handlePaginator(paginator: MatPaginator) {
    console.log(paginator);
    this.GetAllByCompanyId();
  }
}
