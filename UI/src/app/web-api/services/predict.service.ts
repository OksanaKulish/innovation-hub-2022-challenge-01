import { Injectable } from '@angular/core';
import { WebApiBaseService } from './web-api-base.service';
import { HttpClient } from '@angular/common/http';
import { InputDataDto } from '../dto';

@Injectable()
export class PredictService extends WebApiBaseService {
  public constructor(private http: HttpClient) {
    super(http);
  }

  public async getValueAsync(): Promise<string> {
    return await this.getAsync(`getValue?Cylinders=8&Displacement=307&Horsepower=130&Weight=3504&Acceleration=12&Model+year=70&Origin=1`);
  }
}
