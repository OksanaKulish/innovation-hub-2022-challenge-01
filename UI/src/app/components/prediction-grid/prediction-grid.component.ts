import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PredictionCVSDto } from '../../web-api/dto';
import { PredictService } from 'src/app/web-api/services/predict.service';

export interface PredictionMPGDto {
  MPG: number;
}
@Component({
  selector: 'app-prediction-grid',
  templateUrl: './prediction-grid.component.html',
  styleUrls: ['./prediction-grid.component.scss'],
})
export class PredictionGridComponent {
  @Output()
  public MPGAction = new EventEmitter();
  public MPGToParent() {
    this.MPGAction.emit(this.grid);
  }

  @Output()
  public CSVAction = new EventEmitter();
  public CSVToParent() {
    this.CSVAction.emit(this.grid2);
  }

  @Output()
  public loadingAction = new EventEmitter();
  public dataLoaded() {
    this.loadingAction.emit(true);
  }

  public fileName = '';
  public predictedData: any;
  public isLoading = false;

  @ViewChild('fileUpload') csvReader: any;
  public records: any[] = [];

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
      this.fileReset();
    }
  }

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
        this.MPGToParent();
        this.CSVToParent();
        this.dataLoaded();
        this.isLoading = false;
      }
    }
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (filterValue && this.dataSource2) {
      this.dataSource2.filter = filterValue.trim().toLowerCase();
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  }

  private getHeaderArray(csvRecordsArr: any) {
    let headers = (<string>csvRecordsArr[0]).split(',');
    let headerArray = [];
    for (let j = 0; j < headers.length; j++) {
      headerArray.push(headers[j]);
    }
    return headerArray;
  }

  private getDataRecordsArrayFromCSVFile(
    csvRecordsArray: any,
    headerLength: any
  ) {
    for (let i = 1; i < csvRecordsArray.length; i++) {
      let currantRecord = (<string>csvRecordsArray[i]).split(',');
      if (currantRecord.length == headerLength) {
        this.grid2.push({
          mpg: currantRecord[0].trim(),
          cylinders: currantRecord[1].trim(),
          displacement: currantRecord[2].trim(),
          horsepower: currantRecord[3].trim(),
          weight: currantRecord[4].trim(),
          acceleration: currantRecord[5].trim(),
          model_year: currantRecord[6].trim(),
          origin: currantRecord[7].trim(),
        });
      }
    }
  }

  private fileReset() {
    this.csvReader.nativeElement.value = '';
    this.records = [];
  }
}
