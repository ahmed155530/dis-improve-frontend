import { AfterContentInit, Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { BaseService } from 'base/services/base.service';
import { takeUntil, tap } from 'rxjs';
import { AddEditDataComponent } from './add-edit-data/add-edit-data.component';
import { DataEntryController } from 'base/APIs/DataEntryController';
import { RejectRejectionReasonComponent } from './reject-rejection-reason/reject-rejection-reason.component';
import { CountryController } from 'base/APIs/CountryController';
import { CompanyController } from 'base/APIs/CompanyController';

@Component({
  selector: 'app-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.scss']
})
export class DataListComponent extends BaseService implements OnInit, AfterContentInit {
  form: FormGroup = null;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  countries: any[] = [];
  companies: any[] = [];
  displayedColumns: string[] = [
    'data.id',
    'data.name',
    'data.companyName',
    'data.nid',
    'data.phoneNumber',
    'data.country',
    'data.registrationDate',
    'data.companyRejectionReason',
    'data.dataEntryRejectionReason',
    'data.notes',
    'data.status',
    'data.actions',
  ];
  dataSource: any = [];
  totalCount: number = 0;
  body: any = {};
  viewType: 'Grid' | 'Card' = 'Grid';
  constructor(public override injector: Injector

  ) {
    super(injector);
  }
  ngAfterContentInit(): void {
    this.initForm();
    this.setForm();
    if (this.paginator) {
      console.log(this.paginator);
      this.paginator.pageIndex = 0;
      this.paginator.pageSize = 10;
      this.paginator.page.pipe(tap(() => {
      })).subscribe();
    }
    this.GetAllByLocationId();
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


  setForm(): any {
    this.body = {
      paginatorModel: {
        pageNumber: this.paginator?.pageIndex ? this.paginator?.pageIndex + 1 : 1,
        pageSize: this.paginator?.pageSize ?? 10,
      },
      searchKey: this.form?.value['searchKey'],
      countryIds: this.form?.value['countryIds'],
      companyIds: this.form?.value['companyIds'],
      locationId: this.GetLocationId(),
      registrationDateFrom: this.datepipe.transform(this.form?.value['registrationDateFrom'], 'yyyy-MM-dd'),
      registrationDateTo: this.datepipe.transform(this.form?.value['registrationDateTo'], 'yyyy-MM-dd'),
    };
    return this.body;
  }

  createObject() {
    this.dialog.open(AddEditDataComponent)
      .afterClosed()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((adminDTO: any) => {
        if (adminDTO) {
          this.GetAllByLocationId();
        }
      });
  }

  Update(data: any) {
    this.dialog.open(AddEditDataComponent, { data: data })
      .afterClosed()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((adminDTO: any) => {
        if (adminDTO) {
          this.GetAllByLocationId();
        }
      });
  }

  submitDelete(adminDTO: any) {
    this.swalService.alertDelete(() => {
      this.deleteDataEntry(adminDTO);
    });
  }

  deleteDataEntry(dataEntryDTO: any) {
    console.log(dataEntryDTO);
    this.spinnerService.show();
    this.httpService.DELETE(`${DataEntryController.DeleteDataEntry}/${dataEntryDTO.id}`).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          this.GetAllByLocationId();
        }
      },
      error: (err: Error) => {
        this.swalService.alertWithError('ErrorOccured');
        this.spinnerService.hide();
      },
      complete: () => {
        this.spinnerService.hide();
      }
    });
  }


  complete(record: any) {
    this.spinnerService.show();
    this.httpService.POST(`${DataEntryController.CompleteDataEntry}/${record.id}`).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          this.GetAllByLocationId();
          this.spinnerService.hide();
        }
      },
      error: (err: Error) => {
        this.swalService.alertWithError('ErrorOccured');
        this.spinnerService.hide();
      },
      complete: () => {
        this.spinnerService.hide();
      }
    });
  }

  submitComplete(record: any) {
    this.swalService.alertComplete(() => {
      this.complete(record);
    });
  }

  handlePaginator(paginator: MatPaginator) {
    console.log(paginator);
    this.GetAllByLocationId();
  }

  GetAllByLocationId() {
    this.spinnerService.show();
    var body = this.setForm();
    this.httpService.POST(`${DataEntryController.GetAllByLocationId}`, body).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          this.dataSource = res.data.items;
          this.totalCount = res.data.totalCount;
          this.spinnerService.hide();
        }
      },
      error: (err: Error) => {
        this.swalService.alertWithError('ErrorOccured');
        this.spinnerService.hide();
      },
      complete: () => {
        this.spinnerService.hide();
      }
    });
  }

  rejectRejection(data: any) {
    this.dialog.open(RejectRejectionReasonComponent, { data: data })
      .afterClosed()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((adminDTO: any) => {
        if (adminDTO) {
          this.GetAllByLocationId();
        }
      });
  }

  getLookups() {
    this.GetAllCompanies();
    this.GetAllCountries();
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
