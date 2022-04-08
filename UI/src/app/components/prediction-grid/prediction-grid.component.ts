import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { InputDataDto } from '../../web-api/dto';
import { PredictService } from 'src/app/web-api/services/predict.service';

export interface PredictionMPGDto {
  MPG: number;
}
export interface PredictionCVSDto {
  cylinders: string;
  weight: string;
  displacement: string;
  horsepower: string;
  acceleration: string;
  model_year: string;
  origin: string;
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
  public grid2: PredictionCVSDto[] = [];

  public isUploadedFile = false;

  public constructor(private readonly predictService: PredictService) {}

  public readCSV($event: any) {
    if ($event.target.files[0]) {
      let input = $event.target;
      let reader = new FileReader();
      reader.readAsText(input.files[0]);

      reader.onload = () => {
        let csvData = reader.result;
        let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);

        let headersRow = this.getHeaderArray(csvRecordsArray);

        this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);

        this.dataSource2 = new MatTableDataSource(this.grid2);
      };

      reader.onerror = function () {
        console.log('error is occured while reading file!');
      };
    } else {
      alert('Please import valid .csv file.');
      this.fileReset();
    }
  }

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
          .then(async (result: any) => {
            if (result) {
              this.predictedData = await this.predictService.getBulkValuesAsync(
                result
              );

              this.predictedData['predicted_label'].forEach((element: any) => {
                this.grid.push({ MPG: element });
              });
            }
          });
      } finally {
        this.dataSource = new MatTableDataSource(this.grid);
        // console.log(this.grid);
        this.isLoading = false;
      }
    }
  }

  getHeaderArray(csvRecordsArr: any) {
    let headers = (<string>csvRecordsArr[0]).split(',');
    let headerArray = [];
    for (let j = 0; j < headers.length; j++) {
      headerArray.push(headers[j]);
    }
    return headerArray;
  }

  @ViewChild('fileUpload') csvReader: any;
  public records: any[] = [];

  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {
    for (let i = 1; i < csvRecordsArray.length; i++) {
      let curruntRecord = (<string>csvRecordsArray[i]).split(',');
      if (curruntRecord.length == headerLength) {
        this.grid2.push({
          cylinders: curruntRecord[1].trim(),
          displacement: curruntRecord[2].trim(),
          horsepower: curruntRecord[3].trim(),
          weight: curruntRecord[4].trim(),
          acceleration: curruntRecord[5].trim(),
          model_year: curruntRecord[6].trim(),
          origin: curruntRecord[7].trim(),
        });
      }
    }
  }

  // isValidCSVFile(file: any) {
  //   return file.name?.endsWith('.csv');
  // }

  fileReset() {
    this.csvReader.nativeElement.value = '';
    this.records = [];
  }
}
