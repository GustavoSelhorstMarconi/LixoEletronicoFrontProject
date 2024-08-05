import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Company } from '../models/Company';
import { Observable } from 'rxjs';
import { FilterCompanySearch } from '../models/filter-company-search';
import { HeaderCreator } from '../helpers/header-creator';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  baseUrl = 'https://localhost:7062/api/company';
  baseUrlCoordinateInfos = 'https://nominatim.openstreetmap.org/search?format=json&';

  constructor(private http: HttpClient) { }

  public getLatitudeLongitude(company: Company): Observable<any>
  {
    return this.http.get(this.createUrlToLatitudeLongitude(company.address));
  }

  public getCoordinatesBaseAddress(address: any): Observable<any>
  {
    return this.http.get(this.createUrlToLatitudeLongitude(address));
  }

  public post(company: Company): Observable<any>
  {
    const httpOptions = HeaderCreator.CreateHeaderWithAuth();

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

  public getAll(filter: FilterCompanySearch): Observable<Company[]>
  {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }

    return this.http.post<Company[]>(`${this.baseUrl}/GetAll`, JSON.stringify(filter), httpOptions);
  }

  public delete(id: number): Observable<any>
  {
    return this.http.delete(`${this.baseUrl}/?id=${id}`);
  }

  private createUrlToLatitudeLongitude(address: any): string
  {
    let url = this.baseUrlCoordinateInfos;

    if (address.street)
    {
      url += 'street=' + address.street;

      if (address.number)
      {
        url += ' ' + address.number + '&';
      }
      else
      {
        url += '&';
      }
    }

    if (address.city)
    {
      url += 'city=' + address.city + '&';
    }

    if (address.state)
    {
      url += 'state=' + address.state + '&';
    }

    if (address.country)
    {
      url += 'country=' + address.country + '&';
    }

    if (url[url.length - 1] == '&')
    {
      url = url.substring(0, url.length - 1);
    }

    return url;
  }
}
