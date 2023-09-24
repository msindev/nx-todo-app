import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, of } from 'rxjs';
import * as TodoActions from './todo.actions';
import { TasksService } from '@nx-todo-app/openapi-generated';

@Injectable()
export class TodoEffects {
  constructor(private actions$: Actions, private todoService: TasksService) {}

  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.loadTasks),
      mergeMap(() =>
        this.todoService.appControllerGetAllToDos().pipe(
          map((tasks) => TodoActions.loadTasksSuccess({ tasks })),
          catchError((error) => of(TodoActions.loadTasksFailure({ error })))
        )
      )
    )
  );

  addTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.addTask),
      mergeMap(({ task }) =>
        this.todoService.appControllerAddToDo(task).pipe(
          map((addedTask) => TodoActions.addTaskSuccess({ task: addedTask })),
          catchError((error) => of(TodoActions.addTaskFailure({ error })))
        )
      )
    )
  );

  updateTaskStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.updateTaskStatus),
      mergeMap(({ id, done }) =>
        this.todoService.appControllerUpdateStatus({ done }, id).pipe(
          map(() => TodoActions.updateTaskStatusSuccess({ id, done })),
          catchError((error) =>
            of(TodoActions.updateTaskStatusFailure({ error }))
          )
        )
      )
    )
  );

  deleteTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.deleteTask),
      mergeMap(({ id }) =>
        this.todoService.appControllerDeleteToDo(id).pipe(
          map(() => TodoActions.deleteTaskSuccess({ id })),
          catchError((error) => of(TodoActions.deleteTaskFailure({ error })))
        )
      )
    )
  );
}
