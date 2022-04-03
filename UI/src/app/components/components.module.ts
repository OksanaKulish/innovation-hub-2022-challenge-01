import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { SharedModule } from '../shared/components/shared.module';
import { PredictionComponent } from './prediction/prediction.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const SHARED_DECLARATIVES = [
  PredictionComponent
];

@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      RouterModule,
      MaterialModule,
      ReactiveFormsModule,
      SharedModule
    ],
    exports: [
      SHARED_DECLARATIVES
    ],
    declarations: [
      SHARED_DECLARATIVES
    ]
})
export class ComponentsModule { }
