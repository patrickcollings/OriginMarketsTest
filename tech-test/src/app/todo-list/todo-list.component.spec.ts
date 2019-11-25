import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListComponent } from './todo-list.component';
import { TodoService } from '../_services/todo.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const MOCK_ITEMS = [
  {
    id: 1,
    label: "Kitchen Cleanup",
    description: "Clean my dirty kitchen",
    category: "house",
    done: false
  },
  {
    id: 2,
    label: "Taxes",
    description: "Start doing my taxes and contact my accountant jhon for advice",
    category: "bureaucracy",
    done: "22-10-2019"
  }
];

const mockItem = {
  id: 1,
  label: "Kitchen Cleanup",
  description: "Clean my dirty kitchen",
  category: "house",
  done: false
}

export class MockTodoService {
  constructor() {
  }

  getItems() {
    return of(MOCK_ITEMS);
  }

}

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let todoService: TodoService;
  let fixture: ComponentFixture<TodoListComponent>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      // provide the component-under-test and dependent service
      imports: [MatFormFieldModule, MatTableModule, MatInputModule, BrowserAnimationsModule],
      providers: [{ provide: TodoService, useClass: MockTodoService }],
      declarations: [TodoListComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    todoService = TestBed.get(TodoService);
    spyOn(todoService, 'getItems').and.returnValue(of(MOCK_ITEMS));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get the task list', () => {
    component.ngOnInit();
    expect(todoService.getItems).toHaveBeenCalled();
  });

});
