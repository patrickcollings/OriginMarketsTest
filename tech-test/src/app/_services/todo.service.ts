import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TodoItem } from '../_models/todoItem';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(
    private http: HttpClient
  ) { }

  getItems() {
    return this.http.get<TodoItem[]>(`${environment.apiUrl}/tasks`);
  }

  getItem(id: number) {
    return this.http.get<TodoItem>(`${environment.apiUrl}/${id}`);
  }

  createItem(todoItem: TodoItem) {
    return this.http.post<TodoItem>(`${environment.apiUrl}/tasks`, todoItem);
  }

  updateItem(todoItem: TodoItem) {
    return this.http.put(`${environment.apiUrl}`, todoItem);
  }

  deleteItem(id: number) {
    return this.http.delete(`${environment.apiUrl}/${id}`);
  }



}
