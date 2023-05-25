import { Injectable } from '@nestjs/common';
import { Task } from './tasks.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { APIResponseDto, PaginationAPIResponseDto } from '../common/common.dto';
import {
  CreateTaskDto,
  IndexQueryDto,
  TaskDto,
  UpdateTaskDto,
} from './tasks.dto';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  async index(
    query: IndexQueryDto,
  ): Promise<PaginationAPIResponseDto<TaskDto[] | TaskDto>> {
    const {
      id = null,
      size = 10,
      page = 0,
      order = 'asc',
      orderBy = 'status',
    } = query;
    let data = null;
    if (id) {
      data = await this.taskModel.findById(id);
      if (!data) {
        return {
          status: false,
          message: 'Task not found.',
        };
      }
      return {
        status: true,
        message: 'Successfully fetched task detail.',
        data,
      };
    } else {
      data = await this.taskModel
        .find()
        .sort({
          [orderBy]: order?.toUpperCase() === 'ASC' ? 1 : -1,
          createdAt: -1,
        })
        .skip(page * size)
        .limit(size);
      const count: number = await this.taskModel.count();
      return {
        status: true,
        message: 'Successfully fetched tasks list.',
        count,
        data,
      };
    }
  }

  async create(payload: CreateTaskDto): Promise<APIResponseDto<TaskDto>> {
    const { title = '', description = '' } = payload;
    if (!title?.trim()) {
      return {
        status: false,
        message: 'Title is required field.',
      };
    }
    if (!description?.trim()) {
      return {
        status: false,
        message: 'Description is required field.',
      };
    }
    const data = await this.taskModel.create(payload);
    if (!data) {
      return {
        status: false,
        message:
          'Something went wrong! Task not created. Please try after sometime.',
      };
    }
    return {
      status: true,
      message: 'Task created successfully.',
      data,
    };
  }

  async update(
    id: string,
    payload: UpdateTaskDto,
  ): Promise<APIResponseDto<TaskDto>> {
    let data = await this.taskModel.updateOne({ _id: id }, payload);
    if (!data?.modifiedCount) {
      return {
        status: false,
        message:
          'Something went wrong! Task not updated. Please try after sometime.',
      };
    }
    data = await this.taskModel.findById(id);
    return {
      status: true,
      message: 'Task updated successfully.',
      data,
    };
  }

  async remove(id: string): Promise<APIResponseDto<any>> {
    const data = await this.taskModel.deleteOne({ _id: id });
    if (!data?.deletedCount) {
      return {
        status: false,
        message:
          'Something went wrong! Task not deleted. Please try after sometime.',
      };
    }
    return {
      status: true,
      message: 'Task deleted successfully.',
      data: {
        id,
      },
    };
  }
}
