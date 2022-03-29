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
    const url = this._apiEndpoint + relativeApiUrl;

    const options = {
      url: url,
      responseType: 'json' as 'json',
      body: body,
      headers: new HttpHeaders(),
      observe: 'response' as 'response',
    };

    if (typeof body === 'string') {
      options.headers = options.headers.append(
        'Content-Type',
        `application/json`
      );
    }
    const responseObservable = this._http.request(method, url, options);
    const response = await responseObservable.toPromise();

    return this.parseResponseBody<T>(response);
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

  public text: string = '';

  protected async parseResponseBody<T>(
    response: HttpResponse<Object> | undefined
  ): Promise<T> {
    if (response == undefined) {
      console.error('Response is undefined!!!!');
      return Object as any as T;
    }

    if (response.body) {
      if (typeof response.body === 'string') {
        this.text = response.body;
      } else {
        this.text = JSON.stringify(response.body);
      }
    }

    if (!this.text) {
      console.log(this.text);
      return this.text as any as T;
    }

    if (this.text.startsWith('[') || this.text.startsWith('{')) {
      return JSON.parse(this.text);
    }
    if (
      (this.text[0] === '"' || this.text[0] === '"') &&
      this.text[this.text.length - 1] === this.text[0]
    ) {
      return this.text.substr(1, this.text.length - 2) as any as T;
    }
    if (isNaN(+this.text)) {
      return this.text as any as T;
    }
    const number = parseFloat(this.text);
    if (!Number.isNaN(number)) {
      return number as any as T;
    }
    return this.text as any as T;
  }
}
