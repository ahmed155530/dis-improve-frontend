import { AfterContentInit, Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { Gender } from 'base/constants/Gender';
import { UserTypes } from 'base/constants/UserTypes';
import { Stations } from 'base/Data/Stations';
import { BaseService } from 'base/services/base.service';
import { takeUntil } from 'rxjs';
import { AddEditAdminComponent } from '../admin-list/add-edit-admin/add-edit-admin.component';
import { AddEditDataEntryComponent } from './add-edit-data-entry/add-edit-data-entry.component';

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
    'dataEntries.id',
    'dataEntries.name',
    'dataEntries.phoneNumber',
    'dataEntries.registrationDate',
    'dataEntries.actions',
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

  createObject() {
    this.dialog.open(AddEditDataEntryComponent)
      .afterClosed()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((dataEntryDTO: any) => {
        if (dataEntryDTO) {
          // this.GetAllDataEntries();
        }
      });
  }

  handlePaginator(paginator: MatPaginator) {
    console.log(paginator);
    // this.GetAllDataEntries();
  }
}
