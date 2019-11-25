import { Component, OnInit } from '@angular/core';
import { TodoService } from '../_services/todo.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TodoItem } from '../_models/todoItem';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  columnsToDisplay: string[] = ['label', 'category', 'done', 'delete'];

  dataSource;
  items: TodoItem[];

  constructor(
    private todoService: TodoService
  ) { }

  ngOnInit() {
    // Get task list
    this.todoService.getItems().subscribe(items => {
      this.items = items;
      this.createDataSource(items);
    })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addItem(item: TodoItem) {
    console.log(item);
    this.todoService.createItem(item).subscribe(item => {
      // Add new item
      this.items.push(item);
      // Update data source
      this.createDataSource(this.items); 
    })
  }

  deleteItem(item: TodoItem) {
    this.todoService.deleteItem(item.id).subscribe(res => {
      // Remove item from list
      this.items = this.items.filter(i => i.id !== item.id);
      this.createDataSource(this.items);
    })
  }

  checked(item: TodoItem) {
    item.done = new Date().toString();
    console.log(item);
    this.updateItem(item);
  }

  unchecked(item: TodoItem) {
    // Set done to false
    item.done = false;
    this.updateItem(item);
  }

  updateItem(item: TodoItem) {
    this.todoService.updateItem(item).subscribe(item => {
      console.log('Updated item');
    })
  }

  createDataSource(items) {
    this.dataSource = new MatTableDataSource(items);
  }

}
