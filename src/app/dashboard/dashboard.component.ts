import { Component, Injector, OnInit, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { BaseService } from 'base/services/base.service';
import * as Chartist from 'chartist';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent extends BaseService implements OnInit, AfterViewInit {
  counts: any;
  totalCount: number = 0;
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
  title: string = '';
  private chart: Highcharts.Chart;
  constructor(
    public override injector: Injector,
  ) {
    super(injector);
  }

  ngOnInit() {
    document.querySelectorAll('#sliders input').forEach((input) =>
      input.addEventListener('input', (e: any) => {
        this.chart.options.chart.options3d[e.target.id] = e.target.value;
        this.showValues();
        this.chart.redraw(false);
      })
    );
  }

  ngAfterViewInit() {
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
        text: 'Data chart',
      },
      accessibility: {
        point: {
          valueSuffix: '%',
        },
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
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
          name: 'Percentage',
          data: [
            {
              name: 'Pending',
              color: 'yellow',
              y: 60,
              events: {
                click: () => this.showTable('Pending')
              }
            },
            {
              name: 'Success',
              y: 20,
              color: 'green',
              events: {
                click: () => this.showTable('Success')
              }
            },
            {
              name: 'Rejected',
              y: 20,
              color: 'red',
              events: {
                click: () => this.showTable('Rejected')
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

  showTable(dataType: any) {
    console.log(dataType);

    this.title = dataType;
  }

  handlePaginator(paginator: MatPaginator) {
    console.log(paginator);
    // this.GetSanitationAppUsers();
  }
}

