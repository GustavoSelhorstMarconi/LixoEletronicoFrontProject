import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Review } from '../models/Review';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  baseUrl = 'https://localhost:7062/api/review';

  constructor(private http: HttpClient) { }

  public post(review: Review): Observable<any>
  {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }

    return this.http.post(this.baseUrl, JSON.stringify(review), httpOptions);
  }
}
