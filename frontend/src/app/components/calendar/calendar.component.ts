import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { CalendarService } from '../../services/calendar.service';
import { CommonModule } from '@angular/common';
import { ApiResponse, EventCalendar } from '../../interfaces/eventCalendar';
import { EventModalComponent } from '../event-modal/event-modal.component';

import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, EventClickArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { EventInput } from '@fullcalendar/core';


@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [FullCalendarModule, CommonModule, EventModalComponent],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})

export class CalendarComponent implements OnInit {

  @ViewChild(EventModalComponent) eventModalComponent!: EventModalComponent;

  calendarService = inject(CalendarService);

  events: EventInput[] = [];

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    events: this.events, 
    dateClick: (arg) => this.handleDateClick(arg),
    eventClick: (arg) => this.handleEventClick(arg),
    headerToolbar: {
      start: 'title',           
      center: '',               
      end: 'today prev,next dayGridMonth'
    }
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
          start: this.calendarService.formatDate(new Date(event.start)),
          end: event.end ? this.calendarService.formatDate(new Date(event.end)) : undefined,  
          description: event.description, 
          color: event.color || undefined
        }));
        
      },
      (error) => {
        console.error('Error loading events:', error);
      }
    );
  }

  handleDateClick(arg: DateClickArg): void {

    const selectedDate = arg.dateStr;

    if (this.eventModalComponent) {
      this.eventModalComponent.openModal(null, selectedDate);
    }
  }

  handleEventClick(arg: EventClickArg): void{
    // Construimos el objeto EventCalendar con los datos del evento
    const clickedEvent = arg.event;

    const eventData: EventCalendar = {
      id: parseInt(clickedEvent.id, 10),
      title: clickedEvent.title,
      description: clickedEvent.extendedProps['description'] || '',
      start: clickedEvent.start?.toISOString() || '',
      end: clickedEvent.end?.toISOString() || '',
      color: clickedEvent.backgroundColor || '#FF5733'
    };

    // Abre el modal en modo de edición con los datos del evento
    if (this.eventModalComponent) {
      this.eventModalComponent.openModal(eventData, null);
    }
  }

  onEventUpdated(eCalendar: EventCalendar) {
    this.loadEvents(); 
  }




}
