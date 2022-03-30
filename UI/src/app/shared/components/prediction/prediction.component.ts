import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PredictService } from 'src/app/web-api/services/predict.service';

@Component({
  selector: 'app-prediction',
  templateUrl: './prediction.component.html',
  styleUrls: [
    './prediction.component.scss',
    '../../../../assets/material-custom.scss',
  ],
})
export class PredictionComponent implements OnInit {
  public form = new FormGroup({
    Cylinders: new FormControl('8', Validators.required),
    Displacement: new FormControl('307', Validators.required),
    Horsepower: new FormControl('130', Validators.required),
    Weight: new FormControl('3504', Validators.required),
    Acceleration: new FormControl('12', Validators.required),
    'Model year': new FormControl('70', Validators.required),
    Origin: new FormControl('1', Validators.required),
  });

  public predictedValue: string[] | undefined;

  constructor(
    private readonly predictService: PredictService,
    public http: HttpClient
  ) {}

  public async ngOnInit() {}

  // get Cylinders() { return this.form.get('Cylinders'); }

  public onPredict() {
    if (this.form.valid) {
      this.predictService.getValueAsync(this.form.value).then((res) => {
        this.predictedValue = Object.values(res);
      });
    }
  }

  public onResetPrediction() {
    this.form.reset();
  }
}
