import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable()
export abstract class WebApiBaseService {
  private readonly _http: HttpClient;
  private _apiEndpoint: string;

  protected constructor(http: HttpClient) {
    this._http = http;
    this._apiEndpoint = this.normalize(environment.apiUrl);
  }

  private normalize(uri: string): string {
    return uri.endsWith('/') ? uri : uri + '/';
  }

  protected async requestAsync<T>(
    method: string,
    relativeApiUrl: string,
    body?: any
  ): Promise<T> {
    const url = environment.apiUrl + relativeApiUrl;

    const options = {
      url: url,
      responseType: 'json' as 'json',
      body: body,
      headers: new HttpHeaders(),
      observe: 'response' as 'response',
    };

    if (typeof body === 'string') {
      options.headers = options.headers.append('Content-Type', `text/plain`);
    }
    const responseObservable = this._http.request(method, url, options);
    const response = (await responseObservable.toPromise()) ?? Object;

    return response as any as T;
  }

  protected getAsync<T>(relativeApiUrl: string, body?: any): Promise<T> {
    return this.requestAsync<T>('get', relativeApiUrl, body);
  }

  protected postAsync<T>(relativeApiUrl: string, body?: any): Promise<T> {
    return this.requestAsync<T>('post', relativeApiUrl, body);
  }

  protected putAsync<T>(relativeApiUrl: string, body?: any): Promise<T> {
    return this.requestAsync<T>('put', relativeApiUrl, body);
  }

  protected deleteAsync<T>(relativeApiUrl: string, body?: any): Promise<T> {
    return this.requestAsync<T>('delete', relativeApiUrl, body);
  }
}
