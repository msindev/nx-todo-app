import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { TodoListComponent } from './todo-list/todo-list.component';

@Component({
  standalone: true,
  imports: [RouterModule, MatTabsModule, TodoListComponent],
  selector: 'nx-todo-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'todo';
}
