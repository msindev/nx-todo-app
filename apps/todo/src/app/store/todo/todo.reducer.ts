import { createReducer, on } from '@ngrx/store';
import { ToDo } from '@nx-todo-app/types';
import * as TodoActions from './todo.actions';

export interface TodoState {
  tasks: ToDo[];
  loading: boolean;
  error: unknown;
}

const initialState: TodoState = {
  tasks: [],
  loading: false,
  error: null,
};

export const todoReducer = createReducer(
  initialState,

  on(TodoActions.loadTasks, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(TodoActions.loadTasksSuccess, (state, { tasks }) => ({
    ...state,
    tasks: [...tasks],
    loading: false,
  })),

  on(TodoActions.loadTasksFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(TodoActions.addTaskSuccess, (state, { task }) => ({
    ...state,
    tasks: [...state.tasks, task],
  })),

  on(TodoActions.updateTaskStatusSuccess, (state, { id, done }) => ({
    ...state,
    tasks: state.tasks.map((task) =>
      task.id === id ? { ...task, done } : task
    ),
  })),

  on(TodoActions.deleteTaskSuccess, (state, { id }) => ({
    ...state,
    tasks: state.tasks.filter((task) => task.id !== id),
  }))
);
