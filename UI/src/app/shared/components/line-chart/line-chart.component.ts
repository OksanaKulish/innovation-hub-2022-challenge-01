import { AfterContentInit, Component, Input } from '@angular/core';
import * as HighCharts from 'highcharts';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent implements AfterContentInit {
  @Input()
  public MPGFromParent: any[] = [];
  @Input()
  public CSVFromParent: any[] = [];

  public highcharts = HighCharts;
  public chartOptions: Highcharts.Options | any;

  public updateFlag: boolean = true;
  public chart: any;
  public chartCallback: Highcharts.ChartCallbackFunction = (chart) => {
    this.chart = chart;
  };

  public ngAfterContentInit(): void {
    this.chartOptions = {
      chart: {
        zoomType: 'x'
      },
      title: {
        text: 'How the value of the prediction depends on the input parameters.',
      },
      subtitle: {
        text: document.ontouchstart === undefined ?
          'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
      },
      xAxis: {
        gridLineWidth: 1,
        categories: this.d,
      },
      series: [
        {
          name: 'Displacement',
          data: this.c,
          type: 'line',
          lineWidth: 1,
        },
        {
          name: 'Horsepower',
          data: this.h,
          type: 'line',
          lineWidth: 1,
        },
        {
          name: 'Weight',
          data: this.w,
          type: 'line',
          lineWidth: 1,
        },
        {
          name: 'Acceleration',
          data: this.a,
          type: 'line',
          lineWidth: 1,
        },
        {
          name: 'Model Year',
          data: this.m_y,
          type: 'line',
          lineWidth: 1,
        },
        {
          name: 'Origin',
          data: this.o,
          type: 'line',
          lineWidth: 1,
        },
      ],
      yAxis: [{
        title: {
          text: null
        },
      }],
      tooltip: {
        shared: true,
      },
      credits: {
        enabled: false,
      },
      legend: {
        layout: 'vertical',
        align: 'left',
        x: 30,
        verticalAlign: 'top',
        y: 40,
        floating: true,
      },
      // chart: {
      //   polar: true,
      //   type: 'line',
      //   backgroundColor: '#f5f5f5',
      // },
    };
    this.chart = new Chart(this.chartOptions);
    setTimeout(() => {
      this.visualize();
    }, 1);
  }

  d: any[] = [];
  c: any[] = [];
  h: any[] = [];
  w: any[] = [];
  a: any[] = [];
  m_y: any[] = [];
  o: any[] = [];

  public visualize() {
    this.MPGFromParent.forEach((i) => {
      if (i) {
        this.d.push(Number(i['MPG']));
      }
    });

    this.CSVFromParent.forEach((i) => {
      if (i) {
        this.c.push(Number(i['displacement']));
        this.h.push(Number(i['horsepower']));
        this.m_y.push(Number(i['model_year']));
        this.o.push(Number(i['origin']));
        this.w.push(Number(i['weight']));
        this.a.push(Number(i['acceleration']));
      }
    });
    this.chart.series[0].setData(this.c);
    this.chart.series[1].setData(this.h);
    this.chart.series[2].setData(this.w);
    this.chart.series[3].setData(this.a);
    this.chart.series[4].setData(this.m_y);
    this.chart.series[5].setData(this.o);
  }
}
