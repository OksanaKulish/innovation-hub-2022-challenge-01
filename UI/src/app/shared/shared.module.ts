import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, } from '@angular/router';
import { LoadingBarComponent } from './components/loading-bar/loading-bar.component';
import { MaterialModule } from 'src/app/material.module';
import { YearPickerComponent } from './components/year-picker/year-picker.component';
import { UploadScvComponent } from './components/upload-scv/upload-scv.component';
import { TooltipComponent } from './components/tooltip/tooltip.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { BoldPipe } from './pipes/bold.pipe';
import { ScatterPlotComponent } from './components/scatter-plot/scatter-plot.component';

const SHARED_DECLARATIVES = [
  LoadingBarComponent,
  YearPickerComponent,
  UploadScvComponent,
  TooltipComponent,
  LineChartComponent,
  BoldPipe,
  ScatterPlotComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MaterialModule,
    ReactiveFormsModule,
    HighchartsChartModule
  ],
  exports: SHARED_DECLARATIVES,
  declarations: SHARED_DECLARATIVES,
  entryComponents: []
})
export class SharedModule { }
