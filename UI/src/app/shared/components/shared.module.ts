import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, } from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { LoadingBarComponent } from './loading-bar/loading-bar.component';
import { MaterialModule } from 'src/app/material.module';
import { YearPickerComponent } from './year-picker/year-picker.component';
import { UploadScvComponent } from './upload-scv/upload-scv.component';

const SHARED_DECLARATIVES = [
  LoadingBarComponent,
  YearPickerComponent,
  UploadScvComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: SHARED_DECLARATIVES,
  declarations: SHARED_DECLARATIVES,
  entryComponents: []
})
export class SharedModule { }
