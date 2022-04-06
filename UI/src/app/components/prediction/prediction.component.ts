import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PredictService } from 'src/app/web-api/services/predict.service';
import { YearPickerComponent } from '../../shared/components/year-picker/year-picker.component';

@Component({
  selector: 'app-prediction',
  templateUrl: './prediction.component.html',
  styleUrls: [
    './prediction.component.scss',
    '../../../assets/material-custom.scss',
  ],
})
export class PredictionComponent implements OnInit {
  public isLoading: boolean = false;
  public label = 'Choose a Year';
  public predictedValue: string[] | undefined;
  public minDate = 988;

  public form = new FormGroup({
    Cylinders: new FormControl(8, [Validators.required, Validators.min(0)]),
    Displacement: new FormControl(307, [Validators.required, Validators.min(0)]),
    Horsepower: new FormControl(130, [Validators.required, Validators.min(0)]),
    Weight: new FormControl(3504, [Validators.required, Validators.min(0)]),
    Acceleration: new FormControl(12, [Validators.required, Validators.min(0)]),
    Origin: new FormControl(1, [Validators.required, Validators.min(0)]),
  });

  public _yearPickerCtrl: FormControl = new FormControl(
    new Date('2022-01-17T03:24:00'),
    Validators.required
  );

  public constructor(
    private readonly predictService: PredictService,
    public http: HttpClient,
    public dataPicker: YearPickerComponent
  ) {}

  public async ngOnInit() {
    this.form.addControl('Model year', this._yearPickerCtrl);
  }

  public async onPredict() {
    this.isLoading = true;
    this.dataPicker.writeValue(this._yearPickerCtrl.value);
    this.form.controls['Model year'].setValue(
      this._yearPickerCtrl.value.getFullYear()
    );

    if (this.form.valid) {
      try {
        await this.predictService.getValueAsync(this.form.value).then((res) => {
          this.predictedValue = Object.values(res);
        });
      } catch (error: any) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    }
  }

  public onResetPrediction() {
    this.form.reset();
    this._yearPickerCtrl.setValue(null);
  }

  public isCtrlValid(ctrl: string) {
    let isValid =
      this.form.controls[ctrl].invalid &&
      (this.form.controls[ctrl].dirty || this.form.controls[ctrl].touched);

    return [ctrl, isValid] as const;
  }
}
