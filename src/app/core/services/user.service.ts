import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from 'src/app/shared/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = 'http://localhost:3000/user/'
  constructor(private http: HttpClient) { }

  signUp(user: IUser) {
    return this.http.post(this.url + 'signUp', user);
  }

  login(user: IUser) {
    return this.http.post(this.url + 'login', user);
  }

  getAllUsers() {
    return this.http.get(this.url);
  }

  updateUser(user: IUser, userId: string) {
    return this.http.put(this.url + `${userId}`, user);
  }

  deleteUser(userId: string) {
    return this.http.delete(this.url + `${userId}`);
  }
}
