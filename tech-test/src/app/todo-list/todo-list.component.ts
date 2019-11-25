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

  columnsToDisplay: string[] = ['label', 'category', 'done'];

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

  createDataSource(items) {
    this.dataSource = new MatTableDataSource(items);
  }

}
