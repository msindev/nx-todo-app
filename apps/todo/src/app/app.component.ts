import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { loadTasks } from './store/todo/todo.actions';
import { AppState } from './store/todo/todo.reducer';

@Component({
  standalone: true,
  imports: [HttpClientModule, RouterModule, MatTabsModule, TodoListComponent],
  selector: 'nx-todo-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'todo';
  constructor(private store: Store<AppState>) {
    this.store.dispatch(loadTasks());
  }
}
