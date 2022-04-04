import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { mergeMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-upload-scv',
  templateUrl: './upload-scv.component.html',
  styleUrls: ['./upload-scv.component.scss'],
})
export class UploadScvComponent implements OnInit {
  public fileName = '';
  public url: any;
  public constructor(private http: HttpClient) {}

  public ngOnInit(): void {}

  public onUploadCSV(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.fileName = file.name;
      const formData = new FormData();
      formData.append('csv', file);
      const upload$ = this.http
        .post(environment.uploadCSVUrl + 'dev/api/FileUpload', formData)
        .pipe(
          mergeMap((t: any) => {
            console.log(
              environment.apiUrl + 'getBulkValues?url=' + `${t.url}`
            );
            return this.http.get(
              environment.apiUrl + 'getBulkValues?url=' + `${t.url}`
            );
          })
        );
      upload$.subscribe();
    }
  }
}
