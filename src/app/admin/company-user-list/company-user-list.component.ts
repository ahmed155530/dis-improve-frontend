import { AfterContentInit, Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { Gender } from 'base/constants/Gender';
import { UserTypes } from 'base/constants/UserTypes';
import { Stations } from 'base/Data/Stations';
import { BaseService } from 'base/services/base.service';
import { takeUntil } from 'rxjs';
import { AddEditAdminComponent } from '../admin-list/add-edit-admin/add-edit-admin.component';
import { AddEditCompanyUserComponent } from './add-edit-company-user/add-edit-company-user.component';

@Component({
  selector: 'app-company-user-list',
  templateUrl: './company-user-list.component.html',
  styleUrls: ['./company-user-list.component.scss']
})
export class CompanyUserListComponent extends BaseService implements OnInit, AfterContentInit {
  form: FormGroup = null;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  UserTypes = UserTypes;
  Genders = Gender;
  displayedColumns: string[] = [
    'companyUsers.id',
    'companyUsers.name',
    'companyUsers.phoneNumber',
    'companyUsers.company',
    'companyUsers.registrationDate',
    'companyUsers.actions',
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
    this.dialog.open(AddEditCompanyUserComponent)
      .afterClosed()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((adminDTO: any) => {
        if (adminDTO) {
          // this.GetAllComapanyUsers();
        }
      });
  }

  handlePaginator(paginator: MatPaginator) {
    console.log(paginator);
    // this.GetAllComapanyUsers();
  }
}
