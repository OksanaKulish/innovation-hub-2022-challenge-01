import { Injectable } from '@angular/core';
import { WebApiBaseService } from './web-api-base.service';
import { HttpClient } from '@angular/common/http';
import { InputDataDto } from '../dto';

@Injectable()
export class PredictService extends WebApiBaseService {

    public constructor(private http: HttpClient ) {
        super(http);
    }

    public async getValueAsync(data: InputDataDto): Promise<number> {
        return await this.postAsync<number>(`/getValue`, data);
    }
}
