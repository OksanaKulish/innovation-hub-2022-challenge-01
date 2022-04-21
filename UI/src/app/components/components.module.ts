import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { SharedModule } from '../shared/shared.module';
import { PredictionComponent } from './prediction/prediction.component';
import { PredictionGridComponent } from './prediction-grid/prediction-grid.component';

const SHARED_DECLARATIVES = [
  PredictionComponent,
  PredictionGridComponent
];

@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      RouterModule,
      MaterialModule,
      ReactiveFormsModule,
      SharedModule,
    ],
    providers: [
      ],

    exports: [
      SHARED_DECLARATIVES
    ],
    declarations: [
      SHARED_DECLARATIVES,
    ]
})
export class ComponentsModule { }
