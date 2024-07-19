import { AfterContentInit, Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { UserController } from 'base/APIs/UserController';
import { Gender } from 'base/constants/Gender';
import { UserTypes } from 'base/constants/UserTypes';
import { Stations } from 'base/Data/Stations';
import { BaseService } from 'base/services/base.service';
import { takeUntil } from 'rxjs';
import { AddEditAdminComponent } from '../admin-list/add-edit-admin/add-edit-admin.component';
import { AddEditLocationComponent } from './add-edit-location/add-edit-location.component';
import { LocationController } from 'base/APIs/LocationController';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.scss']
})
export class LocationListComponent extends BaseService implements OnInit, AfterContentInit {
  form: FormGroup = null;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  UserTypes = UserTypes;
  Genders = Gender;
  displayedColumns: string[] = [
    'locations.id',
    'locations.name',
    'locations.creationDate',
    'locations.actions',
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
    this.GetAllLocations();
  }


  createObject() {
    this.dialog.open(AddEditLocationComponent)
      .afterClosed()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((locationDTO: any) => {
        if (locationDTO) {
          this.GetAllLocations();
        }
      });
  }

  Update(data: any) {
    this.dialog.open(AddEditLocationComponent, { data: data })
      .afterClosed()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((locationDTO: any) => {
        if (locationDTO) {
          this.GetAllLocations();
        }
      });
  }

  submitDelete(adminDTO: any) {
    this.swalService.alertDelete(() => {
      this.deleteLocation(adminDTO);
    });
  }

  deleteLocation(locationDTO: any) {
    console.log(locationDTO);
    this.spinnerService.show();
    this.httpService.DELETE(`${LocationController.DeleteLocation}/${locationDTO.id}`).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          this.GetAllLocations();
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
    this.GetAllLocations();
  }

  GetAllLocations() {
    this.spinnerService.show();
    this.httpService.GET(`${LocationController.GetAllLocations}`).subscribe({
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
