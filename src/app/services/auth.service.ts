import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';
import { Person } from '../models/Person';
import { Login } from '../models/Login';
import { HeaderCreator } from '../helpers/header-creator';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = 'https://localhost:7062/api/auth';
  
  constructor(private http: HttpClient) { }

  public login(person: Login): Observable<any>
  {
    let url = this.baseUrl + '/login';

    const httpOptions = HeaderCreator.CreateHeaderWithoutAuth();

    return this.http.post(url, JSON.stringify(person), httpOptions)
      .pipe(shareReplay());
  }

  public register(person: Person): Observable<any>
  {
    let url = this.baseUrl + '/register';

    const httpOptions = HeaderCreator.CreateHeaderWithoutAuth();

    return this.http.post(url, JSON.stringify(person), httpOptions)
      .pipe(shareReplay());
  }

  public revoke(): Observable<any>
  {
    let url = this.baseUrl + `/revoke/${JSON.parse(localStorage.getItem('user-info') ?? '')?.name}`;

    const httpOptions = HeaderCreator.CreateHeaderWithAuth();

    return this.http.post(url, JSON.stringify(''), httpOptions)
      .pipe(shareReplay());
  }

  public put(person: Person): Observable<any>
  {
    const httpOptions = HeaderCreator.CreateHeaderWithAuth();

    return this.http.put(`${this.baseUrl}`, JSON.stringify(person), httpOptions);
  }
}
