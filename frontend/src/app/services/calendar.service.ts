import { inject, Injectable } from '@angular/core';
import { ApiResponse } from '../interfaces/events';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  private chartUrl = "http://localhost:3000/api/events"

  http = inject(HttpClient)

  getAll(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.chartUrl);
  }
}
