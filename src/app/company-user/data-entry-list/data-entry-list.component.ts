import { AfterContentInit, Component, Injector, OnInit, ViewChild } from '@angular/core';
import { takeUntil } from 'rxjs';
import { ApproveDataEntryComponent } from './approve-data-entry/approve-data-entry.component';
import { FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { Gender } from 'base/constants/Gender';
import { UserTypes } from 'base/constants/UserTypes';
import { Stations } from 'base/Data/Stations';
import { BaseService } from 'base/services/base.service';
import { DataEntryController } from 'base/APIs/DataEntryController';
import { LocalStorageEnum } from 'base/enums/LocalStorageEnum.enum';
import { RejectDataEntryComponent } from './reject-data-entry/reject-data-entry.component';

@Component({
  selector: 'app-data-entry-list',
  templateUrl: './data-entry-list.component.html',
  styleUrls: ['./data-entry-list.component.scss']
})
export class DataEntryListComponent extends BaseService implements OnInit, AfterContentInit {
  form: FormGroup = null;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  UserTypes = UserTypes;
  Genders = Gender;
  displayedColumns: string[] = [
    'data.id',
    'data.name',
    'data.companyName',
    'data.nid',
    'data.phoneNumber',
    'data.country',
    'data.location',
    'data.registrationDate',
    'data.status',
    'data.actions',
  ];
  dataSource: any = [];
  stations: any[] = Stations;
  totalCount: number = 0;

  viewType: 'Grid' | 'Card' = 'Grid';
  dialog: any;
  constructor(public override injector: Injector

  ) {
    super(injector);
  }
  ngAfterContentInit(): void {
  }

  ngOnInit() {
    this.GetAllByCompanyId();
    this.initForm();
  }

  initForm() {
    // this.form = this.fb.group({
    //   pageIndex: new FormControl<number>(1),
    //   pageSize: new FormControl<number>(10),
    //   fullName: new FormControl<string>(''),
    //   phoneNumber: new FormControl<string>('', Validators.compose([Validators.maxLength(11)])),
    //   stationIds: new FormControl<number[]>([]),
    //   gender: new FormControl<number[]>([]),
    //   fromDate: new FormControl<Date>(null),
    //   toDate: new FormControl<Date>(null),
    // });
  }

  GetCompanyID(): string {
    return JSON.parse(localStorage.getItem(LocalStorageEnum.app_user))['CompanyId'];
  }

  GetAllByCompanyId() {
    this.spinnerService.show();
    this.httpService.GET(`${DataEntryController.GetAllByCompanyId}/${this.GetCompanyID()}`).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          this.dataSource = res.data;
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

  GetStatusName(status: number): string {
    switch (status) {
      case 0:
        return this.translateService.instant('status.pending');
      case 1:
        return this.translateService.instant('status.accepted');
      case 2:
        return this.translateService.instant('status.rejected');
      case 3:
        return this.translateService.instant('status.completed');
      case 4:
        return this.translateService.instant('status.updated');
      case 5:
        return this.translateService.instant('status.deleted');
      default:
        break;
    }
  }

  handlePaginator(paginator: MatPaginator) {
    console.log(paginator);
    this.GetAllByCompanyId();
  }
}
