import { Component, Injector, OnInit, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { AdminDashboardController } from 'base/APIs/AdminDashboardController';
import { BaseService } from 'base/services/base.service';
import * as Chartist from 'chartist';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent extends BaseService implements OnInit, AfterViewInit {
  perAcceptedCounts: any;
  kpisCounts: number = null;
  totalCount: number = 0;
  displayedColumns: string[] = [
    'data.id',
    'data.name',
    'data.companyName',
    'data.nid',
    'data.phoneNumber',
    'data.country',
    'data.location',
    'data.registrationDate',
    'data.status',
  ];
  dataSource: any = [];
  title: string = '';
  zone: number = null;
  color: string = '';
  private chart: Highcharts.Chart;
  private kpiChart: Highcharts.Chart;
  constructor(
    public override injector: Injector,
  ) {
    super(injector);
  }

  ngOnInit() {
    this.GetZoneCounts();
    this.GetKPIsZoneCounts();
    document.querySelectorAll('#sliders input').forEach((input) =>
      input.addEventListener('input', (e: any) => {
        this.chart.options.chart.options3d[e.target.id] = e.target.value;
        this.showValues();
        this.chart.redraw(false);
      })
    );
  }

  ngAfterViewInit() {

  }

  initKPICharts() {
    this.kpiChart = new Highcharts.Chart({
      chart: {
        renderTo: 'kpi-chart',
        type: 'pie',
        options3d: {
          enabled: true,
          alpha: 45,
          beta: 30,
        },
      },
      title: {
        text: 'KPI chart',
      },
      accessibility: {
        point: {
          valueSuffix: '',
        },
      },
      tooltip: {
        pointFormat: '{series.name}: {point.y:.1f}',
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          depth: 50,
          dataLabels: {
            enabled: true,
            format: '{point.name}',
          },
        },
      },
      series: [
        {
          type: 'pie',
          name: 'Count',
          data: [
            {
              name: 'Yellow zone',
              color: 'yellow',
              y: this.kpisCounts['yellowZone'],
            },
            {
              name: 'Green zone',
              y: this.kpisCounts['greenZone'],
              color: 'green',
            },
            {
              name: 'Red zone',
              y: this.kpisCounts['redZone'],
              color: 'red',
            },
          ],
        },
      ],
    });
    this.showValues();
  }

  initCharts() {
    this.chart = new Highcharts.Chart({
      chart: {
        renderTo: 'pie-chart',
        type: 'pie',
        options3d: {
          enabled: true,
          alpha: 45,
          beta: 30,
        },
      },
      title: {
        text: 'Completed chart',
      },
      accessibility: {
        point: {
          valueSuffix: '',
        },
      },
      tooltip: {
        pointFormat: '{series.name}: {point.y:.1f}',
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          depth: 50,
          dataLabels: {
            enabled: true,
            format: '{point.name}',
          },
        },
      },
      series: [
        {
          type: 'pie',
          name: 'Count',
          data: [
            {
              name: 'Yellow zone',
              color: 'yellow',
              y: this.perAcceptedCounts['yellowZone'],
              events: {
                click: () => this.showTable(1)
              }
            },
            {
              name: 'Green zone',
              y: this.perAcceptedCounts['greenZone'],
              color: 'green',
              events: {
                click: () => this.showTable(0)
              }
            },
            {
              name: 'Red zone',
              y: this.perAcceptedCounts['redZone'],
              color: 'red',
              events: {
                click: () => this.showTable(2)
              }
            },
          ],
        },
      ],
    });
    this.showValues();
  }

  private showValues(): void {
    document.getElementById('alpha-value').innerHTML = String(
      this.chart.options.chart.options3d.alpha
    );
    document.getElementById('beta-value').innerHTML = String(
      this.chart.options.chart.options3d.beta
    );
  }

  showTable(zoneId: any) {
    switch (zoneId) {
      case 0:
        this.zone = zoneId;
        this.title = 'zone.green';
        break;
      case 1:
        this.zone = zoneId;
        this.title = 'zone.yellow';
        break;
      case 2:
        this.zone = zoneId;
        this.title = 'zone.red';
        break;
      default:
        break;
    }
    this.GetAllByZoneId(zoneId);
  }

  handlePaginator(paginator: MatPaginator) {
    console.log(paginator);
    // this.GetSanitationAppUsers();
  }


  GetZoneCounts() {
    this.spinnerService.show();
    this.httpService.GET(`${AdminDashboardController.GetZoneCounts}`).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          this.perAcceptedCounts = res.data;
          this.initCharts();
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

  GetAllByZoneId(zoneId: number) {
    this.spinnerService.show();
    this.httpService.GET(`${AdminDashboardController.GetAllByZoneId}/${zoneId}`).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          this.dataSource = res.data;
          this.initCharts();
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


  GetKPIsZoneCounts() {
    this.spinnerService.show();
    this.httpService.GET(`${AdminDashboardController.GetKPIsZoneCounts}`).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          this.kpisCounts = res.data;
          this.initKPICharts();
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

