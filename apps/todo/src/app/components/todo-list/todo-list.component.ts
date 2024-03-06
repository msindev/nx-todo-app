import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';
import { ToDo } from '@nx-todo-app/types';
import { Observable, tap } from 'rxjs';
import {
  addTask,
  deleteTask,
  updateTaskStatus,
} from '../../store/todo/todo.actions';
import { AppState } from '../../store/todo/todo.reducer';

@Component({
  selector: 'nx-todo-app-todo-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCheckboxModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListComponent {
  @ViewChild('taskInput')
  taskInput!: ElementRef<HTMLInputElement>;
  tasks$: Observable<ToDo[]>;

  constructor(private store: Store<AppState>) {
    this.tasks$ = this.store
      .select((state) => state.tasks.tasks)
      .pipe(tap((tasks) => console.log('Component: ', tasks)));
  }

  addTask(taskInput: string): void {
    if (taskInput.trim() === '') {
      return;
    }
    const task: ToDo = {
      id: Date.now().toString(),
      task: taskInput,
      done: false,
    };
    this.store.dispatch(addTask({ task }));
    this.taskInput.nativeElement.value = '';
  }

  updateTaskStatus(task: ToDo, event: boolean): void {
    this.store.dispatch(updateTaskStatus({ id: task.id, done: event }));
  }

  deleteTask(id: string): void {
    this.store.dispatch(deleteTask({ id }));
  }
}
