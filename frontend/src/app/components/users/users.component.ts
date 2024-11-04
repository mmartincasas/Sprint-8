import { Component, inject, signal, ViewChild } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { User, ApiResponse } from '../../interfaces/user';
import { UserModalComponent } from "../user-modal/user-modal.component";

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [UserModalComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {

  arrUsers = signal<User[]>([]);
  usersService = inject(UsersService);

  @ViewChild(UserModalComponent) userModalComponent!: UserModalComponent;

  ngOnInit() {
    this.usersService.getAll().subscribe((data: ApiResponse) => {
      this.arrUsers.set(data.body); 
      console.log(this.arrUsers());
    });
  }

  deleteUser(id: number){
    if (confirm('Are you sure you want to delete this user?')) {
      this.usersService.deleteUser(id).subscribe({
        next: (response) => {
          this.arrUsers.update(users => users.filter(user => user.id !== id));
          console.log('User deleted:', response);
          alert('User deleted successfully!');
        },
        error: (err) => {
          console.error('Error deleting user:', err);
          alert('Failed to delete user. Please try again.');
        }
      });
    }
  }

  openModal() {
    this.userModalComponent.openModal('userModal');
  }


}
