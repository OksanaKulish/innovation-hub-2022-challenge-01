import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { SharedModule } from '../shared/shared.module';
import { PredictionComponent } from './prediction/prediction.component';
import { PredictionGridComponent } from './prediction-grid/prediction-grid.component';
import { GridsterModule } from 'angular-gridster2';
import { DashboardModule } from './dashboard/dashboard.module';
import { LineChartComponent } from '../shared/components/line-chart/line-chart.component';

const SHARED_DECLARATIVES = [
  PredictionComponent
];

@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      RouterModule,
      GridsterModule,
      MaterialModule,
      ReactiveFormsModule,
      SharedModule,
      DashboardModule,
    ],
    providers: [
      ],

    exports: [
      SHARED_DECLARATIVES
    ],
    declarations: [
      SHARED_DECLARATIVES,
      PredictionGridComponent,
    ]
})
export class ComponentsModule { }
