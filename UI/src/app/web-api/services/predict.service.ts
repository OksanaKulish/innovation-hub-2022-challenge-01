import { Injectable } from '@angular/core';
import { WebApiBaseService } from './web-api-base.service';
import { HttpClient } from '@angular/common/http';
import { InputDataDto } from '../dto';

@Injectable()
export class PredictService extends WebApiBaseService {
  public constructor(private http: HttpClient) {
    super(http);
  }

  public async getValueAsync(data: InputDataDto): Promise<string> {
    return await this.getAsync(
      `getValue?Cylinders=${data.Cylinders}&Displacement=${data.Displacement}&Horsepower=${data.Horsepower}&Weight=${data.Weight}&Acceleration=${data.Acceleration}&Model+year=${data['Model year']}&Origin=${data.Origin}`
    );
  }

  public async getBulkValuesAsync(data: any): Promise<string> {
    return await this.getAsync(
      `getBulkValues?url=${data.url}`
    );
  }
}
