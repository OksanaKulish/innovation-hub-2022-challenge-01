import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PredictService } from 'src/app/web-api/services/predict.service';

export interface PredictionMPGDto {
  MPG: number;
}

export interface PredictionCVSDto {
  cylinders: number;
  weight: number;
  displacement: number;
}

export interface InputDataDto {
  // Cylinders: string;
  // Displacement: string;
  // Horsepower: string;
  // Weight: string;
  // Acceleration: string;
  // 'Model year': string;
  // Origin: string;
  MPG: number;
}
@Component({
  selector: 'app-prediction-grid',
  templateUrl: './prediction-grid.component.html',
  styleUrls: ['./prediction-grid.component.scss'],
})
export class PredictionGridComponent implements OnInit {
  public displayedColumns: string[] = ['MPG'];
  public displayedColumns2: string[] = [
    'cylinders',
    'displacement',
    'horsepower',
    'weight',
    'acceleration',
    'model_year',
    'origin',
  ];
  public dataSource: PredictionMPGDto[] | any;
  public dataSource2: PredictionCVSDto[] | any;

  public grid: PredictionMPGDto[] = [];
  public isUploadedFile = false;

  public constructor(private readonly predictService: PredictService) {}
  ngOnInit(): void {}

  public fileName = '';
  public predictedData: any;
  public isLoading = false;

  public async onUploadCSV(event: any) {
    this.isLoading = true;
    const file: File = event.target.files[0];

    if (file) {
      this.fileName = file.name;
      const formData = new FormData();
      formData.append('csv', file);
      try {
        await this.predictService
          .getFileUploadAsync(formData)
          .then(async (result) => {
            this.predictedData = await this.predictService.getBulkValuesAsync(
              result
            );
            this.predictedData['predicted_label']
              .forEach((element: any) => {
                this.grid.push({ MPG: element });
              })
              // .then((result: string) => {
              //   this.predictService
              //     .getUrl(result)
              //     .subscribe((data) => console.log(data));
              // });
          });
      } finally {
        this.dataSource = new MatTableDataSource(this.grid);
        console.log(this.grid);
        this.isLoading = false;
      }
    }
  }
}
