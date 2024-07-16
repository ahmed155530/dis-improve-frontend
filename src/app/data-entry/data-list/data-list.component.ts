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
    this.dialog.open(AddEditDataComponent)
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
