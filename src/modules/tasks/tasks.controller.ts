import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import {
  CreateTaskDto,
  IndexQueryDto,
  TaskDto,
  UpdateTaskDto,
} from './tasks.dto';
import { APIResponseDto } from '../common/common.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Get()
  index(
    @Query(new ValidationPipe()) query: IndexQueryDto,
  ): Promise<APIResponseDto<TaskDto[] | TaskDto>> {
    return this.taskService.index(query);
  }

  @Post()
  create(
    @Body(new ValidationPipe()) payload: CreateTaskDto,
  ): Promise<APIResponseDto<TaskDto>> {
    return this.taskService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) payload: UpdateTaskDto,
  ): Promise<APIResponseDto<TaskDto>> {
    return this.taskService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<APIResponseDto<TaskDto>> {
    return this.taskService.remove(id);
  }
}
