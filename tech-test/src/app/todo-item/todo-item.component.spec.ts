import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoItemComponent } from './todo-item.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { of } from 'rxjs';
import { TodoService } from '../_services/todo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

const MOCK_ITEM = {
  id: 1,
  label: "Kitchen Cleanup",
  description: "Clean my dirty kitchen",
  category: "house",
  done: false
}

export class MockTodoService {
  constructor() {
  }

  getItem() {
    return of(MOCK_ITEM);
  }
}

describe('TodoItemComponent', () => {
  let component: TodoItemComponent;
  let fixture: ComponentFixture<TodoItemComponent>;
  let todoService: TodoService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, BrowserAnimationsModule, RouterTestingModule],
      providers: [
        { provide: TodoService, useClass: MockTodoService }, 
        FormBuilder, 
        { provide: ActivatedRoute, useValue: { params: of(1)} }, 
      ],
      declarations: [ TodoItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoItemComponent);
    component = fixture.componentInstance;
    todoService = TestBed.get(TodoService);
    spyOn(todoService, 'getItem').and.returnValue(of(MOCK_ITEM));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
