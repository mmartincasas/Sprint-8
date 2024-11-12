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
      description: [''],
      start: ['', Validators.required],
      end: ['', Validators.required],
      color: ['']
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

        this.eventId = eCalendar?.id ?? null;

        this.formCalendar.patchValue({
          title: eCalendar?.title,
          color: eCalendar?.color,
          start: this.calendarService.formatDate(new Date(eCalendar?.start || '')),
          end: this.calendarService.formatDate(new Date(eCalendar?.end || '')),
          description: eCalendar?.description
        })

      }

      this.formCalendar.markAllAsTouched();

      const modalElement = document.getElementById('calendarModal');

      if (modalElement) {
        const bootstrap: any = (window as any).bootstrap;
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
      }
  }



  saveEvent(){

    if(this.formCalendar.valid){

      const eCalendar = this.formCalendar.value as EventCalendar

      if (this.isUpdateMode){
        if(this.eventId!==null){
          eCalendar.id = this.eventId
          this.updateEvent(eCalendar)
        }else{
          console.error('Error: eventId is null while updating a eventCalendar');
        }
      }else{
        this.saveNewEvent(eCalendar)
      }

    }
  }

  updateEvent(eCalendar: EventCalendar){
    this.calendarService.updateEvent(eCalendar.id, eCalendar).subscribe(
      response => {
        console.log('Event updated successfully:', response)
        this.eventUpdated.emit(eCalendar)
        this.closeModal()
      }, error => {
        console.error('Error updating eventCalendar:', error)
      }
    )

  }

  saveNewEvent(eCalendar: EventCalendar){
    this.calendarService.createEvent(eCalendar).subscribe(
      response => {
        console.log('Event created succesfully:', response)
        this.eventUpdated.emit(response)
        this.closeModal();
      },
      error => {
        console.error('Error creating eventCalendar:', error)
      }
    )
  }

  removeEvent() {
    if (this.eventId !== null) {
      const confirmDelete = window.confirm("Are you sure you want to delete this event?");
      
      if (confirmDelete) {
        this.calendarService.deleteEvent(this.eventId).subscribe(
          response => {
            console.log('Event deleted successfully:', response);
            this.closeModal();  
          },
          error => {
            console.error('Error deleting eventCalendar:', error);
          }
        );
      } else {
        console.log('Event deletion cancelled');
      }
    } else {
      console.error('Error: eventId is null while trying to delete a eventCalendar');
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
