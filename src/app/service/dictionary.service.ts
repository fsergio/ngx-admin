import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Dictionary} from '../model/dictionary';

@Injectable({
  providedIn: 'root',
})
export class DictionaryService {
  private server: 'http://localhost:8089/dictionary';

  constructor(public httpClient: HttpClient) {
  }

  getDictionaries() {
    return this.httpClient.get<any>('http://localhost:8089/dictionary');
  }

  saveNewDictionary(dictionary: Dictionary) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'my-auth-token',
      }),
    };

    return this.httpClient.post<any>('http://localhost:8089/dictionary', dictionary, httpOptions);
  }

  editNewDictionary(dictionary: Dictionary) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'my-auth-token',
      }),
    };

    return this.httpClient.post<any>('http://localhost:8089/dictionary', dictionary, httpOptions);
  }

  deleteDictionary(id: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'my-auth-token',
      }),
    };

    return this.httpClient.delete<any>('http://localhost:8089/dictionary/' + id, httpOptions);
  }

  findByLegacyCode(code: any, source: any) {
    let httpParams = new HttpParams();
    if (code) httpParams = httpParams.append('codeLegacy', code);
    if (source) httpParams = httpParams.append('source', source);

    return this.httpClient.get('http://localhost:8089/dictionary/search/findByCodeLegacyAndSource', {params: httpParams});
  }

  findByDXPCode(code: any, source: any) {
    let httpParams = new HttpParams();
    if (code) httpParams = httpParams.append('codeDXP', code);
    if (source) httpParams = httpParams.append('source', source);

    return this.httpClient.get('http://localhost:8089/dictionary/search/findByCodeDXPAndSource', {params: httpParams});
  }
}
