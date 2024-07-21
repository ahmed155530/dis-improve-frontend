import { AfterContentInit, Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { AddEditAdminComponent } from 'app/admin/admin-list/add-edit-admin/add-edit-admin.component';
import { Gender } from 'base/constants/Gender';
import { UserTypes } from 'base/constants/UserTypes';
import { Stations } from 'base/Data/Stations';
import { BaseService } from 'base/services/base.service';
import { takeUntil } from 'rxjs';
import { AddEditDataComponent } from './add-edit-data/add-edit-data.component';
import { DataEntryController } from 'base/APIs/DataEntryController';
import { LocalStorageEnum } from 'base/enums/LocalStorageEnum.enum';
import { RejectRejectionReasonComponent } from './reject-rejection-reason/reject-rejection-reason.component';

@Component({
  selector: 'app-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.scss']
})
export class DataListComponent extends BaseService implements OnInit, AfterContentInit {
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
    'data.registrationDate',
    'data.companyRejectionReason',
    'data.dataEntryRejectionReason',
    'data.notes',
    'data.status',
    'data.actions',
  ];
  dataSource: any = [];
  stations: any[] = Stations;
  totalCount: number = 0;

  viewType: 'Grid' | 'Card' = 'Grid';
  constructor(public override injector: Injector

  ) {
    super(injector);
  }
  ngAfterContentInit(): void {
  }

  ngOnInit() {
    this.GetAllByLocationId();
    this.initForm();
  }

  initForm() {
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
    this.httpService.GET(`${DataEntryController.GetAllByLocationId}/${this.GetLocationId()}`).subscribe({
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

  rejectRejection(data:any){
    this.dialog.open(RejectRejectionReasonComponent, { data: data })
    .afterClosed()
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((adminDTO: any) => {
      if (adminDTO) {
        this.GetAllByLocationId();
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
}
