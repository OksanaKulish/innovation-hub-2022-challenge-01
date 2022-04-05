import { Component } from '@angular/core';
import { PredictService } from 'src/app/web-api/services/predict.service';
@Component({
  selector: 'app-upload-scv',
  templateUrl: './upload-scv.component.html',
  styleUrls: ['./upload-scv.component.scss'],
})
export class UploadScvComponent {
  // public fileName = '';
  // public predictedData: any;
  // public isLoading = false;

  // public constructor(private readonly predictService: PredictService) {}

  // public async onUploadCSV(event: any) {
  //   this.isLoading = true;
  //   const file: File = event.target.files[0];

  //   if (file) {
  //     this.fileName = file.name;
  //     const formData = new FormData();
  //     formData.append('csv', file);
  //     try {
  //       await this.predictService
  //         .getFileUploadAsync(formData)
  //         .then(async (result) => {
  //           this.predictedData = await this.predictService.getBulkValuesAsync(
  //             result
  //           );
  //           console.log(this.predictedData);
  //         });
  //     } finally {
  //       this.isLoading = false;
  //     }
  //   }
  // }
}
