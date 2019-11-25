import { Component, OnInit } from '@angular/core';
import { TodoService } from '../_services/todo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoItem } from '../_models/todoItem';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {

  item: TodoItem;
  itemForm: FormGroup;

  constructor(
    private todoService: TodoService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.itemForm = formBuilder.group({
      label: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    // Get item from url param
    this.activatedRoute.params.subscribe(params => {
      // Get id of item
      let id = params['id'];
      // Fetch item from server
      this.todoService.getItem(id).subscribe(item => {
        this.item = item;
        // Update item form with current values
        this.itemForm.controls.label.setValue(item.label);
        this.itemForm.controls.category.setValue(item.category);
        this.itemForm.controls.description.setValue(item.description);
      })
    })
  }

  onSubmit() {
    console.log(this.itemForm.value);
    // Add id to editted item
    this.itemForm.value.id = this.item.id;
    this.todoService.updateItem(this.itemForm.value).subscribe(res => {
      console.log(res);
      this.router.navigateByUrl('/tasks');
    });
  }

}
