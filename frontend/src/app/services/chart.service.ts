import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../interfaces/chart';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  private chartUrl = "http://localhost:3000/api/visits"

  http = inject(HttpClient)

  getAll(): (Observable<ApiResponse>) {
    return this.http.get<ApiResponse>(this.chartUrl);
  }
}
