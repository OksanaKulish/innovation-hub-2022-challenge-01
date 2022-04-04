import { HttpClient } from '@angular/common/http';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-upload-scv',
  templateUrl: './upload-scv.component.html',
  styleUrls: ['./upload-scv.component.scss'],
})
export class UploadScvComponent implements OnInit, OnChanges {
  public fileName = '';
  public details: File | undefined

  public constructor(private http: HttpClient) {}
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.details + 'TESTSSS');
  }

  public ngOnInit(): void {}

  public onUploadCSV(event: any) {
    const file: File = event.target.files[0];
    console.log(file);
    this.details = file;

    if (file) {
      this.fileName = file.name;
      const formData = new FormData();
      formData.append('csv', file);
      const upload$ = this.http.post('/api/csv-upload', formData);
      upload$.subscribe();
    }
  }
}
