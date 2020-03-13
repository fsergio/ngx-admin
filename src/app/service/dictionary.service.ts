import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
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
}
