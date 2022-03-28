import { Injectable } from '@angular/core';
import { WebApiBaseService } from './web-api-base.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HelloService extends WebApiBaseService {

    public constructor(private http: HttpClient ) {
        super(http);
    }

    public async helloAsync(): Promise<void> {
        return await this.putAsync<void>(`/hello`);
    }
}
