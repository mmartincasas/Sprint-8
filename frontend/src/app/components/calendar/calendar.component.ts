import { Component, inject, OnInit } from '@angular/core';
import { CalendarService } from '../../services/calendar.service';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { EventInput } from '@fullcalendar/core';
import { CommonModule } from '@angular/common';
import { ApiResponse } from '../../interfaces/events';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [FullCalendarModule, CommonModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent implements OnInit {
  calendarService = inject(CalendarService);

  events: EventInput[] = [];

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    events: this.events, 
    dateClick: (arg) => this.handleDateClick(arg)
  };

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.calendarService.getAll().subscribe(
      (response: ApiResponse) => {

        this.events = response.body.map(event => ({
          id: event.id.toString(),
          title: event.title, 
          start: new Date(event.start).toISOString(), 
          end: event.end ? new Date(event.end).toISOString() : undefined, 
          description: event.description, 
          color: event.color || undefined, 
          extendedProps: {
            category: event.category || undefined 
          }
        }));
        
      },
      (error) => {
        console.error('Error loading events:', error);
      }
    );
  }

  handleDateClick(arg: DateClickArg): void {
    alert('date click! ' + arg.dateStr);
  }
}
