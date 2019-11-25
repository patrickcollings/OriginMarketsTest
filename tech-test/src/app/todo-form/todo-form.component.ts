import { Component, OnInit, Output } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit {

  todoForm: FormGroup;
  @Output() formResult = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.todoForm = formBuilder.group({
      label: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required)
    })
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.todoForm.valid) {
      // Set done to false
      this.todoForm.value.done = false;
      this.formResult.emit(this.todoForm.value);
    }
  }

}
