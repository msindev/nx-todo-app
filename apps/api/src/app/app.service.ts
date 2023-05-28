import { Injectable, NotFoundException } from '@nestjs/common';
import { ToDo, ToDoDto } from '@nx-todo-app/types';

@Injectable()
export class AppService {
  todos: ToDo[] = [];

  getAllToDos() {
    return this.todos;
  }

  addToDo(todoDto: ToDoDto) {
    const todo: ToDo = { id: String(Date.now()), done: false, ...todoDto };
    this.todos.push(todo);
    return { message: 'ToDo successfully added' };
  }

  getActiveToDos() {
    return this.todos.filter((todo) => !todo.done);
  }

  getCompletedToDos() {
    return this.todos.filter((todo) => todo.done);
  }

  updateToDo(id: string, done: boolean) {
    const todo = this.todos.find((todo) => todo.id === id);
    if (todo) {
      todo.done = done !== undefined ? done : todo.done;
      return { message: `ToDo with ID ${id} updated successfully` };
    } else {
      throw new NotFoundException(`ToDo with ID ${id} not found`);
    }
  }

  deleteToDo(id: string) {
    const todoIndex = this.todos.findIndex((todo) => todo.id === id);
    if (todoIndex === -1) {
      throw new NotFoundException(`ToDo with ID ${id} not found`);
    }
    this.todos.splice(todoIndex, 1);
    return { message: `ToDo with ID ${id} deleted successfully` };
  }
}
