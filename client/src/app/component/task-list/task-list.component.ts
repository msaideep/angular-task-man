import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../service/tasks.service';
import { throwError } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  private tasks = [];

  constructor(private spinner: NgxSpinnerService, private tasksService: TasksService) { }

  ngOnInit() {
    console.log('TaskListComponent.ngOnInit');
    this.spinner.show();
    this.getTasks();
  }

  getTasks() {
    console.log('TaskListComponent.getTasks');
    this.tasksService.getTasksByUserId("5b7582d63d40ee20cceba75b").subscribe(data => {
      //console.log(data);
      this.tasks = data;
      this.spinner.hide();
    },
      error => {
        console.error("Error retreiving tasks");
        this.spinner.hide();
        return throwError(error);
      }
    );
  }
}
