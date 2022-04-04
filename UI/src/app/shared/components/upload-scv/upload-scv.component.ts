import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { mergeMap, tap } from 'rxjs/operators';
import { PredictService } from 'src/app/web-api/services/predict.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-upload-scv',
  templateUrl: './upload-scv.component.html',
  styleUrls: ['./upload-scv.component.scss'],
})
export class UploadScvComponent {
  public fileName = '';
  public predictedData: any;
  public isLoading = false;

  public constructor(private http: HttpClient,
    private readonly predictService: PredictService) {}

  public async onUploadCSV(event: any) {


    const file: File = event.target.files[0];

    if (file) {
      this.isLoading = true;
      this.fileName = file.name;
      const formData = new FormData();
      formData.append('csv', file);
      try {
        const upload$ = this.http
          .post(environment.uploadCSVUrl + 'dev/api/FileUpload', formData)
          .pipe(
            tap((x) => console.log(x)),
            mergeMap(async (t: any) => {
              return await this.predictService.getBulkValuesAsync(t);
            })
          );
        upload$.subscribe((x) => (this.predictedData = x));
      } finally {
        this.isLoading = false;
      }
    }
  }
}
