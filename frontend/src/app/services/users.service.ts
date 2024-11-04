import { inject, Injectable } from '@angular/core';
import { User, ApiResponse } from '../interfaces/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private usersUrl = "http://localhost:3000/api/users"

  http = inject(HttpClient)

  getAll(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.usersUrl);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.usersUrl}`, user);
  }

  deleteUser(id: number): Observable<User> {
    return this.http.delete<User>(`${this.usersUrl}/${id}`);
  }
   

}
