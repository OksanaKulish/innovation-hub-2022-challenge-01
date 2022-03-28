import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { InputDataDto } from 'src/app/web-api/dto';
import { PredictService } from 'src/app/web-api/services/predict.service';

@Component({
  selector: 'app-input-slider',
  templateUrl: './input-slider.component.html',
  styleUrls: ['./input-slider.component.scss'],
})
export class InputSliderComponent implements OnInit {
  public value: InputDataDto = {
    cylinder: 12,
    displacement: 1,
    horsepower: 16,
    weight: 17,
    acceleration: 72,
    modelYear: 13,
    origin: 14,
  };

  public predictedValue: number = 0;
  constructor(
    private readonly predictService: PredictService,
    public http: HttpClient
  ) {}

  public ngOnInit(): void {}

  baseURL: string =
    'https://6ztx8t67c4.execute-api.eu-west-2.amazonaws.com/Prod';

  public addData(data: InputDataDto): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(data);
    console.log(body);
    return this.http.post(this.baseURL + '/getValue', body, {
      headers: headers,
    });
  }

  public async getValue() {
    let rezult = this.addData(this.value).subscribe(data => console.log('DATA ' + data));
    this.predictedValue = 0;
    console.log(rezult);
    return rezult;
  }
}
