import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CalendarService } from '../../services/calendar.service';
import { EventCalendar } from '../../interfaces/eventCalendar';

@Component({
  selector: 'app-event-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './event-modal.component.html',
  styleUrl: './event-modal.component.scss'
})
export class EventModalComponent {

  @Input() eCalendar: EventCalendar | null = null;
  @Output() eventUpdated = new EventEmitter<EventCalendar>();
  eventId: number | null = null;

  public formCalendar: FormGroup = new FormGroup({});
  isUpdateMode = false

  calendarService = inject(CalendarService)

 
  constructor(private fb: FormBuilder) { 
    this.formCalendar = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      start: ['', Validators.required],
      end: ['', Validators.required],
      color: ['', Validators.required]
    });
  }


  openModal(eCalendar: EventCalendar | null, newDate: String | null){

        if (eCalendar == null && newDate != null){

          this.isUpdateMode = false;

          this.formCalendar.patchValue({
            title: 'New Event',
            start: newDate,
            end: newDate,
          })

        } else {
          this.isUpdateMode = true;

          //this.eventId = eCalendar.id;

          this.formCalendar.patchValue({
            title: eCalendar?.title,
            color: eCalendar?.color,
            start: eCalendar?.start,
            end: eCalendar?.end,
            category: eCalendar?.category,
            description: eCalendar?.description
          })

        }

      const modalElement = document.getElementById('calendarModal');

      if (modalElement) {
        const bootstrap: any = (window as any).bootstrap;
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
      }
  }

  saveEvent(){

    if (!this.isUpdateMode){
      
    }

  }

  closeModal(){
    const modalElement = document.getElementById('calendarModal');
    if (modalElement) {
      const bootstrap: any = (window as any).bootstrap;
      const modal = bootstrap.Modal.getInstance(modalElement);
      modal.hide(); 
    }
  }

}
