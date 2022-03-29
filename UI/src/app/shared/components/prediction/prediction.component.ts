import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PredictService } from 'src/app/web-api/services/predict.service';

@Component({
  selector: 'app-prediction',
  templateUrl: './prediction.component.html',
  styleUrls: ['./prediction.component.scss'],
})
export class PredictionComponent implements OnInit {
  public form = new FormGroup({
    Cylinders: new FormControl('', Validators.required),
    Displacement: new FormControl('', Validators.required),
    Horsepower: new FormControl('', Validators.required),
    Weight: new FormControl('', Validators.required),
    Acceleration: new FormControl('', Validators.required),
    'Model year': new FormControl('', Validators.required),
    Origin: new FormControl('', Validators.required),
  });

  public predictedValue: string | undefined;

  constructor(
    private readonly predictService: PredictService,
    public http: HttpClient
  ) {}

  public async ngOnInit() {}

  // get Cylinders() { return this.form.get('Cylinders'); }

  public onPredict() {
    if (this.form.valid) {
      this.predictService.getValueAsync(this.form.value).then((res) => {
        this.predictedValue = res;
      });
    }

    console.log('Predict ' + this.form.value);
  }

  public onResetPrediction() {
    this.form.reset();
  }
}
