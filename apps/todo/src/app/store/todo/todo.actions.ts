import { createAction, props } from '@ngrx/store';
import { ToDo } from '@nx-todo-app/types';

// Load Tasks
export const loadTasks = createAction('[Todo] Load Tasks');
export const loadTasksSuccess = createAction(
  '[Todo] Load Tasks Success',
  props<{ tasks: ToDo[] }>()
);
export const loadTasksFailure = createAction(
  '[Todo] Load Tasks Failure',
  props<{ error: unknown }>()
);

// Add Task
export const addTask = createAction('[Todo] Add Task', props<{ task: ToDo }>());
export const addTaskSuccess = createAction(
  '[Todo] Add Task Success',
  props<{ task: ToDo }>()
);
export const addTaskFailure = createAction(
  '[Todo] Add Task Failure',
  props<{ error: unknown }>()
);

// Update Task Status
export const updateTaskStatus = createAction(
  '[Todo] Update Task Status',
  props<{ id: string; done: boolean }>()
);
export const updateTaskStatusSuccess = createAction(
  '[Todo] Update Task Status Success',
  props<{ id: string; done: boolean }>()
);
export const updateTaskStatusFailure = createAction(
  '[Todo] Update Task Status Failure',
  props<{ error: unknown }>()
);

// Delete Task
export const deleteTask = createAction(
  '[Todo] Delete Task',
  props<{ id: string }>()
);
export const deleteTaskSuccess = createAction(
  '[Todo] Delete Task Success',
  props<{ id: string }>()
);
export const deleteTaskFailure = createAction(
  '[Todo] Delete Task Failure',
  props<{ error: unknown }>()
);
