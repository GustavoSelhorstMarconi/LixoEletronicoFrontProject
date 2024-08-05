import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private storage: BehaviorSubject<string> = new BehaviorSubject<string>('');
  storage$ = this.storage.asObservable();

  public setStorageValue(value: string): void {
    this.storage.next(value);
  }
}
