import { inject, Injectable } from '@angular/core';
import { ApiResponse } from '../interfaces/mapLocation';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapLocationService {

  private mapUrl = "http://localhost:3000/api/map"

  http = inject(HttpClient)

  getAll(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.mapUrl);
  }

  getCategories(): Observable<string[]> {
    return this.http.get<ApiResponse>(this.mapUrl).pipe(
      map((response: ApiResponse) => {
        const categories = response.body.map((item) => item.category);
        return Array.from(new Set(categories)); 
      })
    );
  }
}




