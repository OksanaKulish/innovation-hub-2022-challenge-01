import { Component, OnInit, ViewChild } from '@angular/core';
import { UploadScvComponent } from 'src/app/shared/components/upload-scv/upload-scv.component';

export interface PeriodicElement {
  cylinders: number;
  MPG: number;
  weight: number;
  displacement: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { MPG: 1, cylinders: 12, weight: 1.0079, displacement: 12 },
  { MPG: 2, cylinders: 33, weight: 4.0026, displacement: 34 },
  { MPG: 3, cylinders: 33, weight: 6.941, displacement: 34 },
  { MPG: 4, cylinders: 33, weight: 9.0122, displacement: 33 },
  { MPG: 5, cylinders: 13, weight: 10.811, displacement: 5 },
  { MPG: 6, cylinders: 13, weight: 12.0107, displacement: 5 },
  { MPG: 7, cylinders: 13, weight: 14.0067, displacement: 55 },
  { MPG: 8, cylinders: 34, weight: 15.9994, displacement: 55 },
];

export interface InputDataDto {
  Cylinders: string;
  Displacement: string;
  Horsepower: string;
  Weight: string;
  Acceleration: string;
  'Model year': string;
  Origin: string;
  MPG: string;
}
@Component({
  selector: 'app-prediction-grid',
  templateUrl: './prediction-grid.component.html',
  styleUrls: ['./prediction-grid.component.scss'],
})
export class PredictionGridComponent implements OnInit {
  public displayedColumns: string[] = [
    'MPG',
    'cylinders',
    'displacement',
    'horsepower',
    'weight',
    'acceleration',
    'model_year',
    'origin',
  ];
  public dataSource = ELEMENT_DATA;

  public isUploadedFile = false;

  @ViewChild('uploadSCV', { static: false })
  protected uploadSCV!: UploadScvComponent;

  public constructor() {}

  public ngOnInit(): void {
    if (this.uploadSCV?.fileName !== undefined) {
      this.isUploadedFile = !this.isUploadedFile;
    }
  }
}
