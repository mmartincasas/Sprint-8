import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { CalendarService } from '../../services/calendar.service';
import { CommonModule } from '@angular/common';
import { ApiResponse, EventCalendar } from '../../interfaces/eventCalendar';
import { EventModalComponent } from '../event-modal/event-modal.component';

import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
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
    headerToolbar: {
      start: 'title',           // Título en el lado izquierdo
      center: '',               // Espacio vacío en el centro
      end: 'today prev,next dayGridMonth,timeGridWeek' // Botones a la derecha
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
    //alert('date click! ' + arg.dateStr);
    const selectedDate = arg.dateStr; 
    /*
    // Crear el objeto EventCalendar
    const eventData: EventCalendar = {
      id: 0, // Aquí podrías asignar un ID si ya lo tienes
      title: 'Nuevo Evento', // Aquí coloca el título o asigna otro valor si lo tienes
      description: 'Descripción del evento',
      start: selectedDate,
      end: '', // Aquí puedes dejar vacío o usar una fecha de finalización
      category: null,
      color: '#FF5733' // Un color predeterminado
    };*/

    //console.log(selectedDate)

    if (this.eventModalComponent) {
      this.eventModalComponent.openModal(null, selectedDate);
    }
  }




}
