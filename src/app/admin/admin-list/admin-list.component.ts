import { AfterContentInit, Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { Gender } from 'base/constants/Gender';
import { UserTypes } from 'base/constants/UserTypes';
import { Stations } from 'base/Data/Stations';
import { BaseService } from 'base/services/base.service';
import { AddEditAdminComponent } from './add-edit-admin/add-edit-admin.component';
import { takeUntil } from 'rxjs';
import { UserController } from 'base/APIs/UserController';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.scss']
})
export class AdminListComponent extends BaseService implements OnInit, AfterContentInit {
  form: FormGroup = null;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  UserTypes = UserTypes;
  Genders = Gender;
  displayedColumns: string[] = [
    'admins.id',
    'admins.name',
    'admins.email',
    'admins.nid',
    'admins.phoneNumber',
    'admins.registrationDate',
    'admins.actions',
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
    this.GetAllAdmins();
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
    this.dialog.open(AddEditAdminComponent)
      .afterClosed()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((adminDTO: any) => {
        if (adminDTO) {
          this.GetAllAdmins();
        }
      });
  }

  Update(data: any) {
    this.dialog.open(AddEditAdminComponent, { data: data })
      .afterClosed()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((adminDTO: any) => {
        if (adminDTO) {
          this.GetAllAdmins();
        }
      });
  }

  submitDelete(adminDTO: any) {
    this.swalService.alertDelete(() => {
      this.deleteAdmin(adminDTO);
    });
  }

  deleteAdmin(adminDTO: any) {
    console.log(adminDTO);
    this.spinnerService.show();
    this.httpService.DELETE(`${UserController.DeleteUser}/${adminDTO.id}`).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          this.GetAllAdmins();
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

  handlePaginator(paginator: MatPaginator) {
    console.log(paginator);
    this.GetAllAdmins();
  }

  GetAllAdmins() {
    this.spinnerService.show();
    this.httpService.GET(`${UserController.GetAllUsers}/${3}`).subscribe({
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
