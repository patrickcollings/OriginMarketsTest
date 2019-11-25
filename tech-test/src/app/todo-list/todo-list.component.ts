import { Component, OnInit } from '@angular/core';
import { TodoService } from '../_services/todo.service';
import { MatTableDataSource } from '@angular/material/table';

export interface TodoItem {
  id: number;
  label: string;
  description: string;
  category: string;
  done: boolean;
}

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  columnsToDisplay: string[] = ['label', 'category', 'done'];

  dataSource;

  constructor(
    private todoService: TodoService
  ) { }

  ngOnInit() {
    // Get task list
    this.todoService.getItems().subscribe(items => {
      this.dataSource = new MatTableDataSource(items);
    })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
