import { inject, Injectable } from '@angular/core';
import { ApiResponse, EventCalendar } from '../interfaces/eventCalendar';
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

  createEvent(NewEvent: EventCalendar): Observable<EventCalendar> {
    return this.http.post<EventCalendar>(`${this.chartUrl}`, NewEvent);
  }

  updateEvent(id: number, user: EventCalendar): Observable<EventCalendar> {
    return this.http.put<EventCalendar>(`${this.chartUrl}/${id}`, user);
  }

  deleteEvent(id: number): Observable<EventCalendar> {
    return this.http.delete<EventCalendar>(`${this.chartUrl}/${id}`);
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

}
