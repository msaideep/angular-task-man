import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

class Task {
  name: string;
  description: string;
  type: string;
  priority: string;
}
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  })
}

@Injectable({ providedIn: 'root' })
export class TasksService {
  API_URL = 'http://localhost:3000';
  TASKS_URL = '/tasks/';
  constructor(private http: HttpClient) { }

  getTasks() {
    console.log('TasksService.getTasks');
    return this.http.get<Object[]>(this.API_URL + this.TASKS_URL);
  }

  getTasksByUserId(userId: String) {
    console.log('TasksService.getTasksByUserId:' + userId);
    // http://localhost:4200/tasks/user/:id
    return this.http.get<any[]>(this.API_URL + this.TASKS_URL + 'user/' + userId);
  }

  getMockTasks() {
    console.log('TasksService.getMockTasks');
    let mockTasks = [
      {
        "priority": "LOW", "name": "task1",
        "description": "Testing description of task1", "type": "5b7582d63d40ee20cceba75b",
      },
      {
        "priority": "MEDIUM", "name": "task2",
        "description": "Testing description of task2", "type": "5b7582d63d40ee20cceba75b"
      }];
    return of(mockTasks).pipe(delay(5000));
  }
}

