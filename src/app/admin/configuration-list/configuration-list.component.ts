import { AfterContentInit, Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { Gender } from 'base/constants/Gender';
import { UserTypes } from 'base/constants/UserTypes';
import { Stations } from 'base/Data/Stations';
import { BaseService } from 'base/services/base.service';
import { takeUntil } from 'rxjs';
import { AddEditConfigurationComponent } from './add-edit-configuration/add-edit-configuration.component';
import { ConfigurationController } from 'base/APIs/ConfigurationController';

@Component({
  selector: 'app-configuration-list',
  templateUrl: './configuration-list.component.html',
  styleUrls: ['./configuration-list.component.scss']
})
export class ConfigurationListComponent extends BaseService implements OnInit, AfterContentInit {
  form: FormGroup = null;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  UserTypes = UserTypes;
  Genders = Gender;
  displayedColumns: string[] = [
    'configurations.id',
    'configurations.name',
    'configurations.value',
    'configurations.creationDate',
    'configurations.actions',
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
    this.GetAllConfigurations();
  }

  createObject() {
    this.dialog.open(AddEditConfigurationComponent)
      .afterClosed()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((ConfigurationDTO: any) => {
        if (ConfigurationDTO) {
          this.GetAllConfigurations();
        }
      });
  }

  Update(data: any) {
    this.dialog.open(AddEditConfigurationComponent, { data: data })
      .afterClosed()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((ConfigurationDTO: any) => {
        if (ConfigurationDTO) {
          this.GetAllConfigurations();
        }
      });
  }

  submitDelete(adminDTO: any) {
    this.swalService.alertDelete(() => {
      this.deleteConfiguration(adminDTO);
    });
  }

  deleteConfiguration(adminDTO: any) {
    console.log(adminDTO);
    this.spinnerService.show();
    this.httpService.DELETE(`${ConfigurationController.DeleteConfiguration}/${adminDTO.id}`).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          this.GetAllConfigurations();
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
    this.GetAllConfigurations();
  }

  GetAllConfigurations() {
    this.spinnerService.show();
    this.httpService.GET(`${ConfigurationController.GetAllConfigurations}`).subscribe({
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
