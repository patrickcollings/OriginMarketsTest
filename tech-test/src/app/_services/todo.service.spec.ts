import { TestBed } from '@angular/core/testing';

import { TodoService } from './todo.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

import { TodoItem } from '../_models/todoItem';
import { environment } from 'src/environments/environment';

describe('TodoService', () => {

  let service: TodoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [TodoService]
    });
    service = TestBed.get(TodoService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    const service: TodoService = TestBed.get(TodoService);
    expect(service).toBeTruthy();
  });

  it('be able to retrieve tasks from the API via GET', () => {
    const dummyTasks: TodoItem[] = [
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

    service.getItems().subscribe(items => {
      expect(items.length).toBe(2);
      expect(items).toEqual(dummyTasks);
    });

    const request = httpMock.expectOne(`${environment.apiUrl}/tasks`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyTasks);

  });

  it('be able to retrieve a specific task from the API via GET', () => {
    const dummyTask: TodoItem = {
      id: 1,
      label: "Kitchen Cleanup",
      description: "Clean my dirty kitchen",
      category: "house",
      done: false
    };

    service.getItem(1).subscribe(item => {
      expect(item).toEqual(dummyTask);
    });

    const request = httpMock.expectOne(`${environment.apiUrl}/1`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyTask);
  });

  afterEach(() => {
    httpMock.verify();
  });


});