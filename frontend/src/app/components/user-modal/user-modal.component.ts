import { Component, inject, Input } from '@angular/core';
import { User } from '../../interfaces/user';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../services/users.service';


@Component({
  selector: 'app-user-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-modal.component.html',
  styleUrl: './user-modal.component.scss'
})
export class UserModalComponent {

  
  @Input() user: User | null = null;

  public formUser: FormGroup = new FormGroup({});

  usersService = inject(UsersService)
 
  constructor(private fb: FormBuilder) { 
    this.formUser = this.fb.group({
      first: ['', Validators.required],
      last: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      location: [''],
      hobby: ['']
    });
  }
  
    openModal(type: string){
      const modalElement = document.getElementById(type);
  
      if (modalElement) {
        const bootstrap: any = (window as any).bootstrap;
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
      }
    }

    closeModal() {
      const modalElement = document.getElementById('userModal');
      if (modalElement) {
        const bootstrap: any = (window as any).bootstrap;
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal.hide(); 
      }
    }

    saveNewUser(){
      if (this.formUser.valid){
        const newUser = this.formUser.value as User

        this.usersService.createUser(newUser).subscribe(
          response => {
            console.log('User created succesfully:', response)
            this.closeModal();

          },
          error => {
            console.error('Error creating user:', error)
          }
        )
      }

    }
}
