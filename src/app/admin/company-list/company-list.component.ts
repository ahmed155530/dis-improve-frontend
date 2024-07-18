import { AfterContentInit, Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { Gender } from 'base/constants/Gender';
import { UserTypes } from 'base/constants/UserTypes';
import { Stations } from 'base/Data/Stations';
import { BaseService } from 'base/services/base.service';
import { takeUntil } from 'rxjs';
import { AddEditAdminComponent } from '../admin-list/add-edit-admin/add-edit-admin.component';
import { AddEditCompanyComponent } from './add-edit-company/add-edit-company.component';
import { CompanyController } from 'base/APIs/CompanyController';
import { QueryParamDTO } from 'base/models/shared/QueryParamDTO';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent extends BaseService implements OnInit, AfterContentInit {
  form: FormGroup = null;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  UserTypes = UserTypes;
  displayedColumns: string[] = [
    'companies.id',
    'companies.name',
    'companies.email',
    'companies.phoneNumber',
    'companies.registrationDate',
    'companies.actions',
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
    this.GetAllCompanies();
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

  GetAllCompanies() {
    this.spinnerService.show();
    this.httpService.GET(CompanyController.GetAllCompanies).subscribe({
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

  createObject() {
    this.dialog.open(AddEditCompanyComponent)
      .afterClosed()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((companyDTO: any) => {
        if (companyDTO) {
          this.GetAllCompanies();
        }
      });
  }

  updateObject(data: any) {
    console.log(data);
    this.dialog.open(AddEditCompanyComponent, { data: data })
      .afterClosed()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((companyDTO: any) => {
        if (companyDTO) {
          this.GetAllCompanies();
        }
      });
  }

  submitDelete(companyDTO: any) {
    this.swalService.alertDelete(() => {
      this.deleteCompany(companyDTO);
    });
  }

  deleteCompany(company: any) {
    console.log(company);
    this.spinnerService.show();
    this.httpService.DELETE(`${CompanyController.DeleteCompany}/${company.id}`).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          this.GetAllCompanies();
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
    this.GetAllCompanies();
  }
}
