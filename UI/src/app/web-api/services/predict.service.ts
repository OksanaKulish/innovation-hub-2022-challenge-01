import { Injectable } from '@angular/core';
import { WebApiBaseService } from './web-api-base.service';
import { HttpClient } from '@angular/common/http';
import { InputDataDto } from '../dto';
import { PredictionMPGDto } from 'src/app/components/prediction-grid/prediction-grid.component';

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

  public async getBulkValuesAsync(data: any): Promise<PredictionMPGDto[]> {
    return await this.getAsync(
      `getBulkValues?url=${data.url}`
    );
  }

  public async getFileUploadAsync(data: any): Promise<string> {
    return await this.postAsync(
      `dev/api/FileUpload`, data, true
    );
  }

  public getUrl(data: string) {
    return this.http.get(data);
  }
}
