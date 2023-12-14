import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Person } from '../models/Person';

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

  public put(id: number, person: Person): Observable<any>
  {
    return this.http.put(`${this.baseUrl}/?id=${id}`, JSON.stringify(person));
  }

  public get(id: number): Observable<Person>
  {
    return this.http.get<Person>(`${this.baseUrl}/?id=${id}`);
  }

  public delete(id: number): Observable<any>
  {
    return this.http.delete(`${this.baseUrl}/?id=${id}`);
  }
}
