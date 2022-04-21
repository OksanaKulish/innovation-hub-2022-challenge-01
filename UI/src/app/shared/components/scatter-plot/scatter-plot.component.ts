import { AfterContentInit, Component, Input } from '@angular/core';
import * as HighCharts from 'highcharts';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-scatter-plot',
  templateUrl: './scatter-plot.component.html',
  styleUrls: ['./scatter-plot.component.scss'],
})
export class ScatterPlotComponent implements AfterContentInit {
  @Input()
  public MPGFromParent: any[] = [];
  @Input()
  public CSVFromParent: any[] = [];

  public highcharts = HighCharts;
  public chartOptions: Highcharts.Options | any;

  public updateFlag: boolean = true;
  public chart: any;

  public predictedMPG: any[] = [];
  public expectedMPG: any[] = [];

  public chartCallback: Highcharts.ChartCallbackFunction = (chart) => {
    this.chart = chart;
  };

  public ngAfterContentInit(): void {
    this.chartOptions = {
      chart: {
        zoomType: 'x'
      },
      title: {
        text: 'Compare predicted and expecte values.',
      },
      subtitle: {
        text:
          document.ontouchstart === undefined
            ? 'Click and drag in the plot area to zoom in'
            : 'Pinch the chart to zoom in',
      },
      xAxis: {
        gridLineWidth: 1,
      },

      series: [
        {
          name: 'Expected Value',
          data: this.expectedMPG,
          type: 'line',
          lineWidth: 1,
        },
        {
          name: 'Predicted Value',
          data: this.predictedMPG,
          type: 'scatter',
          marker: {
            radius: 1.5,
          },
        },
      ],
      yAxis: [
        {
          title: {
            text: null,
          },
        },
        {
          linkedTo: 0,
          gridLineWidth: 1,
          opposite: true,
          title: {
            text: null,
          },
          labels: {
            align: 'right',
            x: -3,
            y: 16,
          },
          showFirstLabel: true,
        },
      ],
      tooltip: {
        shared: true,
        crosshairs: true,
      },
      credits: {
        enabled: false,
      },
      legend: {
        bubbleLegend: {
          enabled: true,
        },
      },
    };

    this.chart = new Chart(this.chartOptions);
    setTimeout(() => {
      this.visualize();
    }, 1);
  }

  private visualize() {
    this.MPGFromParent.forEach((i) => {
      if (i) {
        this.predictedMPG.push(Number(i['MPG']));
      }
    });

    this.CSVFromParent.forEach((i) => {
      if (i) {
        this.expectedMPG.push(Number(i['mpg']));
      }
    });
    this.expectedMPG.sort();
    this.predictedMPG.sort();
    this.chart.series[0].setData(this.expectedMPG);
    this.chart.series[1].setData(this.predictedMPG);
  }
}
