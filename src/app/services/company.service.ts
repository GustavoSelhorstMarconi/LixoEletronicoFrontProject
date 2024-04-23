import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Company } from '../models/Company';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  baseUrl = 'https://localhost:7062/api/company';

  constructor(private http: HttpClient) { }

  public post(company: Company): Observable<any>
  {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }

    return this.http.post(this.baseUrl, JSON.stringify(company), httpOptions);
  }

  public put(id: number, company: Company): Observable<any>
  {
    return this.http.put(`${this.baseUrl}/?id=${id}`, JSON.stringify(company));
  }

  public get(id: number): Observable<Company>
  {
    return this.http.get<Company>(`${this.baseUrl}/${id}`);
  }

  public getAll(): Observable<Company[]>
  {
    return this.http.get<Company[]>(`${this.baseUrl}`);
  }

  public delete(id: number): Observable<any>
  {
    return this.http.delete(`${this.baseUrl}/?id=${id}`);
  }
}
