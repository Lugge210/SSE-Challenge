import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ICase } from '../models/icase';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmergencyHttpServiceService {
  http = inject(HttpClient);

  getEmergencyFromApi() : Observable<ICase> {
    const url = 'https://codingchallenge.bewerbung.sse-online.de/case';    
    return this.http.get<ICase>(url);
  }
}
