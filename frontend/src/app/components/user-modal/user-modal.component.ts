import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
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
  userId: number | null = null;

  @Output() userUpdated = new EventEmitter<User>();

  public formUser: FormGroup = new FormGroup({});
  isUpdateMode = false

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
  
    openModal(user: User | null){

      this.isUpdateMode = !!user

      if (user) {
        this.formUser.patchValue({
          first: user.first,
          last: user.last,
          email: user.email,
          phone: user.phone,
          location: user.location,
          hobby: user.hobby
        });

        this.userId = user.id;

      } else {
        this.formUser.reset();
      }

      const modalElement = document.getElementById('userModal');
  
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

    saveUser() {
      if (this.formUser.valid){
        const user = this.formUser.value as User

        if (this.isUpdateMode){
          if (this.userId!==null){
            user.id = this.userId
            this.updateUser(user)
          } else {
            console.error('Error: userId is null while updating a user');
          }
        }else{
          this.saveNewUser(user)
        }
      }
    }


    saveNewUser(user: User){

        this.usersService.createUser(user).subscribe(
          response => {
            console.log('User created succesfully:', response)
            this.userUpdated.emit(response)
            this.closeModal();

          },
          error => {
            console.error('Error creating user:', error)
          }
        )
    }


    updateUser(user: User){
      this.usersService.updateUser(user.id, user).subscribe(
        response => {
          console.log('User updated successfully:', response)
          this.userUpdated.emit(user)
          this.closeModal();
        },
        error => {
          console.error('Error updating user:', error)
        }
      )
    }

}
