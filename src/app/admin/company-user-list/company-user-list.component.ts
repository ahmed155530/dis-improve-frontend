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
import { UserController } from 'base/APIs/UserController';

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
    'companyUsers.email',
    'companyUsers.nid',
    'companyUsers.phoneNumber',
    'companyUsers.company',
    'companyUsers.country',
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
    this.GetAllCompanyUsers();
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
          this.GetAllCompanyUsers();
        }
      });
  }

  Update(data: any) {
    this.dialog.open(AddEditCompanyUserComponent, { data: data })
      .afterClosed()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((adminDTO: any) => {
        if (adminDTO) {
          this.GetAllCompanyUsers();
        }
      });
  }

  handlePaginator(paginator: MatPaginator) {
    console.log(paginator);
    this.GetAllCompanyUsers();
  }

  GetAllCompanyUsers() {
    this.spinnerService.show();
    this.httpService.GET(`${UserController.GetAllUsers}/${2}`).subscribe({
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
}
