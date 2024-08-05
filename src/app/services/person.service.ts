import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';
import { Person } from '../models/Person';
import { HeaderCreator } from '../helpers/header-creator';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  baseUrl = 'https://localhost:7062/api/person';
  
  constructor(private http: HttpClient) { }

  public post(person: Person): Observable<any>
  {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }

    return this.http.post(this.baseUrl, JSON.stringify(person), httpOptions);
  }

  public get(): Observable<any>
  {
    let url = `${this.baseUrl}/info`;

    const httpOptions = HeaderCreator.CreateHeaderWithAuth();
    
    return this.http.post<Person>(url, JSON.stringify(''), httpOptions)
      .pipe(shareReplay());
  }

  public delete(id: number): Observable<any>
  {
    return this.http.delete(`${this.baseUrl}/?id=${id}`);
  }
}
