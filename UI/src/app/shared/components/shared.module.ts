import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, } from '@angular/router';
import { LoadingBarComponent } from './loading-bar/loading-bar.component';
import { MaterialModule } from 'src/app/material.module';
import { YearPickerComponent } from './year-picker/year-picker.component';
import { UploadScvComponent } from './upload-scv/upload-scv.component';
import { TooltipComponent } from './tooltip/tooltip.component';
import { BarComponent } from './bar/bar.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { HighchartsChartModule } from 'highcharts-angular';

const SHARED_DECLARATIVES = [
  LoadingBarComponent,
  YearPickerComponent,
  UploadScvComponent,
  TooltipComponent,
  BarComponent,
  LineChartComponent,

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
