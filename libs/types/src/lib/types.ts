import { ApiProperty } from '@nestjs/swagger';

export class ToDoDto {
  @ApiProperty({ description: 'Task' })
  task!: string;
}

export interface ToDo extends ToDoDto {
  id: string;
  done: boolean;
}
