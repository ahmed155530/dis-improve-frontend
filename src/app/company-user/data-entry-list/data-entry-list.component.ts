import { AfterContentInit, Component, Injector, OnInit, ViewChild } from '@angular/core';
import { takeUntil } from 'rxjs';
import { ApproveDataEntryComponent } from './approve-data-entry/approve-data-entry.component';
import { FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { Gender } from 'base/constants/Gender';
import { UserTypes } from 'base/constants/UserTypes';
import { Stations } from 'base/Data/Stations';
import { BaseService } from 'base/services/base.service';

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
    'data.username',
    'data.phoneNumber',
    'data.country',
    'data.registrationDate',
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
    this.dialog.open(ApproveDataEntryComponent)
      .afterClosed()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((adminDTO: any) => {
        if (adminDTO) {
          // this.GetAllAdmins();
        }
      });
  }

  handlePaginator(paginator: MatPaginator) {
    console.log(paginator);
    // this.GetSanitationAppUsers();
  }
}
