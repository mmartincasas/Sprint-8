import { Component, inject, signal } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { User, ApiResponse } from '../../interfaces/user';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {

  arrUsers = signal<User[]>([]);
  usersService = inject(UsersService);

  ngOnInit() {
    this.usersService.getAll().subscribe((data: ApiResponse) => {
      this.arrUsers.set(data.body);  // Extraemos solo el array de usuarios
      console.log(this.arrUsers());
    });
  }


}
