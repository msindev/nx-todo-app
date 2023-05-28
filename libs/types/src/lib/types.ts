export interface ToDoDto {
  task: string;
}

export interface ToDo extends ToDoDto {
  id: string;
  done: boolean;
}
