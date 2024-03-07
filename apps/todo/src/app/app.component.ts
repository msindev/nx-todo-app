import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToDo } from '@nx-todo-app/types';
import { Observable, map } from 'rxjs';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { loadTasks } from './store/todo/todo.actions';
import { AppState } from './store/todo/todo.reducer';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    MatTabsModule,
    TodoListComponent,
  ],
  selector: 'nx-todo-app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'todo';
  allTasks$: Observable<ToDo[]>;
  activeTasks$: Observable<ToDo[]>;
  completedTasks$: Observable<ToDo[]>;

  constructor(private store: Store<AppState>) {
    this.store.dispatch(loadTasks());
    this.allTasks$ = this.store.select((state) => state.tasks.tasks);
    this.activeTasks$ = this.allTasks$.pipe(
      // Filter active tasks
      map((tasks) => tasks.filter((task) => !task.done))
    );
    this.completedTasks$ = this.allTasks$.pipe(
      // Filter completed tasks
      map((tasks) => tasks.filter((task) => task.done))
    );
  }
}
