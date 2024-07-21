import { AfterContentInit, Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { AddEditDataComponent } from 'app/data-entry/data-list/add-edit-data/add-edit-data.component';
import { DataEntryController } from 'base/APIs/DataEntryController';
import { Gender } from 'base/constants/Gender';
import { UserTypes } from 'base/constants/UserTypes';
import { Stations } from 'base/Data/Stations';
import { LocalStorageEnum } from 'base/enums/LocalStorageEnum.enum';
import { BaseService } from 'base/services/base.service';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-data-entries-characteristics-list',
  templateUrl: './data-entries-characteristics-list.component.html',
  styleUrls: ['./data-entries-characteristics-list.component.scss']
})
export class DataEntriesCharacteristicsListComponent extends BaseService implements OnInit, AfterContentInit {
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
  stations: any[] = Stations;
  totalCount: number = 0;

  viewType: 'Grid' | 'Card' = 'Grid';
  base64Data: any;
  constructor(public override injector: Injector

  ) {
    super(injector);
  }
  ngAfterContentInit(): void {
  }

  ngOnInit() {
    this.GetAll();
  }

  handlePaginator(paginator: MatPaginator) {
    console.log(paginator);
    this.GetAll();
  }

  GetAll() {
    this.spinnerService.show();
    this.httpService.GET(`${DataEntryController.GetAll}`).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          this.dataSource = res.data;
          this.totalCount = res.data.length;
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

  exportToExcel() {
    this.spinnerService.show();
    this.httpService.GET(DataEntryController.ExportAllDataEntries).subscribe({
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

  downloadFile() {
    this.spinnerService.show();
    const src = `data:text/csv;base64,${this.base64Data}`;
    const link = document.createElement("a");
    link.href = src;
    link.download = `All data entries_${this.datepipe.transform(new Date(), 'yyyy-MM-dd hh:mm:ss')}`;
    link.click();
    this.spinnerService.hide();
  }
}
