import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ToDoDto } from '@nx-todo-app/types';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';

@ApiTags('tasks')
@Controller('/v1/tasks')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Get all ToDos' })
  @ApiResponse({
    status: 200,
    description: 'Returns an array of ToDos',
    isArray: true,
  })
  getAllToDos() {
    return this.appService.getAllToDos();
  }

  @Post()
  @ApiOperation({ summary: 'Add a new ToDo' })
  @ApiBody({ type: ToDoDto })
  @ApiResponse({ status: 201, description: 'ToDo successfully added' })
  addToDo(@Body() todo: ToDoDto) {
    return this.appService.addToDo(todo);
  }

  @Put(':id/done')
  @ApiOperation({ summary: 'Update the status of a ToDo' })
  @ApiParam({ name: 'id', description: 'ToDo ID' })
  @ApiBody({ schema: { properties: { done: { type: 'boolean' } } } })
  @ApiResponse({ status: 200, description: 'ToDo updated successfully' })
  updateStatus(@Param('id') id: string, @Body('done') done: boolean) {
    return this.appService.updateToDo(id, done);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a ToDo' })
  @ApiParam({ name: 'id', description: 'ToDo ID' })
  @ApiResponse({ status: 200, description: 'ToDo deleted successfully' })
  deleteToDo(@Param('id') id: string) {
    return this.appService.deleteToDo(id);
  }
}
